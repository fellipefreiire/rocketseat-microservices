import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class StudentsService {
  constructor(
    private prisma: PrismaService
  ) { }

  listAllStudents() {
    return this.prisma.students.findMany()
  }

  getStudentByAuthUserId(authUserId: string) {
    return this.prisma.students.findUnique({
      where: {
        authUserId
      }
    })
  }

  getStudentById(id: string) {
    return this.prisma.students.findUnique({
      where: { id }
    })
  }
}