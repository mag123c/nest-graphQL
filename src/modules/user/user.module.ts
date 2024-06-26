import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserResolver } from "./resolver/user.resolver";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        UserService,
        UserResolver,
        UserRepository,
    ],
    exports: [
        UserService,
        UserResolver,
        UserRepository,
    ]
})
export class UserModule { }