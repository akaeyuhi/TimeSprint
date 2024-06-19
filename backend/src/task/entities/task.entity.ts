import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { IsBoolean, IsDate, Length } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ type: 'boolean', default: false })
  @IsBoolean()
  isCompleted = false;

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  isOwnTask = true;

  @ManyToOne(() => Project, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => User, {
    eager: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Task, task => task.dependencies, { cascade: ['update'] })
  @JoinColumn({ name: 'dependent_id' })
  // eslint-disable-next-line no-use-before-define
  dependentOn: Task;

  @OneToMany(() => Task, task => task.dependentOn, {
    cascade: ['update'],
  })
  // eslint-disable-next-line no-use-before-define
  dependencies: Task[];
}
