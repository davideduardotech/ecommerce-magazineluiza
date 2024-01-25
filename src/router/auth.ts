import jwt,{ JwtPayload} from "jsonwebtoken";

export const auth = (req: any, res: any, next: any) =>{
    const token = req.headers.authorization;
    if(!token) return res.status(404).json({error: 'token não encontrado'});
    
    
    try{
        const tokenWithoutBearer = token.replace('Bearer','').trim();
        const payload = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY||'');
        req.user = payload;
        next();
    }catch(error){
        return res.status(500).json({erro: 'token inválido'});
    }
} 

export const authWithCookie = (req: any, res:any, next: any) => {
    try{
        const {authToken} = req.cookies;
        if(!authToken){
            return next();
        }
        const payload = jwt.verify(authToken,process.env.SECRET_KEY||'');
        req.user = payload;
        next();
    }catch(error){
        console.log(`@authWithCookie error:`,error);
        next();
    }
}


