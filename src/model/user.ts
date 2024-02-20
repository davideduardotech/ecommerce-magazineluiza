import mongoose, {Schema, Document, mongo} from "mongoose";
import jwt from 'jsonwebtoken'

const UserSchema = new Schema({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: true},
    senha: { type: String, required: true },
    favorite:[{ type: mongoose.Types.ObjectId }],
    isAdmin: {type: Boolean},
    token:{type: String}
})


// metodo para visualizar informações
UserSchema.methods.document = function() {
    console.log(`Função UserSchema.methods.document executada`);
    return {
        id: this._id,
        nome: this.nome,
        sobrenome: this.sobrenome,
        telefone: this.telefone,
        favorite:this.favorite,
        isAdmin: this.isAdmin,
        email: this.email,
        token: this.token
    }
}

// criar token
UserSchema.methods.createToken = async function(){
    try{
        this.token = jwt.sign(this.document(),process.env.SECRET_KEY||'',{expiresIn:'7d'});
    }catch(error){
        console.log(error);
    }
};

// metodo para atualizar token
UserSchema.methods.refreshToken = async function(){
    console.log(`Função UserSchema.methods.refreshToken executada`);
    try{
        this.token = jwt.sign(this.document(), process.env.SECRET_KEY||'',{expiresIn:'7d'});
        await this.save();
    }catch(error){
        console.log(error);
    }

}

const User = mongoose.model<any>('User',UserSchema);

export default User;