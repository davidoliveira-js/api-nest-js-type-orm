import { Request } from 'express';
export declare const extractAccessTokenFromHeader: (request: Request) => string | undefined;
export declare const extractRefreshTokenFromBody: (request: Request) => string | undefined;
