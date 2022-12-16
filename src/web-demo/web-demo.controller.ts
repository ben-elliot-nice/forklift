import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateWebDemoDto } from './dtos/create-web-demo.dto';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { WebDemoService } from './web-demo.service';

@Controller('demo')
export class DemoController {
  constructor(
    private usersService: UsersService,
    private webDemoService: WebDemoService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createDemo(
    @Req() req: Request,
    @Body() createWebDemoDto: CreateWebDemoDto,
  ) {
    console.log('great success', req.user);
    console.log('body: ', createWebDemoDto);

    // Get user from service using token
    const userData = req.user as { id: string };

    if (!(userData && userData.id)) {
      throw new HttpException(
        'Unexpected error, no user on request object',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const findUserResult = await this.usersService.findOneById(userData.id);

    if (findUserResult.isErr) {
      throw new HttpException('Could not find user', HttpStatus.BAD_REQUEST);
    }

    const user: User = findUserResult.value;

    // Call website demo service to create new demo config
    const createWebsiteDemoResult = await this.webDemoService.createOne({
      url: createWebDemoDto.url,
      user: user,
    });

    if (createWebsiteDemoResult.isErr) {
      const e = createWebsiteDemoResult.error;
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return createWebsiteDemoResult.value;
  }
}
