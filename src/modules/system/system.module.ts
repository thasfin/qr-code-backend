import { Module } from '@nestjs/common';
import { ShowStatusController } from './use-cases/show-status/show-status.controller';
import { ShowStatusUseCase } from './use-cases/show-status/show-status.use-case';

@Module({
  controllers: [ShowStatusController],
  providers: [ShowStatusUseCase],
})
export class SystemModule {}
