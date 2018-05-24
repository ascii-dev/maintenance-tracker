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
});
