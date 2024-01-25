import express,{ Router } from "express";
import { criarProduto,searchProduto } from '../../controllers/produtoController';
import { auth } from '../auth';

const produtoRouter: Router = express.Router();

// CODDING: Criar Produto
produtoRouter.post('/', auth,criarProduto);

// CODDING: Buscar Produto
produtoRouter.get('/search',searchProduto);

export {produtoRouter};
