import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from "./modules/post/entities/comment.entity";
import { Post } from "./modules/post/entities/post.entity";
import { PostModule } from "./modules/post/post.module";
import { User } from "./modules/user/entities/user.entity";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'graphQL',
      logging: true,
      entities: [
        Post,
        User,
        Comment
      ]
    }),
    PostModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
