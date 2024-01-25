import mongoose,{ Document, Schema, mongo } from "mongoose";

const produtoSchema = new Schema({
    usuario:{type: Schema.Types.ObjectId, ref:"User",required: true},
    nome:{
        type: String,
        required: true
    },
    imagem:{
        1:{url:{type: String, default:'/img/default/product_default.png'}},
        2:{url:{type: String, default:'/img/default/product_default.png'}},
        3:{url:{type: String, default:'/img/default/product_default.png'}},
        4:{url:{type: String, default:'/img/default/product_default.png'}}
    },
    categoria:{
        type: String,
        required: true
    },
    avaliacao:[{type: mongoose.Schema.Types.ObjectId, ref:"Avaliacao"}],
    "preço(R$)":{
        pix:{
            "preço(R$)":{type: Schema.Types.Number, required: true},
            "preço com desconto(R$)":{type: Schema.Types.Number, required: true},
            "desconto(R$)":{type: Schema.Types.Number, required: true},
            "desconto(%)":{type: Schema.Types.Number, required: true}
        },
        "cartão de crédito":{
            "parcelas disponiveis":[Number],
            "valor da parcela(R$)":{type: Schema.Types.Number},
            "valor total(R$)":{type: Schema.Types.Number},
            "juros(%)":{type: Schema.Types.Decimal128, required: true}
        }
    }
},{timestamps: true});


const ProdutoModel = mongoose.model('Produto',produtoSchema);

export { ProdutoModel };