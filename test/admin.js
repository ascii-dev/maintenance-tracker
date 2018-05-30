// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import pg from 'pg';

// import app from '../server/server';
// import config from './config/config';

// process.env.NODE_ENV = 'test';

// chai.use(chaiHttp);
// chai.should();

// describe('Admin Requests', () => {
//   before((done) => {
//     const pool = new pg.Pool(config.database);
//     done();
//     return pool;
//   });
//   describe('GET /requests', () => {
//     it('should get all requests for the admin', (done) => {
//       chai.request(app)
//         .get('/requests/')
//         .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTI3MjUzMzYxLCJleHAiOjE1MjczMzk3NjF9.XoaWy1ErF8Ibpcs-zFhHe9AjyiF5yMq0F3UfqfXBbWM')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           done();
//         });
//     });
//   });
//   describe('GET api/v1/requests/:id', () => {
//     // Test GET single request (return 200)
//     it('should get the request whose id is 1', (done) => {
//       const id = 1;
//       chai.request(app)
//         .get(`/api/v1/users/requests/${id}`)
//         .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTI3MjUzMzYxLCJleHAiOjE1MjczMzk3NjF9.XoaWy1ErF8Ibpcs-zFhHe9AjyiF5yMq0F3UfqfXBbWM')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           done();
//         });
//     });

//     // Test GET single request (return 404)
//     it('should not get request when the id supplied does not exist', (done) => {
//       const id = 1000;
//       chai.request(app)
//         .get(`/api/v1/users/requests/${id}`)
//         .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTI3MjUzMzYxLCJleHAiOjE1MjczMzk3NjF9.XoaWy1ErF8Ibpcs-zFhHe9AjyiF5yMq0F3UfqfXBbWM')
//         .end((err, res) => {
//           res.should.have.status(404);
//           done();
//         });
//     });
//   });
// });
