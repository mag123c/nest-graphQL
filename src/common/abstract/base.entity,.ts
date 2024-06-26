import { Field, Int, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
export class BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    @Field(type => Int)
    id: number;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field(type => Date)
    createdAt: Date;
}