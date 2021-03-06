import chai from 'chai';
import supertest from 'supertest';
import app from '../app';
import db from './../model/db';


const { expect } = chai;
const request = supertest(app);
let myToken;
const wrongToken = 'hghgjhgjgjgjggg';

describe('All test cases for WarFarer Application', () => {
  // before('Empty user table',()=>{

  //   db.query('DELETE FROM users');
  //   db.query('DELETE FROM trips');
  //   db.query('DELETE FROM bookings');
  //   db.query('DELETE FROM bus');
  // })
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
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('message');

            if (err) done(err);
            done();
          });
      });
    });
    describe('All test cases for Users', () => {
      describe('All test cases for Users sign up', () => {
        it('succedss `201`', (done) => {
          const userProfile = {
            email: 'cagey@yahoo.com',
            firstName: 'cagey',
            lastName: 'Jonny',
            password: '123456'
          };
          request.post('/api/v1/auth/signup')
            .send({userProfile})
            .expect(201)
            .end((err, res) => {
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');
              done();
            });
        });
        it('succedss `201`', (done) => {
          const userProfile = {
            email: 'cagey@yahoo.com',
            firstName: 'cagey',
            lastName: 'Jonny',
            password: '123456'
          };
          request.post('/api/v1/auth/signup')
            .send(userProfile)
            .expect(201)
            .end((err, res) => {
              expect(res.body.catchErrors).to.have.property('lastName');
              expect(res.body.catchErrors).to.have.property('firstName');
              done();
            });
        });
      it('should  check if user already in the model and return a `409`', (done) => {
        const userProfile = {
          email: 'cagey@yahoo.com',
          firstName: 'cagey',
          lastName: 'Jonny',
          password: '123456'
        };
        request.post('/api/v1/auth/signup')
          .send(userProfile)
          .expect(409)
          .end((err, res) => {
            console.log(res.body, '=============98=======')
            done();
          });
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
            expect(res.body.catchErrors).to.have.property('email');
            expect(res.body.catchErrors).to.have.property('password');
            done();
          });
      })
   
    describe('All test cases for user signIn ', () => {
      it('should not Login  a new user and return a `4222`', (done) => {
        request.post('/api/v1/auth/signin')
          .send({
            email: 'wronguser',
            password: '12345678'
          })
          .expect(422)
          .end((err, res) => {
            expect(res.body).to.have.be.an('object');
            expect(res.body).to.have.be.an('object');
            done();
          });
      });
      it('should not login new user account and return a `4262`', (done) => {
        request.post('/api/v1/auth/signin')
          .send({})
          .expect(422)
          .end((err, res) => {
            expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');
            done();
          });
      });
      it('should not login a new user account and return a `4221`', (done) => {
        request.post('/api/v1/auth/signin')
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
        request.post('/api/v1/auth/signin')
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
      // it('should Login a new user and return a `201`', (done) => {
      //   const userInfo = {
      //     email: 'cagey@yahoo.com',
      //     password: '123456'
      //   };
      //   request.post('/api/v1/auth/signin')
      //     .send(userInfo)
      //     .expect(201)
      //     .end((err, res) => {
      //       console.log(res.body, '==============090======')
      //       myToken = res.body.data.Token;
      //       expect(res.body).to.have.property('status');
      //       expect(res.body).to.have.property('message');
      //       // expect(res.body).to.have.property('status');
      //       done();
      //     });
      // });


      // it('Should cancel trip `201`', (done) => {
      //   request.patch('/api/v1/trips/1')
      //     .set('x-access-token', myToken)
      //     .send({})
      //     .expect(201)
      //     .end((err, res) => {
      //       expect(res.body).to.have.property('message');
      //       done();
      //     });
      // });
  //   });
    describe('test case for retriving trips', () => {
      it('should return `401` status code with `res.body` failed messages', (done) => {
        request.get('/api/v1/trips')
          .set('x-access-token', wrongToken)
          .expect(401)
          .end((err, res) => {
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('message');
            done();
          });
      });
      it('should get not bookings', (done) => {
        request.get('/api/v1/trips/1')
          .set('x-access-token', wrongToken)
          .expect(401)
          .end((err, res) => {
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('message');
            done();
          });
      });
      it('should get not bookings', (done) => {
        request.get('/api/v1/trips/1')
          .set('x-access-token', wrongToken)
          .expect(401)
          .end((err, res) => {
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('message');
            done();
          });
      });
        // it('should return `201` status code with `res.body` success messages', (done) => {
        //   request.get('/api/v1/trips')
        //     .set('x-access-token', myToken)
        //     .expect(201)
        //     .end((err, res) => {
        //       console.log(res.body, '========---00');
        //       done();
        //     });
        // });
      // it('should get a one loan return `201` status code with `res.body` success messages', (done) => {
      //   request.get('/api/v1/loans/1')
      //     .set('x-access-token', myToken)
      //     .expect(201)
      //     .end((err, res) => {
      //       expect(res.body).to.have.property('status');
      //       expect(res.body).to.have.property('message');
      //       done();
      //     });
      // });
      it('should get not bookings', (done) => {
        request.get('/api/v1/bookings')
          .set('x-access-token', wrongToken)
          .expect(401)
          .end((err, res) => {
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('message');
            done();
          });
      });
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
  it('should get not bus', (done) => {
    request.get('/api/v1/bus')
      .set('x-access-token', wrongToken)
      .expect(401)
      .end((err, res) => {
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });
    // describe('All test case loan Application', () => {
    //   it('Should create a new bus and return a `201`', (done) => {
    //     const bus = {
    //       firstName: 'xanda',
    //       lastName: 'cage',
    //       email: 'cage@yahoo.com',
    //       tenor: '3 month',
    //       amount: '55,000'
    //     };
    //     request.post('/api/v1/loans')
    //       .send(bus)
    //       .expect(201)
    //       .end((err, res) => {
    //         console.log(res.body, '===================');
    //         done();
    //       });
    //   });
    // });
    describe('All test case loan Application', () => {
      it('Should create a new bus and return a `201`', (done) => {
        const bus = {
          number_plate : ' ',
          manufacturer: ' ',
          model: ' ',
          year: ' ',
          capacity: ' '
        };
        request.post('/api/v1/bus')
          .send(bus)
          .expect(401)
          .end((err, res) => {
            console.log(res.body);
            done();
          });
      });
    });
  });
});
  });
});
});

