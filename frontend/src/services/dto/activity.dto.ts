import { ItemDto } from 'src/services/dto/item.dto';

export interface LeisureActivityDto extends ItemDto {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
}
