import { Router } from 'express';

const indexRoutes = Router();

indexRoutes.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Maintenance Tracker API' });
});

export default indexRoutes;
