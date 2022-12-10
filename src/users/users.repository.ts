import { Result } from '@badrap/result';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(params: {
    data: Prisma.UserCreateInput;
  }): Promise<Result<User, Error>> {
    const { data } = params;
    try {
      const user = await this.prisma.user.create({ data });
      return Result.ok(user);
    } catch (error) {
      return Result.err(error);
    }
  }

  async findOneUser(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<Result<User, Error>> {
    const { where } = params;
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where,
      });
      return Result.ok(user);
    } catch (e) {
      return Result.err(e);
    }
  }
}
