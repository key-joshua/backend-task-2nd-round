import Router from 'express';
import employeeRouter from './employeeRoute';

const router = Router();
router.use('/employees', employeeRouter);

export default router;
