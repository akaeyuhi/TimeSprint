import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Team } from 'src/entities/team.entity';
import { Task } from 'src/entities/task.entity';
import { IsEmail, IsString, Length, Matches, Min } from 'class-validator';

const passwordRegex = new RegExp('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$');

export enum UserRole {
  COLLABORATOR = 'collaborator',
  ADMIN = 'admin',
}

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

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToMany(() => Task)
  @JoinTable()
  tasks: Task[];
}
