import { Router } from 'express';
import RequestController from '../controllers/requestController';

const requestRoutes = Router();

// Route /api/v1
requestRoutes.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Maintenance Tracker API V1' });
});

// Route GET /api/v1/users/requests => Get all user requests
requestRoutes.get('/users/requests', RequestController.getAllRequests);

// Route GET /api/v1/users/requests/{request_id} => Get single user request
requestRoutes.get('/users/requests/:id', RequestController.getSingleRequest);

// Route POST /api/v1/users/requests => Create new request
requestRoutes.post('/users/requests', RequestController.createRequest);

export default requestRoutes;
