import express,{Request, Response, NextFunction} from 'express';
import path from 'path';
import jwt,{ JwtPayload } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

dotenv.config({path:path.join(__dirname,".env")}); // carregar váriaveis de ambiente

const app = express();
const port = 3000;

// Configurar a view engine para EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar Cookies
app.use(cookieParser());


const payload = {
  id:82364723424,
  name:"David Eduardo",
  email:"test@gmail.com",
  senha:"123456"
}

function middlewareAdicionarTokenNaReq(req: Request, res: Response, next: NextFunction){
  const token = jwt.sign(payload, process.env.SECRET_KEY as string,{expiresIn: 3600});
  req.headers.authorization = token;
  //console.log(`Middleware criou o token "${token}" e adicionou na requisição --> req.headers.authorization: ${token}`)
  return next();
}

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
app.get('/login',(req,res, next)=>{ // Criar Cookie e redirecionar pra "/"
  const token = jwt.sign(payload, process.env.SECRET_KEY||'',{expiresIn: 3600});
  res.cookie('authToken',token);
  return res.redirect('/');
})
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
  
  res.render('pages/home', { website,user:req.user , title: 'Titulo: Express com TypeScript' , message: `Body: Express com Typescript`});
  
  
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
