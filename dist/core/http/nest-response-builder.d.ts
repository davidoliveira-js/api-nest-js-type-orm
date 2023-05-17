import { NestResponse } from './nest-response';
export declare class NestResponseBuilder {
    private response;
    setStatus(status: number): this;
    setHeaders(headers: Object): this;
    setBody(body: Object): this;
    build(): NestResponse;
}
