import { Type } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";

export function BaseResolver<T extends Type<unknown>>(classRef: T): any {
    @Resolver({ isAbstract: true })
    abstract class BaseResolverHost {
        @Query((type) => [classRef], { name: `${classRef.name.toLowerCase()}s` })
        async findAll(): Promise<T[]> {
            return [];
        }
    }
    return BaseResolverHost;
}