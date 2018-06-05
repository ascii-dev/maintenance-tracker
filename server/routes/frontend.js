import { Router } from 'express';

const frontendRoutes = Router();
const root = 'frontend/views';

frontendRoutes.get('/', (req, res) => { res.sendFile('index.html', { root }); });

export default frontendRoutes;
