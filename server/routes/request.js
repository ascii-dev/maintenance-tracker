import { Router } from 'express';
import RequestController from '../controllers/RequestController';
import VerifyToken from '../middlewares/VerifyToken';

const requestRoutes = Router();

requestRoutes.get('/requests', VerifyToken, RequestController.getAllRequests);
requestRoutes.post('/requests', VerifyToken, RequestController.createRequest);
requestRoutes.get('/requests/:id', VerifyToken, RequestController.getSingleRequest);
requestRoutes.put('/requests/:id', VerifyToken, RequestController.updateRequest);
requestRoutes.delete('/requests/:id', VerifyToken, RequestController.deleteRequest);

export default requestRoutes;
