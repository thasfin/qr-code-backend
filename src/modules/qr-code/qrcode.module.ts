import { Module } from '@nestjs/common';
import { CreateQrCodeController } from './use-cases/create-qr-code/create-qr-code.controller';
import { CreateQrCodeUseCase } from './use-cases/create-qr-code/create-qr-code.use-case';

@Module({
  controllers: [CreateQrCodeController],
  providers: [CreateQrCodeUseCase],
})
export class QrCodeModule {}
