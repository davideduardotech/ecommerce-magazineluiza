import { ProdutoModel } from '../model/produto';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';


export const criarProduto = async (req: any, res:any, next:any) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({'express-validator':errors});

        const {name, price, category, discount, credit_card} = req.body;
        const produto = new ProdutoModel(
            {
                user: new mongoose.Types.ObjectId(req.user.id),
                name, 
                price,
                category:category||'', 
                discount:discount||0,
                credit_card:{
                    installments: credit_card?.installments||0,
                    fees: credit_card?.fees||0
                }
            });
        await produto.save()
        return res.status(200).json({produto});
    }catch(error){
        return res.status(500).json({error: `${error}`});
    }
}

export const deletarProduto = async (req: any, res:any, next: any): Promise<void> =>{

}

export const searchProduto = async (req: any, res: any, next: any) => {
    try{
        let {limit} = req.query;
        
        // limite de pesquisa
        try{
            limit = parseInt(limit);
        }catch(error){
            limit = 0;
        }
        
        const produtos = await ProdutoModel.find().limit(limit);
        
        return res.status(200).json({limit: limit, products:produtos});
    }catch(error){
        return res.status(500).json({error:`${error}`});
    }
}

