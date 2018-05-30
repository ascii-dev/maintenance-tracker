import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';

chai.use(chaiHttp);
chai.should();

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI3NjI2MzMwfQ.4fF3TRrz3CkmgMy0rQBIkOXdvxc4S1iWh8XfRlZCbVE';

describe('Admin Requests', () => {
  describe('GET /requests', () => {
    it('should get all requests for the admin', (done) => {
      chai.request(app)
        .get('/api/v1/requests/')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('GET requests/:id', () => {
    // Test GET single request (return 200)
    it('should get the request whose id is 1', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/requests/${id}`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    // Test GET single request (return 404)
    it('should not get request when the id supplied does not exist', (done) => {
      const id = 0;
      chai.request(app)
        .get(`/api/v1/requests/${id}`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('GET requests/users/:id', () => {
    // Test GET single request (return 200)
    it('should get the user whose id is 1', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/requests/users/${id}`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    // Test GET single request (return 404)
    it('should not get user when the id supplied does not exist', (done) => {
      const id = 100000;
      chai.request(app)
        .get(`/api/v1/requests/users/${id}`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe('PUT requests/:id/approve', () => {
    // Test PUT approve request (return 200)
    it('should approve the request whose id is 1', (done) => {
      const id = 1;
      chai.request(app)
        .put(`/api/v1/requests/${id}/approve`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    // Test PUT approve request (return 404)
    it('should not approve request when the id supplied does not exist', (done) => {
      const id = 100000;
      chai.request(app)
        .put(`/api/v1/requests/${id}/approve`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe('PUT requests/:id/resolve', () => {
    // Test PUT resolve request (return 200)
    it('should resolve the request whose id is 2', (done) => {
      const id = 2;
      chai.request(app)
        .put(`/api/v1/requests/${id}/resolve`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    // Test PUT resolve request (return 404)
    it('should not resolve request when the id supplied does not exist', (done) => {
      const id = 100000;
      chai.request(app)
        .put(`/api/v1/requests/${id}/resolve`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe('PUT requests/:id/disapprove', () => {
    // Test PUT approve request (return 200)
    it('should disapprove the request whose id is 1', (done) => {
      const id = 1;
      chai.request(app)
        .put(`/api/v1/requests/${id}/disapprove`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    // Test GET single request (return 404)
    it('should not disapprove request when the id supplied does not exist', (done) => {
      const id = 100000;
      chai.request(app)
        .put(`/api/v1/requests/${id}/disapprove`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
