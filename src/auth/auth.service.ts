import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const userFoundResult = await this.usersService.findOneByEmail(username);

    if (userFoundResult.isOk) {
      const { passwordHash, ...result } = userFoundResult.value;
      const isMatch = await bcrypt.compare(pass, passwordHash);
      if (isMatch) {
        return result;
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
