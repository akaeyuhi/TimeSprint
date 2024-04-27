import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { IsBoolean, IsDate, Length } from 'class-validator';

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

  @Column()
  @IsBoolean()
  isCompleted: boolean;

  @ManyToOne(() => User)
  user: User;
}
