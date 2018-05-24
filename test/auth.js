import chai from 'chai';
import chaiHttp from 'chai-http';
import pg from 'pg';

import app from '../server/server';
import config from './config/config';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

describe('Authentication', () => {
  before((done) => {
    const pool = new pg.Pool(config.database);
    done();
    return pool;
  });
  describe('Create account', () => {
    // Test user registration
    it('should register a user successfully', (done) => {
      const user = {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'johndoe',
      };
      chai.request(app)
        .post('/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
  describe('Login to account', () => {
    it('should log a user in successfully', (done) => {
      const details = {
        email: 'johndoe@gmail.com',
        password: 'johndoe',
      };
      chai.request(app)
        .post('/auth/login')
        .send(details)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should not log a user in successfully when email is incorrect', (done) => {
      const details = {
        email: '12rfcas@gmail.com',
        password: 'johndoe',
      };
      chai.request(app)
        .post('/auth/login')
        .send(details)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('should not log a user in successfully when password is incorrect', (done) => {
      const details = {
        email: 'johndoe@gmail.com',
        password: '12rfcas',
      };
      chai.request(app)
        .post('/auth/login')
        .send(details)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
