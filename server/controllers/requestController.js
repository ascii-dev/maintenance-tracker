import data from '../dummyData/index';
import pool from '../config/connect';

const { requests } = data;
class RequestController {
  // Get all requests fom data
  static getAllRequests(req, res) {
    pool.query(`SELECT * FROM requests WHERE user_id = '${req.userId}' ORDER BY id ASC`, (error, result) => {
      if (error) {
        return res.status(404).send('Requests for this user does not exist');
      }
      return res.status(200).json({
        allRequests: result.rows,
        message: 'All requests by user',
      });
    });
  }

  // Get single user request
  static getSingleRequest(req, res) {
    pool.query(`SELECT * FROM requests WHERE id = '${req.params.id}'`, (error, result) => {
      if (error) {
        return res.status(500).send('The was an error when fetching the request');
      }
      if (result.rowCount === 0) {
        return res.status(404).send('The request could not be found');
      }
      return res.status(200).json({
        requests: result.rows,
        message: 'Single request',
      });
    });
  }

  // Create new request
  static createRequest(req, res) {
    if (req.body.title === '') {
      return res.status(403).send('Request title can not be empty');
    }
    if (req.body.description === '') {
      return res.status(403).send('Request description can not be empty');
    }
    if (req.body.type === '') {
      return res.status(403).send('Request type can not be empty');
    }
    pool.query(`INSERT INTO requests (title, type, description, user_id) values ('${req.body.title}', '${req.body.type}', '${req.body.description}', ${req.userId}) RETURNING *`, (err, result) => {
      if (err) {
        return res.status(500).send('There was a problem creating the request');
      }
      return res.status(201).json({
        title: result.rows[0].title,
        type: result.rows[0].type,
        description: result.rows[0].description,
        creator: result.rows[0].user_id,
        message: 'Your request has been created successfully',
      });
    });
    return null;
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
