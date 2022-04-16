/* eslint-disable no-underscore-dangle */

import chaihttp from 'chai-http';
import chai, { expect } from 'chai';
import { BAD_REQUEST, NOT_FOUND, OK } from 'http-status';

import app from '../src/index';
import dummyData from './dummyData';
import employeesHelper from '../src/helpers/employeeHelper';

let data;
chai.use(chaihttp);
const router = () => chai.request(app);

describe('TEST SELECT EMPLOYEE/S APIs', async () => {
  before(async () => {
    data = await employeesHelper.createEmployee(dummyData[0]);
  });

  it('User should be able to select all employees', (done) => {
    router()
      .get('/api/employees/select-employees?page=1&limit=2')
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('User should be able to select all employees', (done) => {
    router()
      .get('/api/employees/select-employees?page=2&limit=2')
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('User should be able to select all employees', (done) => {
    router()
      .get('/api/employees/select-employees?page=3&limit=2')
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('User should be able to select all employees', (done) => {
    router()
      .get('/api/employees/select-employees?page=4&limit=2')
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('User should be able to select particular employee', (done) => {
    router()
      .get(`/api/employees/select-employee/${data._id}`)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });
});

describe('TEST UPDATE EMPLOYEE API', async () => {
  it('User should be able to update employee', (done) => {
    router()
      .patch(`/api/employees/update-employee/${data._id}`)
      .field('name', dummyData[1].name)
      .field('email', dummyData[1].email)
      .field('phone', dummyData[1].phone)
      .attach('photo', `${__dirname}/./photo.jpg`)
      .field('depertmentPosition', dummyData[1].depertmentPosition)
      .field('employmentDate', dummyData[1].employmentDate)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('User should be able to update employee', (done) => {
    router()
      .patch(`/api/employees/update-employee/${data._id}`)
      .field('name', dummyData[1].name)
      .field('email', dummyData[1].email)
      .field('phone', dummyData[1].phone)
      .attach('photo', `${__dirname}/./photo.jpg`)
      .field('employmentDate', dummyData[1].employmentDate)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('User should not be able to update employee with empty body', (done) => {
    router()
      .patch(`/api/employees/update-employee/${data._id}`)
      .end((error, response) => {
        expect(response).to.have.status(BAD_REQUEST);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});

describe('TEST DELETE, VEIW DELETED EMPLOYEES AND UPDATE DELETED EMPLOYEE APIs', async () => {
  it('User should be able to delete employee', (done) => {
    router()
      .delete(`/api/employees/delete-employee/${data._id}`)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });

  after(async () => {
    await employeesHelper.deleteOneEmployee('_id', data._id);
  });

  it('User should not be able to view unexist employee', (done) => {
    router()
      .delete(`/api/employees/delete-employee/${data.id}`)
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });

  it('User should not be able to update unexist employee', (done) => {
    router()
      .patch(`/api/employees/update-employee/${data._id}`)
      .field('name', dummyData[1].name)
      .field('email', dummyData[1].email)
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });

  it('User should not be able to delete unexist employee', (done) => {
    router()
      .delete(`/api/employees/delete-employee/${data.id}`)
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});
