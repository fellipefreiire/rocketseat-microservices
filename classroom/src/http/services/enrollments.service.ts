import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateEnrollmentParams } from "../interfaces/CreateEnrollmentParams.interface";
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

  creatEnrollment({ courseId, studentId }: CreateEnrollmentParams) {
    return this.prisma.enrollment.create({
      data: {
        courseId,
        studentId
      }
    })
  }
}