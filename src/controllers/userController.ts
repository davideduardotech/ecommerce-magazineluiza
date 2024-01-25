import { Request, Response, NextFunction } from "express";
import UserModel,{ UserInterface } from "../model/userModel";


export const getUserById = async (req: any, res: any, next: any): Promise<void> =>{
    try{
        const ObjectID = req.user.id;
        const user = await UserModel.findById({_id: ObjectID});
        if(!user){
            res.status(404).json({error: 'usuário não encontrado'});
            return
        }
        res.status(200).json(user);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'erro ao buscar usuário' });
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const { nome, email, senha } = req.body;
        const newUser = new UserModel({nome, email, senha});
        await newUser.save();
        res.status(200).json({user:newUser});
    }catch(error){
        console.error(error);
        res.status(500).json({error: error});
    }
}