import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { StartLogUseCase } from '@modules/system/use-cases/start-log/start-log.use-case';
import configs from './configs';

async function bootstrap() {
  const startLog = new StartLogUseCase();

  startLog.execute({
    filePath: configs.system.startFile,
    fileType: 'utf-8',
  });

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
