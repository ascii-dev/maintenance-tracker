import pool from '../config/connect';

const VerifyAdmin = (req, res, next) => {
  pool.query(`SELECT * FROM users WHERE id = '${req.userId}'`)
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'User could not be found' });
      }

      if (result.rows[0].is_admin === 0) {
        return res.status(403).json({ message: 'User is not authorized to access the endpoint' });
      }
      next();
      return null;
    })
    .catch(() => { res.status(500).json({ message: 'User can not be retrieved due to server error' }); });
};

export default VerifyAdmin;
