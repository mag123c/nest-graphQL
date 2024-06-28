import { Query, Resolver } from "@nestjs/graphql";
import { BaseResolver } from "src/common/abstract/base.resolver";
import { User } from "../entities/user.entity";
import { UserRepository } from "../user.repository";

@Resolver(() => User)
export class UserResolver extends BaseResolver(User) {
    constructor(private userRepo: UserRepository) {
        super();
    }

    @Query(() => User)
    async user(id: number): Promise<User> {
        return this.userRepo.findOne(id);
    }
}
