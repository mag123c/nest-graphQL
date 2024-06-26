import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './../../common/abstract/base.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository implements BaseRepository<User> {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {}
    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async findOne(id: number): Promise<User> {
        return await this.userRepo.findOneBy({ id });
    }
}