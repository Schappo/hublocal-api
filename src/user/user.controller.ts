import { Controller, UseInterceptors } from '@nestjs/common'
import { User } from '@prisma/client'
import { BaseCrudController } from '../common/base-crud.controller'
import { RemoveUserPasswordFieldInterceptor } from '../common/interceptors/password-response.interceptor'
import { UserService } from './user.service'

@Controller('user')
@UseInterceptors(RemoveUserPasswordFieldInterceptor)
export class UserController extends BaseCrudController<User> {
  constructor(
    private readonly userService: UserService,
  ) {
    super(userService)
  }
}
