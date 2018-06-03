import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';
import pool from '../server/config/connect';

chai.use(chaiHttp);
chai.should();

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI3NjI2MzMwfQ.4fF3TRrz3CkmgMy0rQBIkOXdvxc4S1iWh8XfRlZCbVE';

before((done) => {
  pool.query('INSERT INTO users (name, email, password, is_admin) VALUES (\'Samuel Afolaranmi\', \'sammysgame.dev@gmail.com\', \'$2a$08$Ok/xN7VyRkAK1sAyzJA7v.hs7YpKQomOibEwNmclyDJe8M1tL5s66\', 1)', (err) => {
    if (err) {
      return err;
    }
    return null;
  });
  pool.query('INSERT INTO users (name, email, password, is_admin) VALUES (\'New User\', \'user@gmail.com\', \'$2a$08$Ok/xN7VyRkAK1sAyzJA7v.hs7YpKQomOibEwNmclyDJe8M1tL5s66\', 0)', (err) => {
    if (err) {
      return err;
    }
    return null;
  });
  pool.query('INSERT INTO requests (title, type, description, user_id) VALUES (\'This is title\', \'repair\', \'This is description\', 2)', (err) => {
    if (err) {
      return err;
    }
    return null;
  });
  pool.query('INSERT INTO requests (title, type, description, user_id) VALUES (\'This is title\', \'repair\', \'This is description\', 2)', (err) => {
    if (err) {
      return err;
    }
    return null;
  });
  pool.query('INSERT INTO requests (title, type, description, user_id) VALUES (\'This is title\', \'repair\', \'This is description\', 2)', (err) => {
    if (err) {
      return err;
    }
    return null;
  });
  done();
});
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

    // Test GET single request (return 200)
    it('should get the request when id exists', (done) => {
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

    // Test GET single request (return 400)
    it('should not get user request when request id is not a number', (done) => {
      const id = 'name';
      chai.request(app)
        .get(`/api/v1/requests/${id}`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('GET requests/users/:id', () => {
    // Test GET single request (return 200)
    it('should get the user when id exists', (done) => {
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
    it('should approve the request when id exists', (done) => {
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
    it('should resolve the request when id exists', (done) => {
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
    it('should disapprove the request when id exists', (done) => {
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
