import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserResolver } from "./resolver/user.resolver";
import { UserRepository } from "./user.repository";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        UserResolver,
        UserRepository,
    ],
    exports: [
        UserResolver,
        UserRepository,
    ]
})
export class UserModule { }