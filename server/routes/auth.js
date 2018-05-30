import { Router } from 'express';
import AuthController from '../controllers/authController';

const authRoutes = Router();

// Route GET /auth/signup => User create an account
authRoutes.post('/signup', AuthController.signup);

export default authRoutes;
