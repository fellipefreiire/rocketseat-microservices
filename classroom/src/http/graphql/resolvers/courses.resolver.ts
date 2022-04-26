import { NotFoundException, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "src/http/auth/authorization.guard";
import { AuthUser } from "src/http/auth/AuthUser.interface";
import { CurrentUser } from "src/http/auth/current-user.decorator";
import { CoursesService } from "src/http/services/courses.service";
import { EnrollmentsService } from "src/http/services/enrollments.service";
import { StudentsService } from "src/http/services/students.service";
import { CreateCourseInput } from "../inputs/create-course.input";
import { Course } from "../models/course.dto";

@Resolver(() => Course)
export class CoursesResolvers {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService
  ) { }

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.listAllCourses()
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(
    @Args('id') id: string,
    @CurrentUser() user: AuthUser
  ) {
    const student = await this.studentsService.getStudentByAuthUserId(user.sub)

    if (!student) {
      throw new NotFoundException('Student not found.')
    }

    const enrollment = await this.enrollmentsService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id
    })

    if (!enrollment) {
      throw new UnauthorizedException()
    }

    return this.coursesService.getCourseById(id)
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(
    @Args('data') data: CreateCourseInput
  ) {
    return this.coursesService.createCourse(data)
  }
}