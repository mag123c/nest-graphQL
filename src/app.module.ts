import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from "./modules/post/entities/comment.entity";
import { Post } from "./modules/post/entities/post.entity";
import { PostModule } from "./modules/post/post.module";
import { User } from "./modules/user/entities/user.entity";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      sortSchema: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_SCHEMA || 'graphQL',
        logging: true,
        entities: [
          Post,
          User,
          Comment
        ],
      }),
      inject: [ConfigService],
    }),
    PostModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
