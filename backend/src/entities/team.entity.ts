import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { IsDate, Length } from 'class-validator';

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
}
