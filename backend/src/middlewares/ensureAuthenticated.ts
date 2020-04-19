import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: string;
  exp: string;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {

  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error('Missing authorization token');
  }

  const [, token] = authHeader.split(' ');

  const {secret, expiresIn} = authConfig.jwt;

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    request.user = { id: sub };

    return next();
  } catch {
    throw new Error('Invalid token');
  }

}

export default ensureAuthenticated;
