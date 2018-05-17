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
        title: 'Faulty play station',
        type: 2,
        description: 'My play station 4 does not boot any more',
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
        title: '',
        type: 2,
        description: '',
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

  describe('/PUT api/v1/users/requests/:id', () => {
    // Test update request (return 200)
    it('should update request if required fields entered', (done) => {
      const id = 1;
      const data = {
        title: 'Faulty play station',
        type: 2,
        description: 'My play station 4 does not boot any more',
      };
      chai.request(app)
        .put(`/api/v1/users/requests/${id}`)
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
        type: 2,
        description: '',
      };
      chai.request(app)
        .put(`/api/v1/users/requests/${id}`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').to.equals('Kindly fill in all required fields!');
          done();
        });
    });

    // Test update request (return 404)
    it('should not update request if request id not found', (done) => {
      const id = 4;
      const data = {
        title: 'Faulty play station',
        type: 2,
        description: 'My play station 4 does not boot any more',
      };
      chai.request(app)
        .put(`/api/v1/users/requests/${id}`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').to.equals('Request does not exist!');
          done();
        });
    });
  });

  describe('/DELETE api/v1/users/requests/:id', () => {
    // Test delete request (return 200)
    it('should delete request if request id is fount', (done) => {
      const id = 1;
      chai.request(app)
        .delete(`/api/v1/users/requests/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').to.equals('Request deleted successfully!');
          done();
        });
    });

    // Test update request (return 404)
    it('should not update request if request id not found', (done) => {
      const id = 4;
      chai.request(app)
        .delete(`/api/v1/users/requests/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').to.equals('Request does not exist!');
          done();
        });
    });
  });
});
