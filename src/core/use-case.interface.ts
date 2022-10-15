export interface IUseCase<DTO, Result> {
  execute(dto: DTO): Promise<Result>;
}
