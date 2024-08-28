interface BaseRepository {
  findByMonthType(
    datetime: string,
    type: MeasureTypes,
  ): Promise<MeasureEntity[]>;
  save(measure: MeasureDTO): Promise<MeasureEntity>;
}
