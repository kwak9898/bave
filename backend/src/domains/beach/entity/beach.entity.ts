import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { Feed } from '../../feed/entity/feed.entity';
import { Like } from '../../like/entity/like.entity';

@Entity('beach')
export class Beach extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'beach_id',
    comment: '해수욕장 ID',
  })
  beachId: number;

  @Column('varchar', {
    name: 'sido_name',
    comment: '시 이름',
    nullable: false,
  })
  sidoName: string;

  @Column('varchar', {
    name: 'gugun_name',
    comment: '구/군 이름',
    nullable: false,
  })
  gugun_name: string;

  @Column('varchar', {
    name: 'beach_name',
    comment: '해수욕장 이름',
    nullable: false,
  })
  beachName: string;

  @Column('varchar', {
    name: 'latitude',
    comment: '위도',
    nullable: false,
  })
  latitude: string;

  @Column('varchar', {
    name: 'longitude',
    comment: '경도',
    nullable: false,
  })
  longitude: string;

  @OneToMany(() => Feed, (feed) => feed.beachId)
  @JoinColumn({ name: 'feed_id', referencedColumnName: 'feedId' })
  feedList: Feed[];

  @OneToMany(() => Like, (like) => like.beachId)
  @JoinColumn({ name: 'like_id', referencedColumnName: 'likeId' })
  likeList: Like[];
}
