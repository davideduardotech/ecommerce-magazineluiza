import { Request, Response, NextFunction } from "express";
import User from "../model/user";


export const getUserById = async (req: any, res: any, next: any): Promise<void> =>{
    try{
        const ObjectID = req.user.id;
        const user = await User.findById({_id: ObjectID});
        if(!user){
            res.status(404).json({error: 'usuário não encontrado'});
            return
        }
        res.status(200).json(user.document());
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'erro ao buscar usuário' });
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const { nome, email, senha } = req.body;
        const newUser = new User({nome, email, senha});
        await newUser.save();
        res.status(200).json({user:newUser});
    }catch(error){
        console.error(error);
        res.status(500).json({error: error});
    }
}

export const loginUser = async (req: any, res:any, next: any): Promise<void> =>{
    try{
        const {email, senha} = req.body;
        const user = await User.findOne({email: email}).exec(); // encontrar usuario

        if(!user) return res.status(404).json({error:'email/senha incorreto'});

        if(senha !== user.senha) return res.status(404).json({error: 'email/senha incorreto'})
        
        user.refreshToken(); // atualizar token 
        await user.save(); // salvar 

        return res.status(200).json(user.document());
    }catch(error){
        return res.status(500).json({error:'não foi possivel realizar login'})
    }
}