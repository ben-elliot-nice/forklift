import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async createOne(params: { email: string; password: string }) {
    const { email, password } = params;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const userCreateInput: Prisma.UserCreateInput = {
      email: email,
      passwordHash: hash,
      passwordSalt: salt,
    };
    this.usersRepository.createUser({ data: userCreateInput });
  }
}
