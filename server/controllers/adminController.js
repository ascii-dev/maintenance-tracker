import pool from '../config/connect';

class AdminController {
  /**
   * (Admin) Get all requests made by users
   * @param {string} token - Takes in a token string
   * @return an object containing the requests if successful
   */
  static getAllRequests(req, res) {
    pool.query('SELECT * FROM requests', (error, result) => {
      if (error) {
        return res.status(500).send('An error occured when approving the request');
      }
      if (result.rowCount > 0) {
        return res.status(200).json({
          allRequests: result.rows,
          message: 'All requests',
        });
      }
      return res.status(404).send('The request does not exist');
    });
  }

  /**
   * (Admin) Get a single request a user has made
   * @param {string} token - Takes in a token string
   * @param {number} id - Takes in a request id
   * @return an object containing the request if successful
   */
  static getSingleRequest(req, res) {
    pool.query(`SELECT * FROM requests WHERE id = ${req.params.id}`, (error, result) => {
      if (error) {
        return res.status(500).send('An error occured when approving the request');
      }
      if (result.rowCount > 0) {
        return res.status(200).json({
          title: result.rows[0].title,
          description: result.rows[0].description,
          type: result.rows[0].type,
          status: result.rows[0].status_id,
          user: result.rows[0].user_id,
          created_at: result.rows[0].created_at,
        });
      }
      return res.status(404).send('The request does not exist');
    });
  }

  /**
   * (Admin) Get user details
   * @param {string} token - Takes in a token string
   * @param {number} id - Takes in a user id
   * @return an object containing the request if successful
   */
  static getUserDetails(req, res) {
    pool.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, user) => {
      if (err) {
        return res.status(500).send('An error occured when approving the request');
      }
      if (user.rowCount > 0) {
        return res.status(200).json({
          name: user.rows[0].name,
          email: user.rows[0].email,
        });
      }
      return res.status(404).send('The user does not exist');
    });
  }

  /**
   * (Admin) Approve a request a user has made
   * @param {string} token - Takes in a token string
   * @param {number} id - Takes in a request id
   * @return a response 200 if the process was successful (statusId 2 = approved)
   */
  static approveRequest(req, res) {
    pool.query(`UPDATE requests SET status_id = 2 WHERE id = ${req.params.id}`, (error, result) => {
      if (error) {
        return res.status(500).send('An error occured when approving the request');
      }
      if (result.rowCount > 0) {
        return res.status(200).send('Request updated successfully');
      }
      return res.status(404).send('The specified request does not exist');
    });
  }

  /**
   * (Admin) Disapprove a request a user has made
   * @param {string} token - Takes in a token string
   * @param {number} id - Takes in a request id
   * @return a response 200 if the process was successful (statusId 3 = disapproved)
   */
  static disapproveRequest(req, res) {
    pool.query(`UPDATE requests SET status_id = 3 WHERE id = ${req.params.id} RETURNING *`, (error, result) => {
      if (error) {
        return res.status(500).send('An error occured when disapproving the request');
      }
      if (result.rowCount > 0) {
        return res.status(200).send('Request updated successfully');
      }
      return res.status(404).send('The specified request does not exist');
    });
  }

  /**
   * (Admin) Resolve a request a user has made
   * @param {string} token - Takes in a token string
   * @param {number} id - Takes in a request id
   * @return a response 200 if the process was successful (statusId 4 = resolved)
   */
  static resolveRequest(req, res) {
    pool.query(`UPDATE requests SET status_id = 4 WHERE id = ${req.params.id}`, (error, result) => {
      if (error) {
        return res.status(500).send('An error occured when disapproving the request');
      }
      if (result.rowCount > 0) {
        return res.status(200).send('Request updated successfully');
      }
      return res.status(404).send('The specified request does not exist');
    });
  }
}

export default AdminController;
