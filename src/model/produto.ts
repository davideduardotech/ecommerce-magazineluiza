import mongoose,{ Document, Schema, mongo } from "mongoose";

const produtoSchema = new Schema({
    user:{type: Schema.Types.ObjectId, ref:"User",required: true},
    name:{
        type: String,
        required: true
    },
    image:{
        0:{url:{type: String, default:'/img/default/product_default.png'}},
        1:{url:{type: String, default:'/img/default/product_default.png'}},
        2:{url:{type: String, default:'/img/default/product_default.png'}},
        3:{url:{type: String, default:'/img/default/product_default.png'}}
    },
    category:{
        type: String,
        required: true
    },
    assessment:[{type: mongoose.Schema.Types.ObjectId, ref:"Avaliacao"}],
    price: {type: Number, required: true},
    discount: { type: Number, default: 0},
    credit_card:{
        installments:{type: Number, default: 0},
        fees:{type: Number, default: 0}
    }
},{timestamps: true});


const ProdutoModel = mongoose.model('Produto',produtoSchema);

export { ProdutoModel };