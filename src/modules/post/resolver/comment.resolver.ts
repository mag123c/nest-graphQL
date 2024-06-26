import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "../../user/entities/user.entity";
import { UserService } from "../../user/user.service";
import { Comment } from "../entities/comment.entity";

@Resolver(of => Comment)
export class CommentResolver {
    constructor(private userService: UserService) {}

    @ResolveField(() => User)
    async author(@Parent() comment: Comment): Promise<User> {
        console.log('코멘트의 작성자를 가져오는 리졸버')
        return await this.userService.findOne(comment.authorId);
    }
}