import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Set our port
const port = process.env.PORT || 8080;

// Configure app to use bodyParser so we can get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes for our API
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to my api!' });
});

// Register the routes in app
app.use('/api/v1', router);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
