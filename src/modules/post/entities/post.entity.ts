import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/abstract/base.entity,';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
@ObjectType()
export class Post extends BaseEntity {

    @Column({ type: 'varchar', length: 100, name: 'title' })
    @Field(type => String)
    title: string;

    @Column({ type: 'int', unsigned: true, name: 'author_id' })
    @Field(type => Int)
    authorId: number;


    @Column({ type: 'text', name: 'content' })
    @Field(type => String)
    content: string;

    @Column({ type: 'int', unsigned: true, default: 0 })
    @Field(type => Number, { defaultValue: 0 })
    likes: number;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
    @Field(type => User)
    author: User;

    @OneToMany(() => Comment, comment => comment.post)
    @JoinColumn({ name: 'id', referencedColumnName: 'postId' })
    @Field(type => [Comment], { nullable: true })
    comments: Comment[];
}
