import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';
import messageQueueConfig from './config/message-queue.config';
import { UsersModule } from './users/users.module';
import { DemoModule } from './web-demo/web-demo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, messageQueueConfig],
    }),
    AuthModule,
    UsersModule,
    DemoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
