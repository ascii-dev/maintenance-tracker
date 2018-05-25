import { Router } from 'express';
import RequestController from '../controllers/requestController';
import VerifyToken from '../middlewares/VerifyToken';

const requestRoutes = Router();

// Route /api/v1
requestRoutes.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Maintenance Tracker API V1' });
});

// Route GET /api/v1/users/requests => Get all user requests
requestRoutes.get('/users/requests', VerifyToken, RequestController.getAllRequests);

// Route GET /api/v1/users/requests/{request_id} => Get single user request
requestRoutes.get('/users/requests/:id', RequestController.getSingleRequest);

// Route POST /api/v1/users/requests => Create new request
requestRoutes.post('/users/requests', RequestController.createRequest);

// Route PUT /api/v1/users/requests/{request_id} => Update request
requestRoutes.put('/users/requests/:id', RequestController.updateRequest);

// Route DELETE /api/v1/users/requests/{request_id} => Delete request
requestRoutes.delete('/users/requests/:id', RequestController.deleteRequest);

export default requestRoutes;
