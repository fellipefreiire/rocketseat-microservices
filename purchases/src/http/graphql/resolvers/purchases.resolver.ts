import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser } from 'src/http/auth/AuthUser.interface';
import { CurrentUser } from 'src/http/auth/current-user.decorator';
import { CustomersService } from 'src/http/services/customer.service';
import { ProductsService } from 'src/http/services/products.service';

import { PurchasesService } from 'src/http/services/purchases.service';
import { CreatePurchaseInput } from '../inputs/create-purchase.input';
import { Product } from '../models/product.dto';
import { Purchase } from '../models/purchase.dto';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customersServices: CustomersService,
  ) { }

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases()
  }

  @ResolveField(() => Product)
  product(
    @Parent() purchase: Purchase,
  ) {
    return this.productsService.getProductById(purchase.productId)
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customersServices.getCustomerByAuthUserId(
      user.sub
    )

    if (!customer) {
      customer = await this.customersServices.createCustomer({
        authUserId: user.sub
      })
    }

    return this.purchasesService.createPurchase({
      customerId: customer.id,
      productId: data.productId
    })
  }
}
