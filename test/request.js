import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('Requests', () => {
  // Test GET api/v1/users/requests
  describe('/GET api/v1/users/requests', () => {
    it('it should get all user requests', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
