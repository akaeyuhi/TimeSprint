import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Length } from 'class-validator';
import { Project } from 'src/entities/project.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(8, 20)
  name: string;

  @Column()
  @Length(20)
  description: string;

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];

  @ManyToMany(() => User)
  @JoinTable()
  admins: User[];

  @OneToMany(() => Project, (project) => project.team)
  projects: Project[];
}
