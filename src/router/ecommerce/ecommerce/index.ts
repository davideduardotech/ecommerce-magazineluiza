import express from 'express';
import produtoRouter from './produtoRouter';

const ecommerceRouter = express.Router();

ecommerceRouter.use('/produto',produtoRouter)

export default ecommerceRouter;



