import mongoose,{ Document, Schema, mongo } from "mongoose";

const produtoSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, required: true},
    loja: {type: mongoose.Types.ObjectId, required: true},
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
        default: ''
    },
    assessment:[{type: mongoose.Schema.Types.ObjectId, ref:"Avaliacao"}],
    price_without_discount:{type: Number},
    price: {type: Number, required: true},
    discount: { type: Number, default: 0},
    discount_price: {type: Number },
    credit_card:{
        price: { type: Number,default: 0},
        installment_price: { type: Number, default: 0},
        installments:{type: Number, default: 0},
        fees:{type: Number, default: 0}
    }
},{timestamps: true});

produtoSchema.pre('save',function(){ // antes de salvar
    if(this.discount > 0){// calcular desconto
        this.price_without_discount = this.price; // preço(R$) antigo 
        this.discount_price = (this.price*this.discount)/100; // valor(R$) do desconto
        this.price = this.price - this.discount_price; // preço(R$) com desconto
    }

    if(this.credit_card && this.credit_card.installments > 0){
        if(this.credit_card.fees>0){ // parcelas com juros
            this.credit_card.installment_price = (this.price/this.credit_card.installments)*(1+this.credit_card.fees);
            this.credit_card.price = this.credit_card.installment_price*this.credit_card.installments;
        }else{ // parcelas sem juros
            this.credit_card.installment_price = this.price/this.credit_card.installments;
            this.credit_card.price = this.price;
        }
    }
})


const ProdutoModel = mongoose.model('Produto',produtoSchema);

export { ProdutoModel };