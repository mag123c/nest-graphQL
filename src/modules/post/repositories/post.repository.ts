import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/common/abstract/base.repository";
import { Repository } from "typeorm/repository/Repository";
import { Post } from "../entities/post.entity";

@Injectable()
export class PostRepository implements BaseRepository<Post> {

    constructor(
        @InjectRepository(Post) private postRepo: Repository<Post>,
    ) { }

    async findAll(authorId?: number): Promise<Post[]> {
        return await this.postRepo.find({ where: { authorId: authorId }});
        const query = this.postRepo.createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'user')
            .leftJoinAndSelect('post.comments', 'comment')
            .leftJoinAndSelect('comment.author', 'commentAuthor')

        if (authorId) {
            query.where('post.authorId = :authorId', { authorId });
        }
        return await query.getMany();
    }

    async findOne(id: number): Promise<Post> {
        return await this.postRepo.findOneBy({ id });
    }

    async findAuthor(authorId: number): Promise<Post> {
        return await this.postRepo.findOneBy({ authorId: authorId });
    }

    async savePost({ authorId, title, content }: { authorId: number, title: string, content: string }): Promise<Post> {
        const post = this.postRepo.create({ authorId, title, content });
        return await this.postRepo.save(post);
    }


}