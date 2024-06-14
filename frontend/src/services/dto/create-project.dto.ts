import { ItemDto } from 'src/services/dto/item.dto';
import { DeadlineItem } from 'src/models/deadline-item.model';

export interface CreateProjectDto extends ItemDto, DeadlineItem {}
