import mongoose,{ Schema } from "mongoose";

const lojaSchema = new Schema({
    nome: {type: String, required: true},
    descricao: {type: String},
    userLogin:{type: mongoose.Types.ObjectId, required: true}
});

export const loja = mongoose.model('Loja',lojaSchema);