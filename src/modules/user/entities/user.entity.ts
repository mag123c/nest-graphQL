import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/abstract/base.entity,';
import { Comment } from 'src/modules/post/entities/comment.entity';
import { Post } from 'src/modules/post/entities/post.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class User extends BaseEntity {

    @Column({ type: 'varchar', length: 100, name: 'nickname' })
    @Field(type => String)
    nickname: string;

    @Column({ type: 'varchar', length: 100, name: 'email', unique: true })
    @Field(type => String)
    email: string;

    @Column({ type: 'varchar', length: 100, name: 'thumbnail', nullable: true })
    @Field(type => String, { nullable: true })
    thumbnail: string;

    @OneToMany(() => Post, post => post.author)
    @JoinColumn({ name: 'id', referencedColumnName: 'authorId' })
    @Field(type => [Post], { nullable: true })
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.author)
    @Field(type => [Comment], { nullable: true })
    comments: Comment[];
}
