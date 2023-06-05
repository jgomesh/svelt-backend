import { Request, Response, NextFunction} from 'express';

import { verify } from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
  role: string;
}

export default function authMiddleware(
  req: Request | any, res: Response, next: NextFunction,
) {
  const {authorization}: any = req.headers;

  if(!authorization) {
    return res.sendStatus(401);
  }
  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = verify(token, 'secret');

    const { id, role } = data as TokenPayload;

    req.userId = id;
    req.role = role;
    if((!id || id === 'undefined') || (!role || role === 'undefined')) {
      return res.sendStatus(401);
    }
    return next();
  } catch {
    return res.sendStatus(401);
  }
}