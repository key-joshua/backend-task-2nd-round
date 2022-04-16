import Router from 'express';
import multiparty from 'connect-multiparty';
import paginateMiddleware from '../middlewares/paginateMiddleware';
import employeeController from '../controllers/employeeController';
import awsUploadFileService from '../services/awsUploadFileService';
import { validateUpdateEmployee } from '../middlewares/schemaMiddleware';

const multipart = multiparty();
const employeesRouter = Router();

employeesRouter
  .get('/select-employee/:employeeId', employeeController.selectEmployee)
  .get('/select-employees', employeeController.selectEmployees, paginateMiddleware.paginateData)

  .delete('/delete-employee/:employeeId', employeeController.deleteEmployee)
  .patch('/update-employee/:employeeId', multipart, awsUploadFileService, validateUpdateEmployee, employeeController.updateEmployee);

export default employeesRouter;
