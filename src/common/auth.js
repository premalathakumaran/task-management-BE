
// common/auth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const hashCompare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const createToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

const decodeToken = async (token) => {
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};

// Middleware to validate JWT token
export const validate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user object to the request for further use
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check if user is admin
export const adminGuard = (req, res, next) => {
  const user = req.user; // User object attached from validate middleware
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden. Admin privileges required' });
  }
  next();
};



export default {
  hashPassword,
  createToken,
  hashCompare,
  decodeToken,
  validate,
  adminGuard,
};