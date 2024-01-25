import express,{ Router } from 'express';
import { userRouter } from './api/userRouter';
import { ecommerceRouter } from './ecommerce/ecommerceRouter';
import { produtoRouter } from './api/produtoRouter';

const apiRouter: Router = express.Router();

// CODDING: Api
apiRouter.use("/user",userRouter);
apiRouter.use("/produto",produtoRouter);


export { apiRouter,ecommerceRouter };
