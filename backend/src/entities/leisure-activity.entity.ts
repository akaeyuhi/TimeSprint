import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { IsDate, Length } from 'class-validator';

@Entity()
export class LeisureActivity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => User)
  user: User;
}
