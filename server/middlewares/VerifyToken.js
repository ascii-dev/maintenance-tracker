import jwt from 'jsonwebtoken';
import config from '../config/config';

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send('No token has been provided in the request');
  }
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).send('Could not authenticate the provided token');
    }
    req.userId = decoded.id;
    next();
    return null;
  });
  return null;
};

export default verifyToken;
