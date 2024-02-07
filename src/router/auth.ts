import jwt,{ JwtPayload} from "jsonwebtoken";

export const auth = (req: any, res: any, next: any) =>{
    try{
        const token = req.headers.authorization?.split(' ')[1].trim();
        const payload = jwt.verify(token, process.env.SECRET_KEY||'');
        req.user = payload;
        next();
    }catch(error){
        if(error instanceof jwt.TokenExpiredError){
            return res.status(401).json({error:'token expirado'});
        }
        return res.status(401).json({error: 'token inválido'});
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


