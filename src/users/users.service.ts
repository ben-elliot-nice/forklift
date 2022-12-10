import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { UserExistsError } from './errors/user-exists.error';
import { Result } from '@badrap/result';
import { UserNotFoundError } from './errors/user-not-found.error';
import { UserCreatedDto } from './dtos/user-created.dto';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findOneByEmail(email: string): Promise<Result<User, Error>> {
    const findUserResult = await this.usersRepository.findOneUser({
      where: {
        email: email,
      },
    });

    if (findUserResult.isOk) {
      const foundUser = findUserResult.value;
      return Result.ok(foundUser);
    } else {
      return Result.err(new UserNotFoundError('Requested user does not exist'));
    }
  }

  async createOne(params: {
    email: string;
    password: string;
  }): Promise<Result<UserCreatedDto, Error>> {
    const { email, password } = params;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const userCreateInput: Prisma.UserCreateInput = {
      email: email,
      passwordHash: hash,
    };

    const createUserResult = await this.usersRepository.createUser({
      data: userCreateInput,
    });

    if (createUserResult.isOk) {
      const createdUser = createUserResult.value;
      const { email } = createdUser;
      return Result.ok({ email });
    } else {
      const e = createUserResult.error;
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (
          e.code === 'P2002' &&
          e.meta &&
          e.meta['target'] instanceof Array &&
          e.meta['target'].includes('email')
        ) {
          return Result.err(
            new UserExistsError(
              `User with ${e.meta['target']} '${email}' already exists.`,
            ),
          );
        }
      }
      return Result.err(e);
    }
  }
}
