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
  if (role === 'app') {
    app = await NestFactory.create(AppModule);
  } else {
    app = await NestFactory.create(WorkerModule);
  }

  const config = app.get(ConfigService);
  const port = config.get('port');
  await app.listen(port);
}
bootstrap();
