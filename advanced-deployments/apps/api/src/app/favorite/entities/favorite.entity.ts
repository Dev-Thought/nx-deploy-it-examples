import { Entity, ObjectIdColumn, OneToOne, JoinColumn, Column } from 'typeorm';
import { Movie } from '@advanced-deployments/api-interfaces';

@Entity('favorite')
export class FavoriteEntity {
  @ObjectIdColumn()
  _id: string;

  // TODO: add use relation
  // @OneToOne(type => UserEntity)
  // @JoinColumn()
  // user: UserEntity;

  @Column()
  userId: string;

  @Column()
  movies: Movie[];
}
