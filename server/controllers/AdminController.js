import pool from '../config/connect';

class AdminController {
  /**
   * (Admin) Get all requests made by users
   * @param {string} token - Takes in a token string
   * @return an object containing the requests if successful
   */
  static getAllRequests(req, res) {
    pool.query('SELECT * FROM requests')
      .then((result) => {
        res.status(200).json({
          requests: result.rows,
          message: 'All requests',
        });
      })
      .catch(() => { res.status(500).json({ message: 'An error occured while processing this request' }); });
  }

  /**
   * (Admin) Get a single request a user has made
   * @param {string} token - Takes in a token string
   * @param {number} id - Takes in a request id
   * @return an object containing the request if successful
   */
  static getSingleRequest(req, res) {
    pool.query(`SELECT * FROM requests WHERE id = ${req.params.id}`)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'The request could not be found' });
        }
        pool.query(`SELECT * FROM users WHERE id = ${result.rows[0].user_id}`)
          .then((user) => {
            if (user.rowCount === 0) {
              return res.status(404).json({ message: 'The request could not be found' });
            }
            return res.status(200).json({
              title: result.rows[0].title,
              description: result.rows[0].description,
              type: result.rows[0].type,
              status: result.rows[0].status_id,
              user_name: user.rows[0].name,
              user_email: user.rows[0].email,
              created_at: result.rows[0].created_at,
            });
          })
          .catch(() => { res.status(400).json({ message: 'The user ID must be a number' }); });
        return null;
      })
      .catch(() => { res.status(400).json({ message: 'The request ID must be a number' }); });
  }

  /**
   * (Admin) Get user details
   * @param {string} token - Takes in a token string
   * @param {number} id - Takes in a user id
   * @return an object containing the request if successful
   */
  static getUserDetails(req, res) {
    pool.query(`SELECT * FROM users WHERE id = ${req.params.id}`)
      .then((user) => {
        if (user.rowCount === 0) {
          return res.status(404).json({ message: 'The request could not be found' });
        }
        return res.status(200).json({
          name: user.rows[0].name,
          email: user.rows[0].email,
        });
      })
      .catch(() => { res.status(400).json({ message: 'The user ID must be a number' }); });
  }

  /**
   * (Admin) Approve a request a user has made
   * @param {string} token - Takes in a token string
   * @param {number} id - Takes in a request id
   * @return a response 200 if the process was successful (statusId 2 = approved)
   */
  static approveRequest(req, res) {
    pool.query(`UPDATE requests SET status_id = 2 WHERE id = ${req.params.id}`)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'The request could not be found' });
        }
        return res.status(200).json({ message: 'Request updated successfully' });
      })
      .catch(() => { res.status(400).json({ message: 'The request ID must be a number' }); });
  }

  /**
   * (Admin) Disapprove a request a user has made
   * @param {string} token - Takes in a token string
   * @param {number} id - Takes in a request id
   * @return a response 200 if the process was successful (statusId 3 = disapproved)
   */
  static disapproveRequest(req, res) {
    pool.query(`UPDATE requests SET status_id = 3 WHERE id = ${req.params.id}`)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'The request could not be found' });
        }
        return res.status(200).json({ message: 'Request updated successfully' });
      })
      .catch(() => { res.status(400).json({ message: 'The request ID must be a number' }); });
  }

  /**
   * (Admin) Resolve a request a user has made
   * @param {string} token - Takes in a token string
   * @param {number} id - Takes in a request id
   * @return a response 200 if the process was successful (statusId 4 = resolved)
   */
  static resolveRequest(req, res) {
    pool.query(`UPDATE requests SET status_id = 4 WHERE id = ${req.params.id}`)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'The request could not be found' });
        }
        return res.status(200).json({ message: 'Request updated successfully' });
      })
      .catch(() => { res.status(400).json({ message: 'The request ID must be a number' }); });
  }
}

export default AdminController;
