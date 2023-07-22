import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// interface TokenPayload {
//   id: string;
//   iat: number;
//   exp: number;
// }

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Please authenticate' });
  }
  const token = authorization.replace('Bearer', '').trim();

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch {
    return res.status(401).json({ error: 'Please authenticate' });
  }
}
