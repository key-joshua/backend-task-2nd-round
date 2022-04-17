import EmployeeSchema from '../models/employeeSchema';
import DepertmentSchema from '../models/depertmentSchema';

/**
* This class contains all methods (functions) required to handle
* Select all employees function.
* Select a particular employee function.
* Update a particular employee function.
* Delete a particular employee function.
*/
class EmployeeHelper {
  /**
   * findOneEmployees from Employees table.
   * @param {any} attribute table column field.
   * @param {any} value table column value.
   * @returns {object} of employee detatils.
   */
  static async findOneEmployees(attribute, value) {
    const data = await EmployeeSchema.findOne({ [attribute]: value }).populate('depertmentId');
    return data;
  }

  /**
   * findOneDepertment from depertment table.
   * @param {any} attribute table column field.
   * @param {any} value table column value.
   * @returns {object} of depertment detatils.
   */
  static async findOneDepertment(attribute, value) {
    const data = await DepertmentSchema.findOne({ [attribute]: value });
    return data;
  }

  /**
   * findEmployees from Employees table.
   * @param {integer} skip limitation point.
   * @param {integer} start start point.
   * @returns {object} of all employees.
   */
  static async findEmployees(skip, start) {
    const data = await EmployeeSchema.find().populate('depertmentId').skip(start).limit(skip);
    return data;
  }

  /**
   * countData from Employees table.
   * @returns {number} of all employees counted.
   */
  static async countEmployees() {
    const data = await EmployeeSchema.countDocuments();
    return data;
  }

  /**
   * deleteOneEmployee from Employees table.
   * @param {any} attribute table column field.
   * @param {any} value table column value.
   * @returns {null}.
   */
  static async deleteOneEmployee(attribute, value) {
    await EmployeeSchema.deleteOne({ [attribute]: value });
  }

  /**
   * updateOneEmployee from Employees table.
   * @param {object} newDetails new details of employee.
   * @param {object} oldDetails exist employee details.
   * @param {string} photo photo of employee.
   * @param {integer} depertmentId id of depertment.
   * @returns {object} updated employee details.
   */
  static async updateOneEmployee(newDetails, oldDetails, photo) {
    let data;
    if (newDetails.depertmentPosition !== undefined) {
      data = await this.findOneDepertment('depertmentPositions', newDetails.depertmentPosition);
    }

    data = await EmployeeSchema.updateOne({ _id: oldDetails.id },
      {
        $set: {
          name: newDetails.name || oldDetails.name,
          photo: photo || oldDetails.photo,
          email: newDetails.email || oldDetails.email,
          phone: newDetails.phone || oldDetails.phone,
          dob: newDetails.dob || oldDetails.dob,
          address: newDetails.address || oldDetails.address,
          salary: newDetails.salary || oldDetails.salary,
          employmentDate: newDetails.employmentDate || oldDetails.employmentDate,
          depertmentId: data === undefined ? oldDetails.depertmentId : data.id,
        }
      }
    );

    if (data.matchedCount === 1) return this.findOneEmployees('_id', oldDetails.id);
    return undefined;
  }

  /**
   * createEmployee from Employees table.
   * @param {object} body new details of employee.
   * @returns {object} updated employee details.
   */
  static async createEmployee(body) {
    let data;
    if (body.depertmentPosition !== undefined || body.depertmentPosition !== null) {
      data = await this.findOneDepertment('depertmentPositions', body.depertmentPosition);
    }
    data = await EmployeeSchema.create({
      isFired: false,
      name: body.name,
      photo: body.photo,
      email: body.email,
      phone: body.phone,
      dob: body.dob,
      address: body.address,
      salary: body.salary,
      employmentDate: body.employmentDate,
      depertmentId: data.id
    });

    return data;
  }
}

export default EmployeeHelper;
