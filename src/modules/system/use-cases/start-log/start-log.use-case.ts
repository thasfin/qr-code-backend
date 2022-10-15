import * as fs from 'fs';
import { IUseCase } from '@core/use-case.interface';
import { StartLogProps } from '@modules/system/dtos/start-file';

export class StartLogUseCase implements IUseCase<StartLogProps, void> {
  execute({ filePath, fileType }: StartLogProps): Promise<void> {
    try {
      const file = fs.readFileSync(filePath, { encoding: fileType, flag: 'r' });
      console.log(file);
    } catch (error) {
      throw new Error(`Error OnReadFile: ${error.message}`);
    }

    return;
  }
}
