import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';

chai.use(chaiHttp);
chai.should();

describe('Authentication', () => {
  describe('Create account', () => {
    // Test user registration
    it('should register a user successfully', (done) => {
      const user = {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
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
        email: 'johndoe@gmail.com',
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
        email: '12rfcas@gmail.com',
        password: 'johndoe',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
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
        .post('/api/v1/auth/login')
        .send(details)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
