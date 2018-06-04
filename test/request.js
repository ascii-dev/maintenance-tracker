import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';

chai.use(chaiHttp);
chai.should();

const userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTI3NjI2NDQ0fQ.FfISUHBFjNMj0Ot3OZ49mqgPOwm03e7fyPd5bLq8d0w';

describe('Requests', () => {
  describe('/GET api/v1/users/requests', () => {
    // Test GET all requests
    it('should get all user requests', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests/')
        .set('Authorization', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    // Test GET single request (return 200)
    it('should get the request when id exists', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/users/requests/${id}`)
        .set('Authorization', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    // Test GET single request (return 404)
    it('should not get user request when request id does not exist', (done) => {
      const id = 1000;
      chai.request(app)
        .get(`/api/v1/users/requests/${id}`)
        .set('Authorization', userToken)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    // Test GET single request (return 404)
    it('should not get user request when request id is not a number', (done) => {
      const id = 'name';
      chai.request(app)
        .get(`/api/v1/users/requests/${id}`)
        .set('Authorization', userToken)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/POST api/v1/users/requests', () => {
    // Test create new request (return 201)
    it('should create a new request if required fields are entered', (done) => {
      const data = {
        title: 'Faulty play station',
        type: 'repair',
        description: 'My play station 4 does not boot any more',
      };
      chai.request(app)
        .post('/api/v1/users/requests/')
        .set('Authorization', userToken)
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').to.equals('Your request has been created successfully');
          done();
        });
    });

    // Test create new request (return 400)
    it('should not create a new request if required fields are empty', (done) => {
      const data = {
        title: '',
        type: 'maintenance',
        description: '',
      };
      chai.request(app)
        .post('/api/v1/users/requests/')
        .set('Authorization', userToken)
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/PUT api/v1/users/requests/:id', () => {
    // Test update request (return 200)
    it('should update request if required fields entered', (done) => {
      const id = 1;
      const data = {
        title: 'Faulty play station',
        type: 'maintenance',
        description: 'My play station 4 does not boot any more',
      };
      chai.request(app)
        .put(`/api/v1/users/requests/${id}`)
        .set('Authorization', userToken)
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').to.equals('Request updated successfully!');
          done();
        });
    });

    // Test update request (return 400)
    it('should not update request if required fields are empty', (done) => {
      const id = 1;
      const data = {
        title: '',
        type: 'repair',
        description: '',
      };
      chai.request(app)
        .put(`/api/v1/users/requests/${id}`)
        .set('Authorization', userToken)
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // Test update request (return 404)
    it('should not update request if request id is not found', (done) => {
      const id = 0;
      const data = {
        title: 'Faulty play station',
        type: 'maintenance',
        description: 'My play station 4 does not boot any more',
      };
      chai.request(app)
        .put(`/api/v1/users/requests/${id}`)
        .set('Authorization', userToken)
        .send(data)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
