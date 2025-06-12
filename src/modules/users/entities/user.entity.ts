import { BaseEntity } from 'src/entities/base';
import { RefreshToken } from 'src/modules/refresh-tokens/entites/refresh-token.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  //   @ManyToOne(() => Roles, (role) => role.users)
  //   @JoinColumn({ name: 'roleId' })
  //   role: Roles;

  //   @OneToMany(() => Requests, (request) => request.user)
  //   requests: Requests[];

  //   @OneToMany(() => RequestAssignees, (rru) => rru.user)
  //   relatedRequests: RequestAssignees[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @Column({ nullable: true, type: 'varchar' }) // chỉ rõ type
  avatar: string | null;
}
