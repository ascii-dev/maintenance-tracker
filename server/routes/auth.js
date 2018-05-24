import { Router } from 'express';
import AuthController from '../controllers/authController';

const authRoutes = Router();

// Route POST /auth/signup => User create an account
authRoutes.post('/signup', AuthController.signup);

// Route POST /auth/login => User login to own account
authRoutes.post('/login', AuthController.login);

export default authRoutes;
