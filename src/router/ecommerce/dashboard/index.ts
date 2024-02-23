import express from 'express';
import pedidoRouter from './pedidoRouter';

const dashboardRouter = express.Router();

dashboardRouter.use('/pedido', pedidoRouter);

export default dashboardRouter;
