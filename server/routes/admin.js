import { Router } from 'express';
import VerifyToken from '../middlewares/VerifyToken';
import VerifyAdmin from '../middlewares/VerifyAdmin';
import AdminController from '../controllers/AdminController';

const adminRoutes = Router();

adminRoutes.use(VerifyToken);
adminRoutes.use(VerifyAdmin);

adminRoutes.get('/', AdminController.getAllRequests);
adminRoutes.get('/:id', AdminController.getSingleRequest);
adminRoutes.put('/:id/approve', AdminController.approveRequest);
adminRoutes.put('/:id/disapprove', AdminController.disapproveRequest);
adminRoutes.put('/:id/resolve', AdminController.resolveRequest);
adminRoutes.get('/users/:id', AdminController.getUserDetails);

export default adminRoutes;
