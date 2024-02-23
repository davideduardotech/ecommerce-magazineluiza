import express from 'express';
import pedidoRouter from './pedidoRouter';
import produtoRouter from './produtoRouter';
import userRouter from './userRouter';

const apiRouter = express.Router();
apiRouter.use('/pedido', pedidoRouter);
apiRouter.use('/produto', produtoRouter);
apiRouter.use('/user', userRouter);

export default apiRouter;

