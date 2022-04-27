import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateCourseParams } from "../interfaces/CreateCourseParams.interface";
import slugify from 'slugify'

@Injectable()
export class CoursesService {
  constructor(
    private prisma: PrismaService
  ) { }

  listAllCourses() {
    return this.prisma.course.findMany()
  }

  getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: { id }
    })
  }

  getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: {
        slug
      }
    })
  }

  async createCourse({
    title,
    slug = slugify(title, { lower: true })
  }: CreateCourseParams) {
    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        slug
      }
    })

    if (courseAlreadyExists) {
      throw new ConflictException('Course already exists.')
    }

    return await this.prisma.course.create({
      data: {
        title,
        slug
      }
    })
  }
}