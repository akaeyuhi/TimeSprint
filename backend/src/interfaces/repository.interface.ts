export interface IRepository<T> {
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<T>;
  findAll(): Promise<T[]>;
}
