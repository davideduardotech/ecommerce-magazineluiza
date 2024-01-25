import express, { Router } from 'express';
import { getUserById, createUser } from '../../controllers/userController';
import { auth } from '../auth';

const userRouter: Router = express.Router();


userRouter.get('/',auth,getUserById);
userRouter.post('/',createUser);
userRouter.put('/',()=>{
    // atualizar usuario
})
userRouter.delete('/',()=>{
    // excluir usuario
})

export { userRouter };