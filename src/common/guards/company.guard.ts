import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { User } from "@prisma/client"
import { CompanyService } from "../../company/company.service"

@Injectable()
export class CompanyGuard implements CanActivate {
  constructor(private companyService: CompanyService, private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    try {
      const { id } = await this.jwtService.decode(request.headers.authorization.split(' ')[1]) as User
      const companyId = request.params.id

      const company = await this.companyService.findById(companyId)

      return company.userId === id
    } catch (error) {
      return false
    }
  }
}