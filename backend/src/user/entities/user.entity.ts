import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  ManyToMany,
  BeforeUpdate,
} from 'typeorm';
import { Team } from 'src/team/entities/team.entity';
import { Task } from 'src/task/entities/task.entity';
import { IsEmail, IsString, Length, Matches, Min } from 'class-validator';
import { LeisureActivity } from 'src/leisure-activity/entities/leisure-activity.entity';
import { AdminRole, passwordRegex } from 'src/user/utils';
import { hash } from 'bcrypt';

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

  @Column({ select: false })
  @IsString()
  @Min(8)
  @Matches(passwordRegex)
  password: string;

  @Column({
    type: 'enum',
    enum: AdminRole,
    default: AdminRole.USER,
  })
  role: AdminRole;

  @OneToMany(() => LeisureActivity, activity => activity.user, {
    cascade: true,
  })
  activities: LeisureActivity[];

  @OneToMany(() => Task, task => task.user, { cascade: true })
  tasks: Task[];

  @ManyToMany(() => Team, team => team.members, { cascade: ['update'] })
  teams: Team[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
