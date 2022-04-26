import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'node:path';
import { ProductsService } from './services/products.service';
import { PurchasesService } from './services/purchases.service';

import { DatabaseModule } from '../database/database.module';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { CustomersService } from './services/customer.service';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql')
    })
  ],
  providers: [
    //Resolvers
    ProductsResolver,
    PurchasesResolver,
    CustomersResolver,

    //Services
    ProductsService,
    PurchasesService,
    CustomersService
  ]
})
export class HttpModule { }
