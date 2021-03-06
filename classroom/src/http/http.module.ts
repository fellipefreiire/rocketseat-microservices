import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';

import { DatabaseModule } from '../database/database.module';
import { CoursesResolvers } from './graphql/resolvers/courses.resolver';
import { EnrollmentsResolvers } from './graphql/resolvers/enrollments.resolver';
import { StudentsResolvers } from './graphql/resolvers/students.resolver';
import { CoursesService } from './services/courses.service';
import { EnrollmentsService } from './services/enrollments.service';
import { StudentsService } from './services/students.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    })
  ],
  providers: [
    //resolvers
    CoursesResolvers,
    EnrollmentsResolvers,
    StudentsResolvers,

    //services
    CoursesService,
    EnrollmentsService,
    StudentsService
  ]
})
export class HttpModule { }
