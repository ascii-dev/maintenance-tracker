import pool from '../config/connect';
import requestHelper from '../helpers/requestHelper';

class RequestController {
  /**
   * Get all requests belonging to a user
   * @param {string} token - Takes in a token string
   * @return an object containing the requests if successful
   */
  static getAllRequests(req, res) {
    pool.query(`SELECT * FROM requests WHERE user_id = '${req.userId}' ORDER BY id ASC`)
      .then((result) => {
        res.status(200).json({
          requests: result.rows,
          message: 'All requests by user',
        });
      })
      .catch(() => { res.status(500).json({ message: 'An error occured while processing this request' }); });
  }

  /**
   * Get a single request a user has made
   * @param {string} token - Takes in a token string
   * @param {number} id - Takes in a request id
   * @return an object containing the request if successful
   */
  static getSingleRequest(req, res) {
    pool.query(`SELECT * FROM requests WHERE id = '${req.params.id}'`)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'The request could not be found' });
        }
        pool.query(`SELECT * FROM users WHERE id = '${result.rows[0].user_id}'`)
          .then((response) => {
            if (response.rows[0].id !== req.userId) {
              return res.status(403).json({ message: 'You are not allowed to view another user\'s request' });
            }
            return res.status(200).json({
              id: result.rows[0].id,
              title: result.rows[0].title,
              type: result.rows[0].type,
              description: result.rows[0].description,
              created_at: result.rows[0].created_at,
              status: result.rows[0].status_id,
              message: 'Single request',
            });
          });
        return null;
      })
      .catch(() => { res.status(400).json({ message: 'The request ID must be a number' }); });
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
      return res.status(400).json({ message: error });
    }
    pool.query(`INSERT INTO requests (title, type, description, user_id) values ('${req.body.title}', '${req.body.type}', '${req.body.description}', ${req.userId}) RETURNING *`)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'The user could not be found' });
        }
        return res.status(201).json({
          id: result.rows[0].id,
          title: result.rows[0].title,
          type: result.rows[0].type,
          description: result.rows[0].description,
          creator: result.rows[0].user_id,
          message: 'Your request has been created successfully',
        });
      })
      .catch(() => {
        res.status(500).json({ message: 'An error occured while processing this request' });
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
      return res.status(400).json({ message: error });
    }
    pool.query(`SELECT * FROM requests WHERE id = '${req.params.id}'`)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'The request could not be found' });
        }
        if (req.userId !== result.rows[0].user_id) {
          return res.status(401).send('You are not authorized to modify the request');
        }
        pool.query(`UPDATE requests SET title = '${req.body.title}', description = '${req.body.description}', type = '${req.body.type}' WHERE id = ${req.params.id} RETURNING *`)
          .then((response) => {
            res.status(200).json({
              id: result.rows[0].id,
              title: response.rows[0].title,
              type: response.rows[0].type,
              description: response.rows[0].description,
              creator: response.rows[0].user_id,
              message: 'Request updated successfully!',
            });
          })
          .catch(() => { res.status(500).json({ message: 'An error occured while processing this request' }); });
        return null;
      })
      .catch(() => { res.status(400).json({ message: 'The request ID must be a number' }); });
    return null;
  }

  /**
   * Delete a request
   * @param {number} id - The id of the request to be deleted
   * @return a success message if the request was deleted succesfully
   */
  static deleteRequest(req, res) {
    pool.query(`SELECT * FROM requests WHERE id = '${req.params.id}'`)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).send({ message: 'The request could not be found' });
        }
        if (req.userId !== result.rows[0].user_id) {
          return res.status(401).send('You are not authorized to modify the request');
        }
        pool.query(`DELETE FROM requests WHERE id = ${req.params.id}`)
          .then(() => { res.status(200).json({ message: 'The request has been deleted successfully!' }); })
          .catch(() => { res.status(500).send({ message: 'An error occured while processing this request' }); });
        return null;
      })
      .catch(() => { res.status(400).json({ message: 'The request ID must be a number' }); });
  }
}

export default RequestController;
