import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/common/abstract/base.repository";
import { Repository } from "typeorm";
import { Comment } from "../entities/comment.entity";

@Injectable()
export class CommentRepository implements BaseRepository<Comment>{

    constructor(
        @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    ) {}

    async findAll(): Promise<Comment[]> {
        return await this.commentRepo.find();
    }
    async findOne(id: number): Promise<Comment> {
        return await this.commentRepo.findOneBy({ postId: id });
    }
    async findByPostId(postId: number): Promise<Comment[]> {
        return await this.commentRepo.findBy({ postId: postId });
    }
    
}