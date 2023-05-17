import { Request } from 'express';

export const extractAccessTokenFromHeader = (
  request: Request
): string | undefined => {
  const [type, token] =
    request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};

export const extractRefreshTokenFromBody = (
  request: Request
): string | undefined => {
  return request.body.refreshToken;
};
