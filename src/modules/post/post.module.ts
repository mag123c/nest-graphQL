import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { Comment } from "./entities/comment.entity";
import { Post } from "./entities/post.entity";
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
        PostResolver,
        CommentResolver,

        PostRepository,
        CommentRepository,
    ],
})
export class PostModule { }