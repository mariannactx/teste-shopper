interface BaseRepository {
  findById(id: UUID);
  findByMonthAndType(
    datetime: string,
    type: MeasureTypes,
  ): Promise<MeasureEntity[]>;
  findByCustomer(customer_code: string);
  findByCustomerAndType(customer_code: string, measure_type: MeasureTypes);
  save(measure: SaveMeasureDTO): Promise<MeasureEntity>;
  confirm(id: UUID, value: number): Promise<UpdateResult>;
}
