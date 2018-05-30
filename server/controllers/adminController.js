import pool from '../config/connect';

class AdminController {
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
}

export default AdminController;
