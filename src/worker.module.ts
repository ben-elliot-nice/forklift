import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import messageQueueConfig from './config/message-queue.config';
import workerConfig from './config/worker.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [workerConfig, messageQueueConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class WorkerModule {}
