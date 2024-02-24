import express from 'express';
import apiRouter from './api';
import ecommerceRouter from './ecommerce/ecommerce';
import dashboardRouter from './ecommerce/dashboard';

const appRouter = express.Router();

appRouter.use('/api', apiRouter);
appRouter.use('/ecommerce',ecommerceRouter);
appRouter.use('/ecommerce/dashboard',dashboardRouter);


export default appRouter;
