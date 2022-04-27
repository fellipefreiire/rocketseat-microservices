import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { EnrollmentsService } from "src/http/services/enrollments.service";
import { StudentsService } from "src/http/services/students.service";
import { Enrollment } from "../models/enrollment.dto";
import { Student } from "../models/student.dto";

@Resolver(() => Student)
export class StudentsResolvers {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) { }

  // @Query(() => Student)
  // @UseGuards(AuthorizationGuard)
  // me(
  //   @CurrentUser() user: AuthUser
  // ) {
  //   return this.studentsService.getStudentByAuthUserId(user.sub)
  // }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents()
  }

  @ResolveField(() => [Enrollment])
  enrollments(
    @Parent() student: Student,
  ) {
    return this.enrollmentsService.listEnrollmentsByStudent(student.id)
  }
}