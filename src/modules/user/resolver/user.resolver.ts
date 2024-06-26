import { Query, Resolver } from "@nestjs/graphql";
import { BaseResolver } from "src/common/abstract/base.resolver";
import { User } from "../entities/user.entity";
import { UserService } from "../user.service";

@Resolver(() => User)
export class UserResolver extends BaseResolver(User) {
    constructor(private userService: UserService) {
        super();
    }

    @Query(() => User)
    async user(id: number): Promise<User> {
        return this.userService.findOne(id);
    }
}
