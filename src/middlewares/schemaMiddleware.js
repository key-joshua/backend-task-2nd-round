import Joi from 'joi';
import joiPhone from 'joi-phone-number';
import validateSchema from './validateSchema';

const customJoi = Joi.extend(joiPhone);

/**
 * Handle validateUpdateEmployee.
* @param {object} req user request.
* @param {object} res data response.
* @param {object} next if true move response.
* @returns {object} returned object of data.
*/
const validateUpdateEmployee = (req, res, next) => {
  const dataSchema = Joi.object()
    .keys({
      name: Joi.string().min(3).max(50)
        .messages({
          'any.required': 'name is required',
          'string.empty': 'name is not allowed to be empty',
        }),
      photo: Joi.string()
        .messages({
          'any.required': 'photo is required',
          'string.empty': 'photo is not allowed to be empty',
        }),
      email: Joi.string().min(3).max(50)
        .messages({
          'any.required': 'email is required',
          'string.empty': 'email is not allowed to be empty',
        }),
      phone: customJoi.string().phoneNumber({ format: 'international', strict: true }).messages({
        'any.required': 'phone is required',
        'string.empty': 'phone is not allowed to be empty',
        'phoneNumber.invalid': 'phone did not seem to be a phone number',
      }),
      dob: Joi.date().min(new Date('1900-01-01').toISOString().split('T')[0]).max(new Date().toISOString().split('T')[0])
        .messages({
          'any.required': 'dob is required',
          'string.empty': 'dob is not allowed to be empty',
        }),
      address: Joi.string()
        .messages({
          'any.required': 'address is required',
          'string.empty': 'address is not allowed to be empty',
        }),
      salary: Joi.string()
        .messages({
          'any.required': 'salary is required',
          'string.empty': 'salary is not allowed to be empty',
        }),
      employmentDate: Joi.date()
        .messages({
          'any.required': 'employmentDate is required',
          'string.empty': 'employmentDate is not allowed to be empty',
        }),
      depertmentPosition: Joi.string().valid('Human Resource', 'Insurance', 'Web Application Development', 'Networking').messages({
        'any.required': 'depertmentPosition is required',
        'string.empty': 'depertmentPosition is not allowed to be empty',
      }),
    })
    .options({ abortEarly: false });

  return validateSchema(dataSchema, req.body, res, next);
};

export { validateUpdateEmployee };
