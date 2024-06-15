import { ItemDto } from 'src/services/dto/item.dto';
import { DeadlineItem } from 'src/models/deadline-item.model';

export interface ProjectDto extends ItemDto, DeadlineItem {}
