import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const handleMessageResponse = (status: HttpStatus, message?: string) => {
      const errorMessage = {
        statusCode: status,
        target: exception.meta?.target || {},
        message: exception.meta?.cause ? `${exception.meta?.cause}` : `${exception.message}`,
      }

      if (message) errorMessage.message = message

      return errorMessage
    }

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT
        response.status(status).json(handleMessageResponse(status, `${exception.meta?.target} already exists!`))
        break
      }

      case 'P2025': {
        const status = HttpStatus.NOT_FOUND
        response.status(status).json(handleMessageResponse(status))
        break
      }

      default:
        // default 500 error code
        super.catch(exception, host)
        break
    }
  }
}