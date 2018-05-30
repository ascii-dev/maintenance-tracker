import pg from 'pg';
import data from '../dummyData/index';
import config from '../config/config';

const { requests } = data;
const pool = new pg.Pool(config.database);
class RequestController {
  // Get all requests fom data
  static getAllRequests(req, res) {
    pool.connect((err, client, done) => {
      if (err) {
        done();
        return res.status(500).json({ success: false, data: err });
      }
      client.query('SELECT * FROM requests ORDER BY id ASC', (error, result) => {
        done();
        if (error) {
          res.status(400).send(error);
        }
        return res.status(200).json({
          allRequests: result.rows,
          message: 'All requests by user',
        });
      });
      return null;
    });
  }

  // Get single request from data
  static getSingleRequest(req, res) {
    const findRequest = requests.find(request => request.id === parseInt(req.params.id, 10));
    if (findRequest) {
      return res.status(200).json({
        request: findRequest,
        message: 'Single request by user',
      });
    }
    return res.status(404).json({
      message: 'Request not found!',
    });
  }

  // Create new request
  static createRequest(req, res) {
    const id = requests.length + 1;
    if (req.body.title === '' || req.body.description === '' || req.body.type === '') {
      return res.status(400).json({
        message: 'Kindly fill in all required fields!',
      });
    }
    requests.push({
      id,
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      status: 1,
    });
    return res.status(201).json({
      message: 'Request created successfully!',
    });
  }

  // Update a request
  static updateRequest(req, res) {
    const findRequest = requests.find(request => request.id === parseInt(req.params.id, 10));
    if (findRequest) {
      if (req.body.title === '' || req.body.description === '' || req.body.type === '' || req.body.status === '') {
        return res.status(400).json({
          message: 'Kindly fill in all required fields!',
        });
      }
      findRequest.title = req.body.title;
      findRequest.type = req.body.type;
      findRequest.description = req.body.description;
      findRequest.status = req.body.status;

      return res.status(200).json({
        message: 'Request updated successfully!',
      });
    }
    return res.status(404).json({
      message: 'Request does not exist!',
    });
  }

  // Delete a request
  static deleteRequest(req, res) {
    const findRequest = requests.find(request => request.id === parseInt(req.params.id, 10));
    if (findRequest) {
      requests.splice(findRequest.id - 1, 1);
      return res.status(200).json({
        message: 'Request deleted successfully!',
      });
    }
    return res.status(404).json({
      message: 'Request does not exist!',
    });
  }
}

export default RequestController;
