import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { isArray } from 'class-validator'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class RemoveUserPasswordFieldInterceptor implements NestInterceptor {

  removePasswordIfExists(data: any) {
    if (!!data.password) {
      delete data.password
    }
    return data
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data) => {
          if (isArray(data)) {
            return data.map(item => {
              return this.removePasswordIfExists(item)
            })
          }
          return this.removePasswordIfExists(data)
        }),
      )
  }
}