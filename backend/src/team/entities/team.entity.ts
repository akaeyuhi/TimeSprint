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
import { Project } from 'src/project/entities/project.entity';

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

  @ManyToMany(() => User, user => user.teams, {
    eager: true,
    cascade: ['update'],
  })
  @JoinTable({
    name: 'team_members',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
  })
  members: User[];

  @ManyToMany(() => User, {
    eager: true,
    cascade: ['update'],
  })
  @JoinTable({
    name: 'team_admins',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
  })
  admins: User[];

  @OneToMany(() => Project, project => project.team, {
    eager: true,
    cascade: true,
  })
  projects: Project[];
}
