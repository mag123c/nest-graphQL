import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UserRepository } from "src/modules/user/user.repository";
import { User } from "../../user/entities/user.entity";
import { WritePostReq, WritePostRes } from "../dto/dto";
import { Comment } from "../entities/comment.entity";
import { Post } from "../entities/post.entity";
import { CommentRepository } from "../repositories/comment.repository";
import { PostRepository } from "../repositories/post.repository";

@Resolver(of => Post)
export class PostResolver {
    constructor(
        private postRepo: PostRepository,
        private userRepo: UserRepository,
        private commentRepo: CommentRepository,
    ) {  }

    @Query(() => [Post])
    async posts(
        @Args('authorId', { type: () => Number, nullable: true }) authorId?: number,
    ): Promise<Post[]> {
        return this.postRepo.findAll(authorId);
    }

    @ResolveField(() => User)
    async author(@Parent() post: Post): Promise<User> {
        return await this.userRepo.findOne(post.authorId);
    }

    @ResolveField(() => [Comment])
    async comments(@Parent() post: Post): Promise<Comment[]> {
        return await this.commentRepo.findByPostId(post.id);
    }

    @Mutation(() => WritePostRes)
    async writePost(
        @Args('postInput') postInput: WritePostReq,
    ): Promise<WritePostRes> {
        const post = await this.postRepo.savePost(postInput);
        const author = await this.userRepo.findOne(post.authorId);

        return {
            title: post.title,
            nickname: author.nickname,
            createdAt: post.createdAt,
        };
    }    
}