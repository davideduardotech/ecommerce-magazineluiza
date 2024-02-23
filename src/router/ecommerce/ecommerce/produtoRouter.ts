import express, { Router } from 'express';
import { ProdutoModel } from '../../../model/produto';
import User from '../../../model/user';
import mongoose from 'mongoose';
import { authWithCookie } from '../../auth';

const produtoRouter: Router = express.Router();

produtoRouter.get('/:id',authWithCookie,async (req:any, res:any, next:any)=>{
    try{
        const {id} = req.params;

        // verificar ObjectID do produto
        if (!mongoose.Types.ObjectId.isValid(id)) { 
            return res.status(400).json({ error: 'Indentificação do produto inválida.' });
        };

        // procurar produto no MongoDB
        const produto = await ProdutoModel.findById(new mongoose.Types.ObjectId(id));
        if(!produto) return res.status(404).json({error: 'Produto não encontrado.'});

        if(req.user){ // usuário autenticado
            // procurar usuario no MongoDB
            const user = await User.findById(new mongoose.Types.ObjectId(req.user.id));
            req.user.favorite = user.favorite;
            const favoriteList = user.favorite.map((objectId: mongoose.Types.ObjectId) => objectId.toString());
            const isFavorite = favoriteList.includes(id); // produto favoritado
        
            return res.render('pages/product/product',{produto,isFavorite,user:req.user});
        }else{ // usuário não autenticado
            return res.render('pages/product/product',{produto});
        }
        
            
        
    }catch(error){
        return res.status(500).json({error:`${error}`});
    }
})

export default produtoRouter;