import { IUseCase } from '@core/use-case.interface';
import { qrCodeRequest } from '@modules/qr-code/dtos/qr-code';
import QRCode from 'qrcode';

export class CreateQrCodeUseCase implements IUseCase<qrCodeRequest, void> {
  async execute({ content, options }: qrCodeRequest): Promise<void> {
    QRCode.toString(
      content.url,
      { type: 'terminal', ...options },
      function (err, url) {
        console.log(url);
      },
    );
  }
}
