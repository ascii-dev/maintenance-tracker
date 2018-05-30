import { Router } from 'express';
import VerifyToken from '../middlewares/VerifyToken';
import VerifyAdmin from '../middlewares/VerifyAdmin';
import AdminController from '../controllers/AdminController';

const adminRoutes = Router();

adminRoutes.get('/', VerifyToken, VerifyAdmin, AdminController.getAllRequests);
adminRoutes.get('/:id', VerifyToken, VerifyAdmin, AdminController.getSingleRequest);
adminRoutes.put('/:id/approve', VerifyToken, VerifyAdmin, AdminController.approveRequest);
adminRoutes.put('/:id/disapprove', VerifyToken, VerifyAdmin, AdminController.disapproveRequest);
adminRoutes.put('/:id/resolve', VerifyToken, VerifyAdmin, AdminController.resolveRequest);
adminRoutes.get('/users/:id', VerifyToken, VerifyAdmin, AdminController.getUserDetails);

export default adminRoutes;
