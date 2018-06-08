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
    const email = req.body.email.trim();
    const name = req.body.name.trim();
    const hashedPassword = bcrypt.hashSync(req.body.password.trim(), 8);
    pool.query(`SELECT email FROM users WHERE email = '${email}'`)
      .then((response) => {
        if (response.rowCount > 0) {
          return res.status(403).json({ message: 'Account already exists' });
        }
        pool.query(`INSERT INTO users (name, email, password) values ('${name}', '${email}', '${hashedPassword}') RETURNING *`)
          .then((result) => {
            const token = jwt.sign(
              { id: result.rows[0].id },
              config.jwtSecret,
              { expiresIn: 86400 },
            );
            return res.status(201).json({
              token,
              name: result.rows[0].name,
              email: result.rows[0].email,
              is_admin: result.rows[0].is_admin,
              message: 'User account created successfully',
            });
          })
          .catch(() => { res.status(500).json({ message: 'An error occured while processing this request inner' }); });
        return null;
      })
      .catch(() => { res.status(500).json({ message: 'An error occured while processing this request outer' }); });
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
    pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`)
      .then((result) => {
        const validPassword = bcrypt.compareSync(req.body.password.trim(), result.rows[0].password);
        if (result.rowCount === 0 || !validPassword) {
          return res.status(401).json({ message: 'Email or password incorrect' });
        }

        const token = jwt.sign(
          { id: result.rows[0].id },
          config.jwtSecret,
          { expiresIn: 86400 },
        );

        return res.status(200).json({
          token,
          name: result.rows[0].name,
          email: result.rows[0].email,
          is_admin: result.rows[0].is_admin,
          message: 'User has successfully logged in',
        });
      })
      .catch(() => { res.status(500).json({ message: 'An error occured while processing this request' }); });
    return null;
  }
}

export default AuthController;
