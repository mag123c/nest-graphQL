import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@InputType()
export class WritePostReq {
    @Field(() => String, { nullable: false })
    title: string;
    @Field(() => String, { nullable: false })
    content: string;
    @Field(() => Int, { nullable: false })
    authorId: number;
}

@ObjectType()
export class WritePostRes {        
    @Field(() => String, { nullable: false })
    title: string;
    @Field(() => String, { nullable: false })
    nickname: string;
    @Field(() => Date, { nullable: false })
    createdAt: Date;
}