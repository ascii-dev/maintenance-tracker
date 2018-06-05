import { Router } from 'express';
// import VerifyToken from '../middlewares/VerifyToken';
// import VerifyAdmin from '../middlewares/VerifyAdmin';

const frontendRoutes = Router();
const root = 'frontend/views';

frontendRoutes.get('/', (req, res) => { res.sendFile('index.html', { root }); });

export default frontendRoutes;
