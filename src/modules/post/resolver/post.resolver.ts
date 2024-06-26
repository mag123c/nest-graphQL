import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "../../user/entities/user.entity";
import { UserService } from "../../user/user.service";
import { WritePostReq, WritePostRes } from "../dto/dto";
import { Comment } from "../entities/comment.entity";
import { Post } from "../entities/post.entity";
import { PostService } from "../post.service";

@Resolver(of => Post)
export class PostResolver {
    constructor(
        private postService: PostService,
        private userService: UserService,
    ) {  }

    @Query(() => [Post])
    async posts(
        @Args('authorId', { type: () => Number, nullable: true }) authorId?: number,
    ): Promise<Post[]> {
        console.log('전체 글 목록을 가져오는 리졸버')
        return this.postService.findAll(authorId);
    }

    @Mutation(() => WritePostRes)
    async writePost(
        @Args('postInput') postInput: WritePostReq,
    ): Promise<WritePostRes> {
        const post = await this.postService.savePost(postInput);
        const author = await this.userService.findOne(post.authorId);

        console.log(post, author)

        return {
            title: post.title,
            nickname: author.nickname,
            createdAt: post.createdAt,
        };
    }    

    @ResolveField(() => User)
    async author(@Parent() post: Post): Promise<User> {
        console.log('글의 작성자를 가져오는 리졸버')
        return await this.userService.findOne(post.authorId);
    }

    @ResolveField(() => [Comment])
    async comments(@Parent() post: Post): Promise<Comment[]> {
        console.log('코멘트를 가져오는 리졸버')
        return await this.postService.getCommentsByPostId(post.id);
    }

}