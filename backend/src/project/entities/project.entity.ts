import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Team } from 'src/team/entities/team.entity';
import { Task } from 'src/task/entities/task.entity';
import { IsBoolean, IsDate, Length } from 'class-validator';

@Entity()
export class Project {
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

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];
}
