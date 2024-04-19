import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Length } from 'class-validator';

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

  @OneToMany(() => User, (user) => user.team)
  users: User[];

  @ManyToMany(() => User)
  @JoinTable()
  admins: User[];
}
