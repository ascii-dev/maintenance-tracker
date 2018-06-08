import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';

chai.use(chaiHttp);
chai.should();

const email = Math.random().toString(36).substring(2, 15);

describe('Authentication', () => {
  describe('Create account', () => {
    // Test user registration
    it('should register a user successfully', (done) => {
      const user = {
        name: 'John Doe',
        email: `${email}@gmail.com`,
        password: 'johndoe',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
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
        email: `${email}@gmail.com`,
        password: 'johndoe',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(details)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should not log a user in successfully when email is incorrect', (done) => {
      const details = {
        email: '123samuel@gmail.com',
        password: 'johndoe',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(details)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('should not log a user in successfully when password is incorrect', (done) => {
      const details = {
        email: `${email}@gmail.com`,
        password: '12rfcas',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(details)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
