import Pedido from '../../model/pedido'
import { validationResult } from 'express-validator'
import mongoose from 'mongoose';


export const criarPedido = async (req:any,res:any, next:any)=>{
    const errors = validationResult(req);
    console.log(`errors:`,errors);
    if(!errors.isEmpty()){
        return res.status(400).json({expressVaidation: errors});
    }

    const pedidoData = req.body;
    pedidoData.user = new mongoose.Types.ObjectId('65abf1305e27c96109f6ca81');
    pedidoData.status = 'pedido criado';
    pedidoData.pagamento = {tipo: "pix",status: "pago"};

    const pedidoMongoDB = new Pedido(pedidoData);
    await pedidoMongoDB.save();
    return res.status(200).json({message:'pedido criado com sucesso', pedido: pedidoMongoDB});
}