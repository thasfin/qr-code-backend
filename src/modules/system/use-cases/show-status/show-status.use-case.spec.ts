import configs from '@configs/index';
import { ShowStatusUseCase } from './show-status.use-case';
let showStatus;

describe('ShowStatus', () => {
  beforeEach(async () => {
    showStatus = new ShowStatusUseCase();
  });

  it('should be able to show status', async () => {
    expect(
      await showStatus.execute({
        filePath: configs.system.statusFile,
        fileType: 'utf-8',
        memoryTotal: 0,
        memoryFree: 0,
        memoryUsage: 0,
        uptime: 0,
      }),
    ).resolves;
  });

  it('should not be able to show status', () => {
    const result = showStatus.execute({
      filePath: 'invalid-path',
      fileType: 'utf-8',
      memoryTotal: 0,
      memoryFree: 0,
      memoryUsage: 0,
      uptime: 0,
    });
    expect(result).rejects.toBeInstanceOf(Error);
  });
});
