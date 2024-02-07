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
            // CODDING: menu de expansão
            const menuExpanding = [
                {
                  label:"Todos os Departamentos",
                  icon:{
                    name:"fa-solid fa-bars",
                    size:"text-[25px]"
                  },
                  expanded:{
                      "coluna 1":[
                        {label:"Ar e Ventilação",href:"/"},
                        {label:"Artesanato",href:"/"},
                        {label:"Artigos de Festa",href:"/"},
                        {label:"Áudio",href:"/"},
                      ],
                      "coluna 2":[
                        {label:"Decoração",href:"/"},
                        {label:"Eletrodomésticos",href:"/"},
                        {label:"Eletroportáteis",href:"/"},
                        {label:"Esporte e Lazer",href:"/"},
                      ],
                      "coluna 3":[
                        {label:"Pet Shop",href:"/"},
                        {label:"Religião e Espiritualidade",href:"/"},
                        {label:"Relógios",href:"/"},
                        {label:"Saúde e Cuidados Pessoais",href:"/"},
                      ]
                    },
                  
                },
                {
                  label:"Ofertas do Dia",
                  expanded:{
                      "coluna 1":[
                        {label:"Ar e Ventilação",href:"/"},
                        {label:"Artesanato",href:"/"},
                        {label:"Artigos de Festa",href:"/"},
                        {label:"Áudio",href:"/"},
                      ],
                      "coluna 2":[
                        {label:"Decoração",href:"/"},
                        {label:"Eletrodomésticos",href:"/"},
                        {label:"Eletroportáteis",href:"/"},
                        {label:"Esporte e Lazer",href:"/"},
                      ],
                      "coluna 3":[
                        {label:"Pet Shop",href:"/"},
                        {label:"Religião e Espiritualidade",href:"/"},
                        {label:"Relógios",href:"/"},
                        {label:"Saúde e Cuidados Pessoais",href:"/"},
                      ]
                    },
                  
                },
                {
                  label:"Celulares",
                  expanded:{
                      "coluna 1":[
                        {label:"Ar e Ventilação",href:"/"},
                        {label:"Artesanato",href:"/"},
                        {label:"Artigos de Festa",href:"/"},
                        {label:"Áudio",href:"/"},
                      ]
                    },
                  
                },
                {
                  label:"Móveis",
                  expanded:{
                      "coluna 1":[
                        {label:"Ar e Ventilação",href:"/"},
                        {label:"Artesanato",href:"/"},
                        {label:"Artigos de Festa",href:"/"},
                        {label:"Áudio",href:"/"},
                      ]
                  },
                  
                },
                {
                  label:"Eletrodomésticos",
                  expanded:{
                      "coluna 1":[
                        {label:"Ar e Ventilação",href:"/"},
                        {label:"Artesanato",href:"/"},
                        {label:"Artigos de Festa",href:"/"},
                        {label:"Áudio",href:"/"},
                      ]
                    },
                },
                {
                  label:"TV e Vídeo",
                  expanded:{
                      "coluna 1":[
                        {label:"Ar e Ventilação",href:"/"},
                        {label:"Artesanato",href:"/"},
                        {label:"Artigos de Festa",href:"/"},
                        {label:"Áudio",href:"/"},
                      ]
                  },
                }
              ] 
            
            if(req.user){
              return res.render('pages/product',{produto,menuExpanding,user:req.user});
            }else{
              return res.render('pages/product',{produto,menuExpanding});
            }
        }else{
            return res.status(404).json({error: 'produto não encontrado'})
        }
    }catch(error){
        return res.status(500).json({error:`${error}`});
    }
})

export {ecommerceRouter};