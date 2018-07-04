import { Router } from 'express';
import RequestController from '../controllers/RequestController';
import VerifyToken from '../middlewares/VerifyToken';

const requestRoutes = Router();

requestRoutes.use(VerifyToken);

requestRoutes.get('/requests', RequestController.getAllRequests);
requestRoutes.post('/requests', RequestController.createRequest);
requestRoutes.get('/requests/:id', RequestController.getSingleRequest);
requestRoutes.put('/requests/:id', RequestController.updateRequest);
requestRoutes.delete('/requests/:id', RequestController.deleteRequest);

export default requestRoutes;
