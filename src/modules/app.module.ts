import { Module } from '@nestjs/common';
import { QrCodeModule } from './qr-code/qrcode.module';
import { SystemModule } from './system/system.module';

@Module({
  imports: [SystemModule, QrCodeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
