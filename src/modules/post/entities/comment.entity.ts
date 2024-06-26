import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/abstract/base.entity,';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
    
    @Column({ type: 'int', unsigned: true, name: 'post_id' })
    @Field(type => Int)
    postId: number;

    @Column({ type: 'int', unsigned: true, name: 'author_id' })
    @Field(type => Int)
    authorId: number;

    @Column('text')
    @Field(type => String)
    content: string;

    @ManyToOne(() => Post, post => post.comments)
    @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
    @Field(type => Post)
    post: Post;

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
    @Field(type => User)
    author: User;
}
