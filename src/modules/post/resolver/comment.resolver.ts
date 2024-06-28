import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { UserRepository } from "src/modules/user/user.repository";
import { User } from "../../user/entities/user.entity";
import { Comment } from "../entities/comment.entity";

@Resolver(of => Comment)
export class CommentResolver {
    constructor(private userRepo: UserRepository) {}

    @ResolveField(() => User)
    async author(@Parent() comment: Comment): Promise<User> {
        console.log('코멘트의 작성자를 가져오는 리졸버')
        return await this.userRepo.findOne(comment.authorId);
    }
}