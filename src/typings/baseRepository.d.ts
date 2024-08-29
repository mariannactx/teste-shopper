interface BaseRepository {
  findById(id: UUID);
  findByMonthType(
    datetime: string,
    type: MeasureTypes,
  ): Promise<MeasureEntity[]>;
  save(measure: SaveMeasureDTO): Promise<MeasureEntity>;
  confirm(id: UUID, value: number): Promise<UpdateResult>;
}
