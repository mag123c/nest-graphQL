import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor (private userRepo: UserRepository) {}

    async findOne(id: number) {
        console.log('find user')
        return await this.userRepo.findOne(id);
    }
}