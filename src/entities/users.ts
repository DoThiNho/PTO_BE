import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base';
import { Roles } from './roles';
import { Requests } from './requests';
import { RequestAssignees } from './requestAssignees';

@Entity()
export class Users extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Roles, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Roles;

  @OneToMany(() => Requests, (request) => request.user)
  requests: Requests[];

  @OneToMany(() => RequestAssignees, (rru) => rru.user)
  relatedRequests: RequestAssignees[];

  @Column()
  avatar: string;
}
