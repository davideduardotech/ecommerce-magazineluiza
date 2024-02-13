import express, { Router } from 'express';
import { ProdutoModel } from '../../model/produto';
import mongoose from 'mongoose';
import { authWithCookie } from '../auth';

const ecommerceRouter: Router = express.Router();

ecommerceRouter.get('/produto/:id',authWithCookie,async (req:any, res:any, next:any)=>{
    try{
        console.log('@rota /produto/:id req.user:',req.user);
        const {id} = req.params;

        if (!/^[0-9a-fA-F]{24}$/.test(id)) { 
            return res.status(400).json({ error: 'ObjectID inválido' });
        }

        const produto = await ProdutoModel.findById(new mongoose.Types.ObjectId(id));
        if(produto){
            if(req.user){
              return res.render('pages/product/product',{produto,user:req.user});
            }else{
              return res.render('pages/product/product',{produto});
            }
        }else{
            return res.status(404).json({error: 'produto não encontrado'})
        }
    }catch(error){
        return res.status(500).json({error:`${error}`});
    }
})

export {ecommerceRouter};