import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { UserRepository } from "src/modules/user/user.repository";
import { User } from "../../user/entities/user.entity";
import { Comment } from "../entities/comment.entity";

@Resolver(of => Comment)
export class CommentResolver {
    constructor(private userRepo: UserRepository) {}

    @ResolveField(() => User)
    async author(@Parent() comment: Comment): Promise<User> {
        return await this.userRepo.findOne(comment.authorId);
    }
}