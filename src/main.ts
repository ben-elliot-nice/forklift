import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WorkerModule } from './worker.module';

async function bootstrap() {
  const role = process.env.ROLE;
  if (!role) {
    throw new Error(
      'Cannot boostrap app without setting ROLE environment variable',
    );
  }

  if (!(role === 'app' || role === 'worker')) {
    throw new Error(
      `ROLE environment variable cannot be "${role}" - must be one of "app" or "worker"`,
    );
  }

  let app;
  let config;
  let port;
  if (role === 'app') {
    app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    config = app.get(ConfigService);
    port = config.get('app.port');
  } else {
    app = await NestFactory.create(WorkerModule);
    config = app.get(ConfigService);
    port = config.get('worker.port');
  }

  console.log(`Starting app listening on port: ${port}`);
  await app.listen(port);
}
bootstrap();
