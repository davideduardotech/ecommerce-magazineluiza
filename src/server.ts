import express,{Request, Response, NextFunction} from 'express';
import path from 'path';
import jwt,{ JwtPayload } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bodyParser, { json } from 'body-parser';
import fs from 'fs';
import mongoose, { ConnectOptions } from 'mongoose';
import multer from 'multer';
import * as dotenv from 'dotenv';
import {body, validationResult } from 'express-validator';

import User from './model/user';

// modelo 
import { ProdutoModel } from './model/produto';

dotenv.config({path:path.join(__dirname,".env")}); // carregar váriaveis de ambiente

const app = express();
const port = 3000;

// CODDING: Configurar a view engine para EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// CODDING:  Configurar arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// CODDING:  Configurar Cookies
app.use(cookieParser());

// CODDING: Configurar Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CODDING: Configuração do Multer
const storage = multer.diskStorage({
  destination: function(req,file, callback){
    callback(null,'src/public/img/uploads');
  },
  filename: function(req, file, callback){
    console.log('@filename informações do arquivo:',file);
    const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()*1E6) 
    const fileExtension = path.extname(file.originalname);
    callback(null,file.fieldname+'-'+uniqueSuffix+fileExtension);
  }
});

function fileFilter(req:any, file:any,callback:any){
  if (!file.originalname.match(/\.(jpg|jpeg|png|webp|svg)$/)) {
    return callback(new Error('Apenas arquivos de imagem são permitidos!'), false);
  }
  callback(null, true);
}

const upload = multer({ storage: storage,
fileFilter: fileFilter});

// CODDING: Configurar Rotas
import appRouter from './router';
app.use('/',appRouter);



