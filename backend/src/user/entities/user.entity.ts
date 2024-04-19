import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Team } from 'src/entities/team.entity';
import { Task } from 'src/entities/task.entity';
import { IsEmail, IsString, Length, Matches, Min } from 'class-validator';
import { LeisureActivity } from 'src/entities/leisure-activity.entity';
import { passwordRegex, UserRole } from 'src/user/utils';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(8, 20)
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @Min(8)
  @Matches(passwordRegex)
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.COLLABORATOR,
  })
  role: UserRole;

  @OneToMany(() => LeisureActivity, (activity) => activity.user)
  activities: LeisureActivity[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;
}
