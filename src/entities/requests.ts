import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base';
import { Users } from './users';
import { RequestAssignees } from './requestAssignees';

@Entity()
export class Requests extends BaseEntity {
  @ManyToOne(() => Users, (user) => user.requests)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @ManyToOne(() => Users, { nullable: true })
  @JoinColumn({ name: 'approvedId' })
  approvedBy: Users;

  @OneToMany(() => RequestAssignees, (rru) => rru.request)
  relatedRequests: RequestAssignees[];

  @Column()
  reason: string;

  @Column()
  startTime: number;

  @Column()
  endTime: number;

  @Column()
  status: string;
}
