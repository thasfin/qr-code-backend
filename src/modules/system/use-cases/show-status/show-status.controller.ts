import { Controller, Get } from '@nestjs/common';
import configs from '@configs/index';
import { ShowStatusUseCase } from './show-status.use-case';
import { StartFileResponse } from '@modules/system/dtos/start-file';
import * as os from 'os';

@Controller()
export class ShowStatusController {
  constructor(private readonly useCase: ShowStatusUseCase) {}

  @Get()
  async handle(): Promise<StartFileResponse> {
    const memoryTotal = os.totalmem();
    const memoryFree = os.freemem();
    const memoryUsage = process.memoryUsage().rss;
    const uptime = process.uptime();

    const result = this.useCase.execute({
      filePath: configs.system.statusFile,
      fileType: 'utf-8',
      memoryTotal,
      memoryFree,
      memoryUsage,
      uptime,
    });

    return result;
  }
}
