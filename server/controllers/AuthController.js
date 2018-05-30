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
      return res.status(400).send(error);
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    pool.query(`INSERT INTO users (name, email, password) values ('${req.body.name}', '${req.body.email}', '${hashedPassword}') RETURNING *`, (err, result) => {
      if (err) {
        return res.status(500).send('An error occured while processing this request');
      }
      // Create a token
      const token = jwt.sign({ id: result.rows[0].id }, config.jwtSecret, { expiresIn: 86400 });
      return res.status(201).header({
        token,
      }).json({
        name: result.rows[0].name,
        email: result.rows[0].email,
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
      return error;
    }
    pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, (err, result) => {
      if (err) {
        return res.status(500).send('An error occured while processing this request');
      }
      if (result.rowCount === 0) {
        return res.status(404).send('The user could not be found');
      }
      const validPassword = bcrypt.compareSync(req.body.password, result.rows[0].password);
      if (!validPassword) {
        return res.status(401).send('An invalid password was entered');
      }

      const token = jwt.sign({ id: result.rows[0].id }, config.jwtSecret, { expiresIn: 86400 });

      return res.status(200).header({
        token,
      }).json({
        name: result.rows[0].name,
        email: result.rows[0].email,
        message: 'User has successfully logged in',
      });
    });
    return null;
  }
}

export default AuthController;
