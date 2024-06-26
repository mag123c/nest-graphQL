import { Injectable } from "@nestjs/common";
import { Comment } from "./entities/comment.entity";
import { CommentRepository } from "./repositories/comment.repository";
import { PostRepository } from "./repositories/post.repository";

@Injectable()
export class PostService {

    constructor(
        private postRepo: PostRepository,
        private commentRepo: CommentRepository,
    ) {}

    async findAll(authorId?: number) {
        console.log('posts');
        return await this.postRepo.findAll(authorId);
    }

    async getAuthor(authorId: number) {
        return await this.postRepo.findAuthor(authorId);
    }

    async getCommentsByPostId(postId: number): Promise<Comment[]> {
        console.log('comments')
        return await this.commentRepo.findByPostId(postId);
    }


    async savePost({ authorId, title, content }: { authorId: number, title: string, content: string }): Promise<any> {
        return await this.postRepo.savePost({ authorId, title, content });

    }
}