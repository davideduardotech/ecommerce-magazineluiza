import { ProdutoModel } from '../model/produto';
import User from '../model/user';
import { validationResult } from 'express-validator';
import mongoose, { Mongoose } from 'mongoose';
import fs from 'fs';
import path from 'path';


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

export const uploadImage = async (req: any, res: any, next: any) => {
    try{
        const {id_produto, index_imagem} = req.params; 

        // verificar produto
        if(!mongoose.Types.ObjectId.isValid(id_produto)) return res.status(401).json({error:`indentificação do produto(${id_produto}) inválida`});
        // verificar index da imagem
        try{
            parseInt(index_imagem);
            if(index_imagem > 3) return res.status(401).json({error:`index da imagem(${index_imagem}) inválido`});
        }catch(error){
            return res.status(401).json({error:`index da imagem(${index_imagem}) inválido`});
        }
        

        // verificar arquivo
        const file = req.file;
        if(!file) return res.status(404).json({error:'nenhum arquivo enviado'});
       
        // procurar usuario no MongoDB
        const userMongoDB = await User.findById(new mongoose.Types.ObjectId(req.user.id));
        if(!userMongoDB) return res.status(401).json({error:'usuário não encontrado'})

        // procurar produto no MongoDB
        const produtoMongoDB:any = await ProdutoModel.findById(new mongoose.Types.ObjectId(id_produto));
        if(!produtoMongoDB) return res.status(404).json({error:`produto não encontrado`});

        // imagem antiga
        const imagemAntigaMongoDB = produtoMongoDB.image[index_imagem].url;
        const urlDaImagemAntiga = path.join(__dirname,`../public${produtoMongoDB.image[index_imagem].url}`);
    
        const isCreator = userMongoDB._id.toString() === produtoMongoDB.user.toString();
        if(isCreator){ // usuario criador do produto
            const url_image = `/img/uploads/products/${file.filename}`;

            
            try{   
                // alterar imagem do produto no banco de dados(MongoDB) 
                const updateProduct:any = await ProdutoModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id_produto),{[`image.${index_imagem}.url`]:url_image},{new: true});
                console.log(`${imagemAntigaMongoDB}(imagem antiga) ${updateProduct.image[index_imagem].url}(imagem atual) --> ${imagemAntigaMongoDB===updateProduct.image[index_imagem].url}`);
                if(!updateProduct) return res.status(500).json({error:`erro ao tentar atualizar a imagem do produto(${id_produto}) para "${file.filename}"`});
            }catch(error){
                return res.status(500).json({error:`erro ao tentar atualizar a imagem do produto(${id_produto}) para "${file.filename}"`});
            }

            if(!urlDaImagemAntiga.includes('product_default.png')){ 
                // excluir imagem antiga
                try{
                    await fs.promises.unlink(urlDaImagemAntiga);
                }catch(error){
                    console.log('ocorreu um erro ao tentar excluir imagem:',error);
                }
            }

            return res.status(200).json({message:`Upload da imagem "${file.originalname}" concluído.`,file: file});

        }else{
            return res.status(401).json({error:`você não tem autorização pra alterar esse produto(${id_produto})`})
        }
    }catch(error){
        return res.status(500).json({error:`${error}`});
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

