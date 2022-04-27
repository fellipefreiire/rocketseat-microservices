import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Purchase } from './purchase.dto';

@ObjectType('User')
@Directive('@key(fields: "authUserId")')
export class Customer {
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase[]
}
