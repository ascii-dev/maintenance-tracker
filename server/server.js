import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin';
import requestRoutes from './routes/request';
import authRoutes from './routes/auth';

const app = express();

// Set our port
const port = process.env.PORT || 8080;

// Configure app to use bodyParser so we can get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes for our API
// indexRoutes(app);
// requestRoutes(app);

// Register the routes in app
app.use('/', adminRoutes);
app.use('/api/v1', requestRoutes);
app.use('/auth', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


export default app; // For testing
