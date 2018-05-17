import { Router } from 'express';
import RequestController from '../controllers/requestController';

const requestRoutes = Router();

// Route /api/v1
requestRoutes.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Maintenance Tracker API V1' });
});

// Route GET /api/v1/users/requests => Get all user requests
requestRoutes.get('/users/requests', RequestController.getAllRequests);


export default requestRoutes;
