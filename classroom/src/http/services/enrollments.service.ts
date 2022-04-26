import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { GetByCourseAndStudentIdParams } from "../interfaces/GetByCourseAndStudentIdParams.interface";

@Injectable()
export class EnrollmentsService {
  constructor(
    private prisma: PrismaService
  ) { }

  getByCourseAndStudentId(
    { courseId, studentId }: GetByCourseAndStudentIdParams
  ) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        cancelledAt: null,
      },

    })
  }

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        cancelledAt: null,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  listEnrollmentsByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        cancelledAt: null,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}