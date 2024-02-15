import mongoose, {Schema, Document, mongo} from "mongoose";
import jwt from 'jsonwebtoken'

const UserSchema = new Schema({
    nome: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    isAdmin: {type: Boolean},
    token:{type: String}
})


UserSchema.pre('save',function(){ // antes de salvar
    // CODDING: criar token
    this.token = jwt.sign({
        id: this._id,
        nome: this.nome,
        isAdmin: this.isAdmin,
        email: this.email
    },process.env.SECRET_KEY||'',{expiresIn:'7d'})
})  

// metodo para visualizar informações
UserSchema.methods.document = function() {
    return {
        id: this._id,
        nome: this.nome,
        email: this.email,
        token: this.token
    }
}

// metodo para atualizar token
UserSchema.methods.refreshToken = async function(){
    try{
        this.token = jwt.sign(this.document(), process.env.SECRET_KEY||'',{expiresIn:'7d'});
        await this.save();
    }catch(error){
        console.log(error);
    }

}

const User = mongoose.model<any>('User',UserSchema);

export default User;