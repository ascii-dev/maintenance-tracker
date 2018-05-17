import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('Requests', () => {
  describe('/GET api/v1/users/requests', () => {
    // Test GET all requests
    it('should get all user requests', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    // Test GET single request (return 200)
    it('should get user request with id 1', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/users/requests/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    // Test GET single request (return 404)
    it('should not get user request because id does not exist', (done) => {
      const id = 3;
      chai.request(app)
        .get(`/api/v1/users/requests/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').to.equals('Request not found!');
          done();
        });
    });
  });

  describe('/POST api/v1/users/requests', () => {
    // Test create new request (return 201)
    it('should create a new request if required fields entered', (done) => {
      const data = {
        id: 3,
        title: 'Faulty play station',
        type: 2,
        description: 'My play station 4 does not boot any more',
        status: 1,
      };
      chai.request(app)
        .post('/api/v1/users/requests/')
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').to.equals('Request created successfully!');
          done();
        });
    });

    // Test create new request (return 400)
    it('should not create a new request if required fields are empty', (done) => {
      const data = {
        id: 3,
        title: '',
        type: 2,
        description: '',
        status: 1,
      };
      chai.request(app)
        .post('/api/v1/users/requests/')
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').to.equals('Kindly fill in all required fields!');
          done();
        });
    });
  });
});
