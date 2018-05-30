import indexRoutes from './config';

indexRoutes.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Maintenance Tracker API' });
});

export default indexRoutes;
