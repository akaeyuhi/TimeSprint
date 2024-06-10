import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { IsBoolean, IsDate, Length } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(8, 20)
  name: string;

  @Column()
  @Length(20)
  description: string;

  @Column()
  urgency: boolean;

  @Column()
  importance: boolean;

  @Column({ type: 'timestamp' })
  @IsDate()
  startDate: Date;

  @Column({ type: 'timestamp' })
  @IsDate()
  endDate: Date;

  @Column({ type: 'boolean' })
  @IsBoolean()
  isCompleted = false;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Task, task => task.dependencies)
  @JoinTable()
  // eslint-disable-next-line no-use-before-define
  dependent: Task[];

  @ManyToMany(() => Task, task => task.dependent, { eager: true })
  // eslint-disable-next-line no-use-before-define
  dependencies: Task[];
}
