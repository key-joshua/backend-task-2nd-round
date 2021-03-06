import { BAD_REQUEST } from 'http-status';
import helper from '../helpers/responseHelper';

const validateSchema = (schema, body, res, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const errors = error.details.map((err) => err.message);
    helper.handleError(BAD_REQUEST, errors[0].replace(/"/g, ''));
    return helper.response(res);
  }

  return next();
};

export default validateSchema;
