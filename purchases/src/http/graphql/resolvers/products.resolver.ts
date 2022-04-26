import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ProductsService } from 'src/http/services/products.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

import { CreateProductInput } from '../inputs/create-product.input';
import { Product } from '../models/product.dto';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productService: ProductsService) { }

  @Query(() => [Product])
  // @UseGuards(AuthorizationGuard)
  products() {
    return this.productService.listAllProducts()
  }

  @Mutation(() => Product)
  // @UseGuards(AuthorizationGuard)
  createProduct(
    @Args('data') data: CreateProductInput,
  ) {
    return this.productService.createProduct(data)
  }
}
