import { ShowStatusController } from './show-status.controller';
import { ShowStatusUseCase } from './show-status.use-case';

let showStatusController;

describe('ShowStatusController', () => {
  beforeEach(async () => {
    const useCase = new ShowStatusUseCase();
    showStatusController = await new ShowStatusController(useCase);
  });

  it('should be defined', () => {
    expect(showStatusController).toBeDefined();
  });

  it('should be able to show status', async () => {
    expect(await showStatusController.handle()).resolves;
  });
});
