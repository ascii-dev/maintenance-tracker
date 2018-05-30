import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/config';
import pool from '../config/connect';


class AuthController {
  // User create account
  static signup(req, res) {
    if (req.body.name === '') {
      return res.status(400).send('Name can not be blank');
    }
    if (req.body.email === '') {
      return res.status(400).send('Email can not be blank');
    }
    if (req.body.password === '') {
      return res.status(400).send('Password can not be blank');
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    pool.query(`INSERT INTO users (name, email, password) values ('${req.body.name}', '${req.body.email}', '${hashedPassword}') RETURNING *`, (error, result) => {
      if (error) {
        return res.status(500).send('There was a problem registering the user');
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
}

export default AuthController;
