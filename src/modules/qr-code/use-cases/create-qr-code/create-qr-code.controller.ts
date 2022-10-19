import { options, qrCodeBody } from '@modules/qr-code/dtos/qr-code';
import { Body, Controller, Post, Query } from '@nestjs/common';
import { CreateQrCodeUseCase } from './create-qr-code.use-case';

@Controller('qrcode')
export class CreateQrCodeController {
  constructor(private readonly useCase: CreateQrCodeUseCase) {}

  @Post()
  async handle(
    @Body() body: qrCodeBody,
    @Query() options: options,
  ): Promise<void> {
    await this.useCase.execute({ content: body, options });
    return;
  }
}
