import chai from 'chai';
import supertest from 'supertest';
import app from '../app';

const { expect } = chai;
const request = supertest(app);
let myToken;
const wrongToken = 'hghgjhgjgjgjggg';

describe('All test cases for WarFarer Application', () => {
  describe('test case for loading application home page', () => {
    it('Should load application home page', (done) => {
      request.get('/')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body).deep.equal({
            message: "Welcome to WayFarer Transportation App"
          });
          if (err) done(err);
          done();
        });
    });
    describe('All test cases for application invalid routes', () => {
      it('Should fail to get route', (done) => {
        request.get('/api/v1')
          .set('Content-Type', 'application/json')
          .expect(404)
          .end((err, res) => {
            expect(res.body).deep.equal({
              status: 'Failed',
              message: 'Page not found'
            });
            if (err) done(err);
            done();
          });
      });
    }); 
    describe('All test cases for application invalid routes', () => {
      it('Should fail to get route', (done) => {
        request.get('/api/v1')
          .set('Content-Type', 'application/json')
          .expect(404)
          .end((err, res) => {
            // expect(res.body).deep.equal({
            //   status: 'Failed',
            //   message: 'Page not found'
            // });
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('message');

            if (err) done(err);
            done();
          });
      });
    });
    describe('All test cases for Users', () => {
      describe('All test cases for Users sign up', () => {
      it('should  check if user already in the model and return a `409`', (done) => {
        const userProfile = {
          email: 'cage@yahoo.com',
          firstName: 'cage',
          lastName: 'Jonny',
          password: 'password'
        };
        request.post('/api/v1/auth/signup')
          .send(userProfile)
          .expect(409)
          .end((err, res) => {
            expect(res.body).to.have.property('Status');
            expect(res.body).to.have.property('Message');
            done();
          });
      });
    });
 it('should not create a new user account and return a `422`', (done) => {
        request.post('/api/v1/auth/signup')
          .send({})
          .expect(422)
          .end((err, res) => {
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('message');
            done();
          });
      });
      it('should  not create a new user account and return a `400`', (done) => {
        request.post('/api/v1/auth/signup')
          .send({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.catchErrors).to.have.property('firstName');
            expect(res.body.catchErrors).to.have.property('lastName');
            expect(res.body.catchErrors).to.have.property('email');
            expect(res.body.catchErrors).to.have.property('password');
            done();
          });
      });
      it('should  not create a new user account and return a `400`', (done) => {
        request.post('/api/v1/auth/signup')
          .send({
            firstName: 'e1',
            lastName: 'd222',
            email: 'ccc.com',
            password: 'jbh',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.catchErrors).to.have.property('firstName');
            expect(res.body.catchErrors).to.have.property('lastName');
            expect(res.body.catchErrors).to.have.property('email');
            expect(res.body.catchErrors).to.have.property('password');
            done();
          });
      });
   
    describe('All test cases for user signIn ', () => {
      it('should not Login  a new user and return a `422`', (done) => {
        request.post('/api/v1/auth/signin')
          .send({
            email: 'wronguser',
            password: '12345678'
          })
          .expect(422)
          .end((err, res) => {
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('message');
            done();
          });
      });
      it('should not login new user account and return a `422`', (done) => {
        request.post('/api/v1/auth/signin')
          .send({})
          .expect(422)
          .end((err, res) => {
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('message');
            done();
          });
      });
      it('should not login a new user account and return a `422`', (done) => {
        request.get('/api/v1/auth/signin')
          .send({
            email: '',
            password: ''
          })
          .expect(422)
          .end((err, res) => {
            expect(res.body.signErrors).to.have.property('email');
            expect(res.body.signErrors).to.have.property('password');
            done();
          });
      });
      it('should  not login a new user account and return a `400`', (done) => {
        request.get('/api/v1/auth/signin')
          .send({
            email: 'h.com',
            password: 'tyty'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.signErrors).to.have.property('email');
            expect(res.body.signErrors).to.have.property('password');
            done();
          });
      });
      it('should Login a new user and return a `201`', (done) => {
        const userInfo = {
          email: 'mors@test.com',
          password: '123456'
        };
        request.post('/api/v1/auth/signin')
          .send(userInfo)
          .expect(201)
          .end((err, res) => {
            myToken = res.body.token;
            expect(res.body).to.have.property('status');
            done();
          });
      });
      it('Should throw error when a user wants to acces this option', (done) => {
        request.patch('/api/v1/trips/44')
          .set('x-access-token', myToken)
          .send({
            status: 'active'
          })
          .expect(400)
          .end((err, res) => {
            console.log(res.body);
            // expect(res.body.message).to.equal('Permission denied')
            // expect(res.body.status).to.equal(201);
            // expect(res.body.userProfile.firstName).to.equal('Maurice');
            // expect(res.body.userProfile.lastName).to.equal('Etim');
            // expect(res.body.userProfile.email).to.equal('mauricium.maurice@yahoo.com');
            // expect(res.body.userProfile.homeAddress).to.equal('555 sango road ogun');
            // expect(res.body.userProfile.workAddress).to.equal('67 epic tower anthony');
            done();
          });
      });

  //     it('change user role for test', (done) => {
  //       request.patch('/api/v1/users/1/test')
  //         .set('x-access-token', myToken)
  //         .expect(200)
  //         .end((err, res) => {
  //           console.log(res.body, '------------')
  //           expect(res.body).to.be.an('object');
  //           done();
  //         })
  //     })


  //     it('Should verify user status and return `422`', (done) => {
  //       request.patch('/api/v1/users/micium.maurice@yahoo.com/verify')
  //         .set('x-access-token', myToken)
  //         .send({})
  //         .expect(422)
  //         .end((err, res) => {
  //           expect(res.body.status).to.equal("Failed");
  //           expect(res.body.message).to.equal('This fields cannot be empty');
  //           done();
  //         });
  //     });
  //   });
  //   describe('test case for retriving all loan in the QuickCredit', () => {
  //     it('should return `401` status code with `res.body` failed messages', (done) => {
  //       request.get('/api/v1/loans')
  //         .set('x-access-token', wrongToken)
  //         .expect(401)
  //         .end((err, res) => {
  //           expect(res.body.status).to.equal('Failed');
  //           expect(res.body.message).to.equal('Authentication failed. Token is either invalid or expired');
  //           done();
  //         });
  //     });
  //     it('should get a one loan return `201` status code with `res.body` success messages', (done) => {
  //       request.get('/api/v1/loans/1')
  //         .set('x-access-token', myToken)
  //         .expect(201)
  //         .end((err, res) => {
  //           expect(res.body).to.have.property('status');
  //           expect(res.body).to.have.property('message');
  //           done();
  //         });
  //     });
  //     it('should get loan id return `422 status code with `res.body` success messages', (done) => {
  //       request.get('/api/v1/loans/22')
  //         .set('x-access-token', wrongToken)
  //         .expect(422)
  //         .end((err, res) => {
  //           expect(res.body).to.have.property('status');
  //           expect(res.body).to.have.property('message');
  //           done();
  //         });
  //     });
  //     it('should get repaid loans return `201 status code with `res.body` success messages', (done) => {
  //       request.get('/api/v1/loans/repaid')
  //         .set('x-access-token', myToken)
  //         .set('Content-Type', 'application/json')
  //         .expect(201)
  //         .end((err, res) => {
  //           expect(res.body).to.have.property('status');
  //           expect(res.body).to.have.property('data');
  //           done();
  //         });
  //     });
  //     it('should return `201` status code with `res.body` success messages', (done) => {
  //       request.get('/api/v1/loans')
  //         .set('x-access-token', myToken)
  //         .expect(201)
  //         .end((err, res) => {
  //           expect(res.body).to.have.property('data');
  //           expect(res.body).to.have.property('status');
  //           done();
  //         });
  //     });

  //     it('should get repaid loans return `201 status code with `res.body` success messages', (done) => {
  //       request.get('/api/v1/loans/unrepaid')
  //         .set('Content-Type', 'application/json')
  //         .expect(201)
  //         .end((err, res) => {
  //           expect(res.body).to.have.property('status');
  //           expect(res.body).to.have.property('data');
  //           done();
  //         });
  //     });
  //     it('Should get loan repayment history return `201 status code with `res.body` success messages', (done) => {
  //       request.get('/api/v1/loans/1/repayment')
  //         .set('x-access-token', myToken)
  //         .expect(201)
  //         .end((err, res) => {
  //           expect(res.body).to.have.property('status');
  //           expect(res.body).to.have.property('message');
  //           done();
  //         });
  //     });
  //     it('Should get loan repayment history return `201 status code with `res.body` success messages', (done) => {
  //       request.get('/api/v1/loans/55/repayment')
  //         .set('x-access-token', wrongToken)
  //         .expect(422)
  //         .end((err, res) => {
  //           expect(res.body).to.have.property('status');
  //           expect(res.body).to.have.property('message');
  //           done();
  //         });
  //     });
  //   });
  //   describe('All test case loan Application', () => {
  //     it('Should create a new loan application and return a `201`', (done) => {
  //       const applyLoan = {
  //         firstName: 'xanda',
  //         lastName: 'cage',
  //         email: 'cage@yahoo.com',
  //         tenor: '3 month',
  //         amount: '55,000'
  //       };
  //       request.post('/api/v1/loans')
  //         .send(applyLoan)
  //         .expect(201)
  //         .end((err, res) => {
  //           console.log(res.body, '===================');
  //           done();
          });
  //     });
    });
  });
});
