import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { DemoController } from './web-demo.controller';
import { WebDemoRepository } from './web-demo.repository';
import { WebDemoService } from './web-demo.service';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [DemoController],
  providers: [WebDemoService, WebDemoRepository],
})
export class DemoModule {}
