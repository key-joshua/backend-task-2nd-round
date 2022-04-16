/* eslint-disable consistent-return */

import fs from 'fs';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { SERVICE_UNAVAILABLE } from 'http-status';
import responseHelper from '../helpers/responseHelper';

dotenv.config();

const s3bucket = new AWS.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

const awsUploadFileService = async (req, res, next) => {
  if (!req.files.photo) {
    req.file = null;
    return next();
  }

  const fileContent = await fs.readFileSync(req.files.photo.path);
  const params = { Bucket: process.env.BUCKET_NAME, Key: req.files.photo.name, Body: fileContent };

  s3bucket.upload(params, (error, result) => {
    if (error) {
      responseHelper.handleError(SERVICE_UNAVAILABLE, error.toString());
      return responseHelper.response(res);
    }

    req.photo = result;
    return next();
  });
};

export default awsUploadFileService;
