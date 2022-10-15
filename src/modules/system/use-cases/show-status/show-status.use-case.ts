import * as fs from 'fs';
import { IUseCase } from '@core/use-case.interface';
import {
  StartFileProps,
  StartFileResponse,
} from '@modules/system/dtos/start-file';

export class ShowStatusUseCase
  implements IUseCase<StartFileProps, StartFileResponse>
{
  async execute({
    filePath,
    fileType,
    memoryTotal,
    memoryFree,
    memoryUsage,
    uptime,
  }: StartFileProps): Promise<StartFileResponse> {
    try {
      const totalMemory = memoryTotal / (1024 * 1024 * 1024);
      const freeMemory = memoryFree / (1024 * 1024 * 1024);
      const usageMemory = memoryUsage / (1024 * 1024);

      const file = fs.readFileSync(filePath, { encoding: fileType, flag: 'r' });
      const obj = {
        uptime: this.secondsToDayHourMinuteSeconds(uptime),
        processMemoryUsage: `${this.precision(usageMemory)} Mb`,
        memoryTotal: `${this.precision(totalMemory)} Gb`,
        memoryFree: `${this.precision(freeMemory)} Gb`,
        ...JSON.parse(file),
      };

      return obj;
    } catch (error) {
      throw new Error(`Error OnReadFile: ${error.message}`);
    }
  }

  private precision(num: number): number {
    return parseFloat(num.toFixed(2));
  }

  private secondsToDayHourMinuteSeconds(sec: number) {
    const secDay = 24 * 60 * 60;
    const secHour = 60 * 60;

    const day = Math.floor(sec / secDay);
    const hour = Math.floor((sec - day * secDay) / secHour);
    const minutes = Math.floor((sec - day * secDay - hour * secHour) / 60);
    const seconds = Math.round(
      sec - day * secDay - hour * secHour - minutes * 60,
    );

    const pad = function (n: number) {
      return n < 10 ? '0' + n : n;
    };

    return `${day} days ${pad(hour)}:${pad(minutes)}:${pad(seconds)}`;
  }
}
