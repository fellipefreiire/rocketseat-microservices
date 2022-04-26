import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreatePurchaseParams } from "../interfaces/CreatePurchaseParams.interface";

@Injectable()
export class PurchasesService {
  constructor(
    private prisma: PrismaService
  ) { }

  listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  listAllFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customerId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async createPurchase({ customerId, productId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId
      }
    })

    if (!product) {
      throw new NotFoundException('Product not found.')
    }

    return await this.prisma.purchase.create({
      data: {
        customerId,
        productId
      }
    })
  }
}