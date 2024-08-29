interface BaseRepository {
  findById(id: UUID);
  findByMonthType(
    datetime: string,
    type: MeasureTypes,
  ): Promise<MeasureEntity[]>;
  save(measure: MeasureDTO): Promise<MeasureEntity>;
}
