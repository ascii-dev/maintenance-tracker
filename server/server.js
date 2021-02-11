import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import cors from 'cors';

import adminRoutes from './routes/admin';
import requestRoutes from './routes/request';
import authRoutes from './routes/auth';
import frontendRoutes from './routes/frontend';

const swaggerDocument = require('../swagger.json');

const corOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();

// Set our port
const port = process.env.PORT || 3000;

// Configure app to use bodyParser so we can get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corOptions));

// Static files
app.use('/', express.static(path.resolve(__dirname, '../frontend/')));

// Register the routes in app
app.use('/api/v1/users', requestRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/requests', adminRoutes);
app.use('/', frontendRoutes);
app.use('/docs', swagger.serve, swagger.setup(swaggerDocument));


// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


export default app; // For testing
