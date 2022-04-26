import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { AuthUser } from "./AuthUser.interface"

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): AuthUser => {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req

    return req.user
  }
)