import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { IsBoolean, IsDate, Length } from 'class-validator';

@Entity()
export class LeisureActivity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Length(8, 20)
  name: string;

  @Column()
  @Length(20)
  description: string;

  @Column({ type: 'timestamp' })
  @IsDate()
  startDate: Date;

  @Column({ type: 'timestamp' })
  @IsDate()
  endDate: Date;

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isCompleted = false;

  @ManyToOne(() => User)
  user: User;
}
