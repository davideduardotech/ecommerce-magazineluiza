import mongoose, {Document, Schema} from "mongoose";
import jwt from 'jsonwebtoken'

export interface UserInterface extends Document{
    name: string,
    email: string,
    senha: string,
    token: string
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

const UserModel = mongoose.model<UserInterface>('User',UserSchema);

export default UserModel;