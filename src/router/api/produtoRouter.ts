import express,{ Router } from "express";
import { criarProduto,deletarProduto,searchProduto } from '../../controllers/produtoController'
import { produtoValidation } from "../../controllers/produtoValidation";
import { auth } from '../auth';

const produtoRouter: Router = express.Router();

// criar produto
produtoRouter.post('/', auth,produtoValidation.criarProduto,criarProduto);

// deletar produto
produtoRouter.delete('/:id',auth,deletarProduto);

// CODDING: Buscar Produto
produtoRouter.get('/search',searchProduto);

export {produtoRouter};
