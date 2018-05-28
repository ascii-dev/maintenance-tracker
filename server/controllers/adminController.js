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
        return res.status(404).send('No request found');
      }
      return res.status(200).json({
        allRequests: result.rows,
        message: 'All requests',
      });
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
        return res.status(404).send('The request does not exist');
      }
      pool.query(`SELECT * FROM users WHERE id = ${result.rows[0].user_id}`, (err, user) => {
        if (err) {
          return res.status(404).send('The user does not exist');
        }
        return res.status(200).json({
          title: result.rows[0].title,
          description: result.rows[0].description,
          type: result.rows[0].type,
          status: result.rows[0].status_id,
          created_at: result.rows[0].created_at,
          user: {
            name: user.rows[0].name,
            email: user.rows[0].email,
          },
        });
      });
      return null;
    });
  }
}

export default AdminController;
