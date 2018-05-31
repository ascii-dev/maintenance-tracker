import { Router } from 'express';
// import VerifyToken from '../middlewares/VerifyToken';
// import VerifyAdmin from '../middlewares/VerifyAdmin';
import Frontend from '../../frontend/controllers/FrontendController';

const frontendRoutes = Router();

frontendRoutes.get('/', Frontend.index);

export default frontendRoutes;
