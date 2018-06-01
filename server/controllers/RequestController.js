import pool from '../config/connect';
import requestHelper from '../helpers/requestHelper';

class RequestController {
  /**
   * Get all requests belonging to a user
   * @param {string} token - Takes in a token string
   * @return an object containing the requests if successful
   */
  static getAllRequests(req, res) {
    pool.query(`SELECT * FROM requests WHERE user_id = '${req.userId}' ORDER BY id ASC`, (err, result) => {
      if (err) {
        return res.status(500).send('An error occured while processing this request');
      }
      return res.status(200).json({
        requests: result.rows,
        message: 'All requests by user',
      });
    });
  }

  /**
   * Get a single request a user has made
   * @param {string} token - Takes in a token string
   * @param {number} id - Takes in a request id
   * @return an object containing the request if successful
   */
  static getSingleRequest(req, res) {
    // if (typeof req.id !== 'number') {
    //   return res.status(400).send('The id passed should be a number');
    // }
    pool.query(`SELECT * FROM requests WHERE id = '${req.params.id}'`, (err, result) => {
      if (err) {
        return res.status(500).send('An error occured while processing this request');
      }
      if (result.rowCount === 0) {
        return res.status(404).send('The user could not be found');
      }
      return res.status(200).json({
        requests: result.rows,
        message: 'Single request',
      });
    });
    return null;
  }

  /**
   * Create a request
   * @param {string} token - Takes in a token string
   * @param {string} title - Title of the request to be created
   * @param {string} description - A detailed description of the request to be created
   * @param {number} type - The id of the type of request to be created
   * @return an object containing the request that was just created if successful
   */
  static createRequest(req, res) {
    const error = requestHelper(req);
    if (error !== undefined) {
      return res.status(403).send(error);
    }
    pool.query(`INSERT INTO requests (title, type, description, user_id) values ('${req.body.title}', '${req.body.type}', '${req.body.description}', ${req.userId}) RETURNING *`, (err, result) => {
      if (err) {
        return res.status(500).send('An error occured while processing this request');
      }
      if (result.rowCount === 0) {
        return res.status(404).send('The user could not be found');
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

  /**
   * Update a request
   * @param {number} id - The id of the request to be modified
   * @param {string} token - Takes in a token string
   * @param {string} title - Title of the request to be modified
   * @param {string} description - A detailed description of the request to be modified
   * @param {number} type - The id of the type of request to be modified
   * @return an object containing the request that was just modified if successful
   */
  static updateRequest(req, res) {
    const error = requestHelper(req);
    if (error !== undefined) {
      return res.status(403).send(error);
    }
    pool.query(`SELECT * FROM requests WHERE id = '${req.params.id}'`, (queryError, result) => {
      if (queryError) {
        return res.status(500).send('An error occured while processing this request');
      }
      if (result.rowCount === 0) {
        return res.status(404).send('The user could not be found');
      }
      if (req.userId === result.rows[0].user_id) {
        pool.query(`UPDATE requests SET title = '${req.body.title}', description = '${req.body.description}', type = ${req.body.type} WHERE id = ${req.params.id} RETURNING *`, (err, response) => {
          if (err) {
            return res.status(500).send('An error occured while processing this request');
          }
          return res.status(200).json({
            title: response.rows[0].title,
            type: response.rows[0].type,
            description: response.rows[0].description,
            creator: response.rows[0].user_id,
            message: 'Request updated successfully!',
          });
        });
      } else {
        return res.status(401).send('You are not authorized to modify the request');
      }
      return null;
    });
    return null;
  }
}

export default RequestController;
