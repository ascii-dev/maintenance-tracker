import { Router } from 'express';
import RequestController from '../controllers/RequestController';
import VerifyToken from '../middlewares/VerifyToken';

const requestRoutes = Router();

// Route GET /api/v1/users/requests => Get all user requests
requestRoutes.get('/requests', VerifyToken, RequestController.getAllRequests);

// Route POST /api/v1/users/requests => Create new request
requestRoutes.post('/requests', VerifyToken, RequestController.createRequest);

// Route GET /api/v1/users/requests/{request_id} => Get single user request
requestRoutes.get('/requests/:id', VerifyToken, RequestController.getSingleRequest);

// Route PUT /api/v1/users/requests/{request_id} => Update request
requestRoutes.put('/requests/:id', VerifyToken, RequestController.updateRequest);

export default requestRoutes;
