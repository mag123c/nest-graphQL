import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { Comment } from "./entities/comment.entity";
import { Post } from "./entities/post.entity";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { CommentRepository } from "./repositories/comment.repository";
import { PostRepository } from "./repositories/post.repository";
import { CommentResolver } from "./resolver/comment.resolver";
import { PostResolver } from "./resolver/post.resolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Post,
            Comment
        ]),
        UserModule
    ],
    providers: [
        PostService,

        PostResolver,
        CommentResolver,

        PostRepository,
        CommentRepository,
    ],
    controllers: [PostController],
})
export class PostModule { }