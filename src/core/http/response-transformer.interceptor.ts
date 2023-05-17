import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { NestResponse } from './nest-response';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class ResponseTransformerInterceptor
  implements NestInterceptor
{
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((controllerReponse: NestResponse) => {
        if (controllerReponse instanceof NestResponse) {
          const httpContext = context.switchToHttp();
          const response = httpContext.getResponse();
          const { headers, status, body } = controllerReponse;

          const headerNames = Object.getOwnPropertyNames(headers);
          headerNames.forEach((headerName) => {
            const headerValue = headers[headerName];
            this.httpAdapter.setHeader(
              response,
              headerName,
              headerValue
            );
          });

          this.httpAdapter.status(response, status);
          return body;
        }
        return controllerReponse;
      })
    );
  }
}
