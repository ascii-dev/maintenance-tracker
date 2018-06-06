import { Router } from 'express';

const frontendRoutes = Router();
const root = 'frontend/views';

frontendRoutes.get('/', (req, res) => { res.sendFile('index.html', { root }); });
frontendRoutes.get('/signup', (req, res) => { res.sendFile('signup.html', { root }); });
frontendRoutes.get('/dashboard', (req, res) => { res.sendFile('dashboard.html', { root }); });

export default frontendRoutes;
