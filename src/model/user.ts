import mongoose, {Schema, Document, mongo} from "mongoose";
import jwt from 'jsonwebtoken'

interface UserInterface extends Document{
    nome: String, 
    email: String,
    senha: String, 
    isAdmin: boolean,
    token: String,
    document(): Object,
    refreshToken(): void

}

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
UserSchema.methods.refreshToken = function(){
    try{
        console.log('token anterior:',this.token);
        const token_anterior = this.token;
        this.token = jwt.sign(this.document(), process.env.SECRET_KEY||'',{expiresIn:'7d'});
        console.log('token atualizado:', this.token);
        console.log(token_anterior === this.token);
    }catch(error){
        console.log(error);
    }

}

const User = mongoose.model<UserInterface>('User',UserSchema);

export default User;