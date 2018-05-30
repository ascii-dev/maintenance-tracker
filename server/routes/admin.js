import adminRoutes from './config';
import VerifyToken from '../middlewares/VerifyToken';
import VerifyAdmin from '../middlewares/VerifyAdmin';
import AdminController from '../controllers/adminController';

adminRoutes.get('/requests', VerifyToken, VerifyAdmin, AdminController.getAllRequests);
adminRoutes.get('/requests/:id', VerifyToken, VerifyAdmin, AdminController.getSingleRequest);
adminRoutes.put('/requests/:id', VerifyToken, VerifyAdmin, AdminController.approveRequest);

export default adminRoutes;
