import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base';
import { Users } from './users';
import { Requests } from './requests';

@Entity()
export class RequestAssignees extends BaseEntity {
  @ManyToOne(() => Users, (user) => user.relatedRequests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: Users;

  @ManyToOne(() => Requests, (request) => request.relatedRequests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'requestId' })
  request: Requests;
}
