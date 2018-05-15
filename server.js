const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Configure app tp user bodyParser so we can get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set our port
const port = process.env.PORT || 8080;

// Routes for our API
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to my api!' });
});

// Register the routes in app
app.use('/api/v1', router);

// Start the server
app.listen(port);
console.log('Server started on port ' + port);