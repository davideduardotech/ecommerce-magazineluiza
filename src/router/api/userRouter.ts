import express, { Router } from 'express';
import { getUserById, createUser, loginUser } from '../../controllers/userController';
import { auth } from '../auth';

const userRouter: Router = express.Router();

// login
userRouter.post('/login',loginUser);

// visualizar {Object} do usuario
userRouter.get('/',auth,getUserById); 

// criar usuário
userRouter.post('/',createUser);

// alterar usuário
userRouter.put('/',()=>{
    // atualizar usuario
})

// deletar usuário
userRouter.delete('/',()=>{
    // excluir usuario
})

export default userRouter;