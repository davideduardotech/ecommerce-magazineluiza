import express,{ Router } from "express";
import { criarProduto,deletarProduto,searchProduto, uploadImage } from '../../controllers/produtoController'
import { produtoValidation } from "../../controllers/produtoValidation";
import { auth } from '../auth';
import {randomUUID} from 'crypto'; // gerar um identificador único universal (UUID)
import path from 'path';
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

// CODDING: upload de imagem
produtoRouter.post('/:id_produto/upload/image/:index_imagem',auth, productImageUpload.single('imagem'),uploadImage);

// deletar produto
produtoRouter.delete('/:id',auth,deletarProduto);

// CODDING: Buscar Produto
produtoRouter.get('/search',searchProduto);

export {produtoRouter};
