import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/config';
import pool from '../config/connect';
import authHelper from '../helpers/authHelper';


class AuthController {
  /**
   * Create a user account
   * @param {string} name - The name of the user account to be created
   * @param {string} email - The email of the user account to be created
   * @param {string} password - The password of the user account to be created
   * @return an object containing the user account details and an authentication token if successful
   */
  static signup(req, res) {
    const error = authHelper('signup', req);
    if (error !== undefined) {
      return res.status(400).json({ message: error });
    }
    const hashedPassword = bcrypt.hashSync(req.body.password.trim(), 8);
    pool.query(`INSERT INTO users (name, email, password) values ('${req.body.name.trim()}', '${req.body.email.trim()}', '${hashedPassword}') RETURNING *`, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'An error occured while processing this request' });
      }
      // Create a token
      const token = jwt.sign({ id: result.rows[0].id }, config.jwtSecret, { expiresIn: 86400 });
      return res.status(201).json({
        token,
        name: result.rows[0].name,
        email: result.rows[0].email,
        is_admin: result.rows[0].is_admin,
        message: 'User account created successfully',
      });
    });
    return null;
  }

  /**
   * Login to a user account
   * @param {string} email - The email of the user account
   * @param {string} password - The password of the user account
   * @return an object containing the request and an authentication token if successful
   */
  static login(req, res) {
    const error = authHelper('login', req);
    if (error !== undefined) {
      return res.status(400).send(error);
    }
    pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'An error occured while processing this request' });
      }
      if (result.rowCount === 0) {
        return res.status(401).json({ message: 'Email or password incorrect' });
      }
      const validPassword = bcrypt.compareSync(req.body.password.trim(), result.rows[0].password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Email or password incorrect' });
      }

      const token = jwt.sign({ id: result.rows[0].id }, config.jwtSecret, { expiresIn: 86400 });

      return res.status(200).json({
        token,
        name: result.rows[0].name,
        email: result.rows[0].email,
        is_admin: result.rows[0].is_admin,
        message: 'User has successfully logged in',
      });
    });
    return null;
  }
}

export default AuthController;
