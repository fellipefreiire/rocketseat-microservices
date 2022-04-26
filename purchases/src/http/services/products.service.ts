import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import slugify from 'slugify';
import { CreateProductParams } from "../interfaces/CreateProductParams.interface";

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService
  ) { }

  listAllProducts() {
    return this.prisma.product.findMany()
  }

  getProductById(productId: string) {
    return this.prisma.product.findUnique({
      where: { id: productId },
    })
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, {
      lower: true
    });

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: { slug }
    })

    if (productWithSameSlug) {
      throw new ConflictException('Product already exists.')
    }

    return await this.prisma.product.create({
      data: {
        title,
        slug
      }
    })
  }
}