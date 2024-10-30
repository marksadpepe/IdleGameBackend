import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exc: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const statusCode =
      exc instanceof HttpException
        ? exc.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exc instanceof Error ? exc.message : "Internal Server Error";

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
