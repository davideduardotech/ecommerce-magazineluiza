import express,{ Router } from "express";
import { criarProduto,deletarProduto,searchProduto, uploadImage, deleteImage, favoriteProduto,unFavoriteProduto } from '../../controllers/produtoController';
import { produtoValidation } from "../../controllers/produtoValidation";
import { auth } from '../auth';
import {randomUUID} from 'crypto'; // gerar um identificador único universal (UUID)
import path from 'path';
import mongoose from 'mongoose';
import multer from 'multer';

// CODDING: Configurando Multer para Upload de Imagem
const productImageStorage = multer.diskStorage({
    destination: function(req:any, file, callback){ // diretorio
        callback(null, 'src/public/img/uploads/products');
    },
    filename: function(req:any, file, callback){ // nome do arquivo
        const uuid = randomUUID();
        const utc = Date.now();
        const extname = path.extname(file.originalname);
        callback(null,`image-${utc}-${uuid}${extname}`);
    }
})

const productImageUpload = multer({
    storage: productImageStorage
});


const produtoRouter: Router = express.Router();

// criar produto
produtoRouter.post('/', auth,produtoValidation.criarProduto,criarProduto);

// CODDING: Upload de imagem
produtoRouter.post('/:id_produto/upload/image/:index_imagem', auth, productImageUpload.single('imagem'), uploadImage);

// CODDING: Excluir imagem
produtoRouter.post('/:id_produto/delete/image/:image_index', auth, deleteImage);

// CODDING: Adicionar produto favorito(Favorite)
produtoRouter.get('/:id_produto/favorite',auth,favoriteProduto);

// CODDING: Remover produto de favorito(UnFavorite)
produtoRouter.get('/:id_produto/unfavorite',auth, unFavoriteProduto);

// deletar produto
produtoRouter.delete('/:id',auth,deletarProduto);

// CODDING: Buscar Produto
produtoRouter.get('/search',searchProduto);

export {produtoRouter};