// CODDING: Configurar Banco de Dados | MongoDB
mongoose.connect(process.env.MONGODB_URI||"", { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => {
    console.log('MongoDB conectado');
  })
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

function authJWTWithCookie(req:any, res:any, next:any){
  try{
    const token = req.cookies.authToken;
    if(token){
      const payload = jwt.verify(token,process.env.SECRET_KEY||'');
      req.user = payload;
      next();
    }else{
      return res.status(401).json({message:`não autorizado, realize login pra acessar essa rota`});
    }
  }catch(error){
    return res.status(500).json({error:`${error}`});
  }
}


app.get('/comprar/produto/:id_produto',authJWTWithCookie, async (req:any, res:any, next: any) => {
  try{
    const {id_produto} = req.params;
    
    // verificar ObjectID do produto
    if(!mongoose.Types.ObjectId.isValid(id_produto)) return res.status(401).json({error:`Indentificação do produto inválida.`});

    // procurar produto no MongoDB
    const produtoMongoDB = await ProdutoModel.findById(new mongoose.Types.ObjectId(id_produto));
    if(!produtoMongoDB) return res.status(404).json({error:`produto não encontrado`});

    console.log(`produtoMongoDB:`,produtoMongoDB);
    

    return res.render('pages/purchase/purchase',{user:req.user,produto:produtoMongoDB});
  }catch(error){
    console.log(error);
    return res.status(500).json({error:'ocorreu um erro'});
  }
});

interface RequestInterface extends Request{
  user?: JwtPayload;
}

function auth(req: RequestInterface, res: Response, next: NextFunction){
  const token = req.cookies.authToken;
  console.log('token:',token);
  const secretKey = process.env.SECRET_KEY;
  if(!token){
    console.log('token não encontrado na authenticação');
    return next(); // chamar proximo middleware
  }

  try{
    const decoded = jwt.verify(token||"",secretKey||"") as JwtPayload;
    req.user = decoded;
    return next(); // chamar proximo middleware
  }catch(error){
    if(error instanceof jwt.JsonWebTokenError){
      console.log('token inválido');
      return next(); // chamar proximo middleware
    }

    if(error instanceof jwt.TokenExpiredError){
      console.log('token expirado');
      return next(); // chamar proximo middleware
    }

    console.log(`Erro na autenticação | ${error instanceof Error ? error.message : "erro desconhecido"}`);
  }
}

app.get('/logout',(req,res,next)=>{
  res.clearCookie('authToken');
  return res.redirect('/')
})
app.get('/login', async (req, res, next) => {
  // CODDING: Criar Token
  const user = await User.findOne({email:'teste@gmail.com'});
  await user.refreshToken();
  const token = user.token;
  res.cookie('authToken', token);
  
  const payload = jwt.verify(token,process.env.SECRET_KEY||'');
  console.log(`payload:`,payload);

  console.log("/login req.cookies:",req.cookies);
  
  // CODDING: Redirecionamento
  const { redirect } = req.query;
  const redirectPath = redirect || '/';
  
  return res.redirect(`${redirectPath}`);

});
app.get('/',auth,(req: RequestInterface, res) => {
  // website.navbar.desktop.menu["mouse over with expanding"][0].expanding
  // website.navbar.desktop.menu["mouse over with expanding"][0].icon.fontawesome
  // website.navbar.desktop.menu["mouse over with expanding"][0]
  // website.navbar.desktop.menu.dropdown[0].icon.fontawesome.size
  
  const website = {
    navbar:{
      desktop:{
        logo:"",
        menu:{
          "mouse over with expanding":[
            {
              label:"Todos os Departamentos",
              icon:{
                name:"fa-solid fa-bars",
                size:"text-[25px]"
              },
              expanded:{
                  "coluna 1":[
                    {label:"Ar e Ventilação",href:"/"},
                    {label:"Artesanato",href:"/"},
                    {label:"Artigos de Festa",href:"/"},
                    {label:"Áudio",href:"/"},
                  ],
                  "coluna 2":[
                    {label:"Decoração",href:"/"},
                    {label:"Eletrodomésticos",href:"/"},
                    {label:"Eletroportáteis",href:"/"},
                    {label:"Esporte e Lazer",href:"/"},
                  ],
                  "coluna 3":[
                    {label:"Pet Shop",href:"/"},
                    {label:"Religião e Espiritualidade",href:"/"},
                    {label:"Relógios",href:"/"},
                    {label:"Saúde e Cuidados Pessoais",href:"/"},
                  ]
                },
              
            },
            {
              label:"Ofertas do Dia",
              expanded:{
                  "coluna 1":[
                    {label:"Ar e Ventilação",href:"/"},
                    {label:"Artesanato",href:"/"},
                    {label:"Artigos de Festa",href:"/"},
                    {label:"Áudio",href:"/"},
                  ],
                  "coluna 2":[
                    {label:"Decoração",href:"/"},
                    {label:"Eletrodomésticos",href:"/"},
                    {label:"Eletroportáteis",href:"/"},
                    {label:"Esporte e Lazer",href:"/"},
                  ],
                  "coluna 3":[
                    {label:"Pet Shop",href:"/"},
                    {label:"Religião e Espiritualidade",href:"/"},
                    {label:"Relógios",href:"/"},
                    {label:"Saúde e Cuidados Pessoais",href:"/"},
                  ]
                },
              
            },
            {
              label:"Celulares",
              expanded:{
                  "coluna 1":[
                    {label:"Ar e Ventilação",href:"/"},
                    {label:"Artesanato",href:"/"},
                    {label:"Artigos de Festa",href:"/"},
                    {label:"Áudio",href:"/"},
                  ]
                },
              
            },
            {
              label:"Móveis",
              expanded:{
                  "coluna 1":[
                    {label:"Ar e Ventilação",href:"/"},
                    {label:"Artesanato",href:"/"},
                    {label:"Artigos de Festa",href:"/"},
                    {label:"Áudio",href:"/"},
                  ]
              },
              
            },
            {
              label:"Eletrodomésticos",
              expanded:{
                  "coluna 1":[
                    {label:"Ar e Ventilação",href:"/"},
                    {label:"Artesanato",href:"/"},
                    {label:"Artigos de Festa",href:"/"},
                    {label:"Áudio",href:"/"},
                  ]
                },
            },
            {
              label:"TV e Vídeo",
              expanded:{
                  "coluna 1":[
                    {label:"Ar e Ventilação",href:"/"},
                    {label:"Artesanato",href:"/"},
                    {label:"Artigos de Festa",href:"/"},
                    {label:"Áudio",href:"/"},
                  ]
              },
            }
          ]
        },
        
      }
    }
  }
  const menuExpanding = [
    {
      label:"Todos os Departamentos",
      icon:{
        name:"fa-solid fa-bars",
        size:"text-[25px]"
      },
      expanded:{
          "coluna 1":[
            {label:"Ar e Ventilação",href:"/"},
            {label:"Artesanato",href:"/"},
            {label:"Artigos de Festa",href:"/"},
            {label:"Áudio",href:"/"},
          ],
          "coluna 2":[
            {label:"Decoração",href:"/"},
            {label:"Eletrodomésticos",href:"/"},
            {label:"Eletroportáteis",href:"/"},
            {label:"Esporte e Lazer",href:"/"},
          ],
          "coluna 3":[
            {label:"Pet Shop",href:"/"},
            {label:"Religião e Espiritualidade",href:"/"},
            {label:"Relógios",href:"/"},
            {label:"Saúde e Cuidados Pessoais",href:"/"},
          ]
        },
      
    },
    {
      label:"Ofertas do Dia",
      expanded:{
          "coluna 1":[
            {label:"Ar e Ventilação",href:"/"},
            {label:"Artesanato",href:"/"},
            {label:"Artigos de Festa",href:"/"},
            {label:"Áudio",href:"/"},
          ],
          "coluna 2":[
            {label:"Decoração",href:"/"},
            {label:"Eletrodomésticos",href:"/"},
            {label:"Eletroportáteis",href:"/"},
            {label:"Esporte e Lazer",href:"/"},
          ],
          "coluna 3":[
            {label:"Pet Shop",href:"/"},
            {label:"Religião e Espiritualidade",href:"/"},
            {label:"Relógios",href:"/"},
            {label:"Saúde e Cuidados Pessoais",href:"/"},
          ]
        },
      
    },
    {
      label:"Celulares",
      expanded:{
          "coluna 1":[
            {label:"Ar e Ventilação",href:"/"},
            {label:"Artesanato",href:"/"},
            {label:"Artigos de Festa",href:"/"},
            {label:"Áudio",href:"/"},
          ]
        },
      
    },
    {
      label:"Móveis",
      expanded:{
          "coluna 1":[
            {label:"Ar e Ventilação",href:"/"},
            {label:"Artesanato",href:"/"},
            {label:"Artigos de Festa",href:"/"},
            {label:"Áudio",href:"/"},
          ]
      },
      
    },
    {
      label:"Eletrodomésticos",
      expanded:{
          "coluna 1":[
            {label:"Ar e Ventilação",href:"/"},
            {label:"Artesanato",href:"/"},
            {label:"Artigos de Festa",href:"/"},
            {label:"Áudio",href:"/"},
          ]
        },
    },
    {
      label:"TV e Vídeo",
      expanded:{
          "coluna 1":[
            {label:"Ar e Ventilação",href:"/"},
            {label:"Artesanato",href:"/"},
            {label:"Artigos de Festa",href:"/"},
            {label:"Áudio",href:"/"},
          ]
      },
    }
  ] 
  
  res.render('pages/home/home', { website,menuExpanding,user:req.user , title: 'Titulo: Express com TypeScript' , message: `Body: Express com Typescript`});
  
  
});

// CODDING: Iniciar Aplicação
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
