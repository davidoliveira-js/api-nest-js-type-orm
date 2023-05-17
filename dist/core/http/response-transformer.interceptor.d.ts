import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpAdapterHost } from '@nestjs/core';
export declare class ResponseTransformerInterceptor implements NestInterceptor {
    private httpAdapter;
    constructor(adapterHost: HttpAdapterHost);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>;
}
