import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base';
import { Users } from './users';

@Entity()
export class Roles extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Users, (user) => user.role)
  users: Users[];
}
