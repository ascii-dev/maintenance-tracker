import chai from 'chai';
import chaiHttp from 'chai-http';
import pg from 'pg';

import app from '../server/server';
import config from './config/config';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

describe('Admin Requests', () => {
  before((done) => {
    const pool = new pg.Pool(config.database);
    done();
    return pool;
  });
  describe('GET /requests', () => {
    it('should get all requests for the admin', (done) => {
      chai.request(app)
        .get('/requests/')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTI3MjUyMDAzLCJleHAiOjE1MjczMzg0MDN9.lboQNm87PGgTC3dohvDoCr1S-_7p5rd1bFS9H0xNC3A')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
