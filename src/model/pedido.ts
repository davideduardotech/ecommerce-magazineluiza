import mongoose, {Schema, mongo} from 'mongoose';

const pedidoSchema = new Schema({
    loja:{type: mongoose.Types.ObjectId, required: true},
    user: {type: mongoose.Types.ObjectId, required: true},
    "informacoes pessoais":{
        nome: {type: String, required: true},
        sobrenome: {type: String, required: true},
        email: {type: String, required: true},
        telefone: {type: String, required: true}
    },
    endereco:{
        rua: {type:String, required: true},
        bairro: {type: String, required: true},
        cidade: { type: String, required: true},
        estado: { type: String, required: true},
        cep: {type: String, required: true}
    },
    produtos:[
        {
            id:{type: mongoose.Types.ObjectId, required: true},
            nome: {type: String, required: true},
            preco: { type: String, required: true},
            quantidade: {type: String, required: true}
        }
    ],
    pagamento:{
        type: Object, required: true
    },
    status: {type: String, required: true}
},{timestamps: true});


const Pedido = mongoose.model('Pedido',pedidoSchema);
export default Pedido;