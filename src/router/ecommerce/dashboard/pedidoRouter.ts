import express from 'express';
import mongoose from 'mongoose'

// CODDING: Modelos
import Pedido from '../../../model/pedido';

const pedidoRouter = express.Router();

// pedidos
pedidoRouter.get('/',async (req:any, res:any, next:any)=>{
    const pedidosEncontrados = await Pedido.find({loja: new mongoose.Types.ObjectId('65d886eabe9695246b30aa2a')});
    return res.render('pages/ecommerce/dashboard/pedidos/pedidos.ejs',{pedidos:pedidosEncontrados});
});

export default pedidoRouter;


