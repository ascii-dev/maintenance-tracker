import requestRoutes from './config';
import RequestController from '../controllers/requestController';
import VerifyToken from '../middlewares/VerifyToken';

// Route /api/v1
requestRoutes.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Maintenance Tracker API V1' });
});

// Route GET /api/v1/users/requests => Get all user requests
requestRoutes.get('/users/requests', VerifyToken, RequestController.getAllRequests);

// Route POST /api/v1/users/requests => Create new request
requestRoutes.post('/users/requests', VerifyToken, RequestController.createRequest);

// Route GET /api/v1/users/requests/{request_id} => Get single user request
requestRoutes.get('/users/requests/:id', VerifyToken, RequestController.getSingleRequest);

// Route PUT /api/v1/users/requests/{request_id} => Update request
requestRoutes.put('/users/requests/:id', VerifyToken, RequestController.updateRequest);

export default requestRoutes;
