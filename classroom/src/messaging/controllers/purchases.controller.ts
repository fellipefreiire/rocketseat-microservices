import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CoursesService } from "src/http/services/courses.service";
import { EnrollmentsService } from "src/http/services/enrollments.service";
import { StudentsService } from "src/http/services/students.service";
import { PurchaseCreatedPaylod } from "../interfaces/PurchaseCreatedPayload.interface";

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService
  ) { }

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(
    @Payload('value') payload: PurchaseCreatedPaylod
  ) {
    let student = await this.studentsService.getStudentByAuthUserId(
      payload.customer.authUserId
    )

    if (!student) {
      student = await this.studentsService.createStudent({
        authUserId: payload.customer.authUserId
      })
    }

    let course = await this.coursesService.getCourseBySlug(
      payload.product.slug
    )

    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title
      })
    }

    await this.enrollmentsService.creatEnrollment({
      courseId: course.id,
      studentId: student.id
    })
  }
}