import { UseGuards } from "@nestjs/common";
import { Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { AuthUser } from "src/http/auth/AuthUser.interface";
import { CurrentUser } from "src/http/auth/current-user.decorator";
import { EnrollmentsService } from "src/http/services/enrollments.service";
import { StudentsService } from "src/http/services/students.service";
import { Student } from "../models/student.dto";

@Resolver(() => Student)
export class StudentsResolvers {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) { }

  @Query(() => Student)
  @UseGuards(AuthorizationGuard)
  me(
    @CurrentUser() user: AuthUser
  ) {
    return this.studentsService.getStudentByAuthUserId(user.sub)
  }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents()
  }

  @ResolveField()
  enrollments(
    @Parent() student: Student,
  ) {
    return this.enrollmentsService.listEnrollmentsByStudent(student.id)
  }
}