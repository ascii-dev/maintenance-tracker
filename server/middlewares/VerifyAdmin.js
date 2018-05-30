import pool from '../config/connect';

const VerifyAdmin = (req, res, next) => {
  pool.query(`SELECT * FROM users WHERE id = '${req.userId}'`, (err, result) => {
    if (err) {
      return res.status(500).send('User can not be retrieved due to server error');
    }
    if (result.rowCount === 0) {
      return res.status(404).send('A user with the user id could not be found');
    }

    if (result.rows[0].is_admin === 0) {
      return res.status(401).send('User is not authorized to access the endpoint');
    }
    next();
    return null;
  });
  return null;
};

export default VerifyAdmin;
