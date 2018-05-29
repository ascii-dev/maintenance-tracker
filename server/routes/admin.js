import adminRoutes from './config';
import VerifyToken from '../middlewares/VerifyToken';
import VerifyAdmin from '../middlewares/VerifyAdmin';
import AdminController from '../controllers/adminController';

adminRoutes.get('/requests', VerifyToken, VerifyAdmin, AdminController.getAllRequests);
adminRoutes.get('/requests/:id', VerifyToken, VerifyAdmin, AdminController.getSingleRequest);
adminRoutes.put('/requests/:id/approve', VerifyToken, VerifyAdmin, AdminController.approveRequest);
adminRoutes.put('/requests/:id/disapprove', VerifyToken, VerifyAdmin, AdminController.disapproveRequest);

export default adminRoutes;
