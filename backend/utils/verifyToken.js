import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Access Denied. No token provided.' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: 'Token is invalid' });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res
      .status(403)
      .json({ success: false, message: 'Invalid or expired token.' });
  }
};

export const verifyUser = (req, res, next) => {
  const token =
    req.body.access_token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ success: false, message: 'Access Denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: 'Admin access required.' });
    }
  });
};
