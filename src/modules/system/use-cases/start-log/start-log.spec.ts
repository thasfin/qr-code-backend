import configs from '@configs/index';
import { StartLogUseCase } from './start-log.use-case';

describe('StartLog', () => {
  it('should be able to start log', async () => {
    const startLog = new StartLogUseCase();
    const filePath = configs.system.startFile;
    const fileType = 'utf-8';
    expect(await startLog.execute({ filePath, fileType })).resolves;
  });

  it('should not be able to start log', async () => {
    const startLog = new StartLogUseCase();
    const filePath = 'invalid-path';
    const fileType = 'utf-8';

    expect(() => startLog.execute({ filePath, fileType })).toThrow();
  });
});
