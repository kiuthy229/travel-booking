import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  user?: JwtPayload | string;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.body.access_token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'Access Denied. No token provided.' });
    return; // Ensure the function exits after sending a response
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: jwt.VerifyErrors | null, user: JwtPayload | string | undefined) => {
    if (err) {
      res.status(401).json({ success: false, message: 'Token is invalid' });
      return; // Ensure the function exits after sending a response
    }
    req.user = user;
    next(); // Pass control to the next middleware
  });
};

export const verifyUser = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.body.access_token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(403).json({ success: false, message: 'Access Denied: No token provided' });
    return; // Ensure the function exits after sending a response
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next(); // Pass control to the next middleware
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export const verifyAdmin = (req: CustomRequest, res: Response, next: NextFunction): void => {
  verifyToken(req, res, () => {
    if (req.user && typeof req.user !== 'string' && req.user.role === 'admin') {
      next(); // Pass control to the next middleware
    } else {
      res.status(403).json({ success: false, message: 'Admin access required.' });
    }
  });
};
