import { INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST, OK } from 'http-status';
import employeeHelper from '../helpers/employeeHelper';
import responseHelper from '../helpers/responseHelper';
import pagination from '../helpers/paginateHelper';

/**
* This class contains all methods (functions) required to handle
* Select all employees function.
* Select a particular employee function.
* Update a particular employee function.
* Delete a particular employee function.
*/
class EmployeeController {
  /**
     * Handle selectEmployee.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} returned employee details object.
     */
  static async selectEmployee(req, res) {
    try {
      const data = await employeeHelper.findOneEmployees('_id', req.params.employeeId);
      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Employee with id ${req.params.employeeId} not found.`);
        return responseHelper.response(res);
      }

      responseHelper.handleSuccess(OK, 'Employee details selected successfully.', data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  /**
     * Handle selectEmployees.
     * @param {object} req user request.
     * @param {object} res data response.
     * @param {object} next move data response.
     * @returns {object} returned object of data.
     */
  static async selectEmployees(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await pagination.paginateData(req.query);
      const fetchedData = await employeeHelper.findEmployees(skip, start);
      const countedData = await employeeHelper.countEmployees();

      const allDatata = fetchedData;
      const countAllData = countedData;

      if (countAllData < 1) {
        responseHelper.handleError(NOT_FOUND, 'Employees not found at the moment');
        return responseHelper.response(res);
      }

      req.data = { allDatata, countAllData, start, end, pages, skip, paginate };
      next();
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  /**
     * Handle deleteEmployee.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {string} returned message.
     */
  static async deleteEmployee(req, res) {
    try {
      const data = await employeeHelper.findOneEmployees('_id', req.params.employeeId);
      if (!data) {
        responseHelper.handleError(NOT_FOUND, `Employee with id ${req.params.employeeId} not found.`);
        return responseHelper.response(res);
      }

      await employeeHelper.deleteOneEmployee('_id', req.params.employeeId);
      responseHelper.handleSuccess(OK, 'Employee deleted successfully.');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  /**
     * Handle updateEmployee.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} returned object of updated data.
     */
  static async updateEmployee(req, res) {
    try {
      if (req.body && Object.keys(req.body).length === 0 && Object.getPrototypeOf(req.body) === Object.prototype) {
        responseHelper.handleError(BAD_REQUEST, `Changes to update not found.`);
        return responseHelper.response(res);
      }

      let data = await employeeHelper.findOneEmployees('_id', req.params.employeeId);
      if (!data || data.isFired === true) {
        responseHelper.handleError(NOT_FOUND, `Employee with id ${req.params.employeeId} not found.`);
        return responseHelper.response(res);
      }

      const photo = req.photo !== 'Error' && req.photo !== 'TypeError' && req.photo !== undefined && req.photo !== null ? req.photo.Location : data.photo;
      data = await employeeHelper.updateOneEmployee(req.body, data, photo);
      responseHelper.handleSuccess(OK, 'Employee details updated successfully.', data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }
}

export default EmployeeController;
