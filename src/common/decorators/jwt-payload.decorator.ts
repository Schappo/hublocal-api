import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import jwtDecode from "jwt-decode"

export const JwtPayload = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest()
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwtDecode(token)
    return decodedToken
  },
)