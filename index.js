import express, { application } from 'express';
import session from 'express-session';
import bycrypt from 'bcrypt';
import 'dotenv/config';

const app = express();


app.use(session({

     // secret key da sessão
     secret: process.env.SECRET_SESSION,

     // forçar a sessão a ser salva em cada requisição
     resave: true,  

     // forçar uma sessão não inicializada a ser salva em armazenamento
     saveUninitialized: false,

     cookie: {
          // tempo de vida da sessão
          maxAge: 10000, // 1 minuto
     }
}));

app.get('/', (req, res) => {
    //req.session.key = 'value';
    req.session.name = 'John Doe';
    console.log(req.sessionID);
    return res.send('Session created');
});

app.get('/session', (req, res) => {
     console.log(req.session);    
     if (req.session.views) {
          req.session.views++;
          res.write(
               `
                    <p>Nome: ${req.session.name}</p>
                    <p>Views: ${req.session.views}</p>
                    <p>Expires in: ${req.session.cookie.maxAge / 1000} segundos</p>
               `
          );

          res.end();
     } else {
          req.session.views = 1;
          return res.send('Seja bem-vindo a sua primeira visita!');
     }
});

app.get('/session/delete', (req, res) => {
     // para destruir uma sessão
     req.session.destroy((err) => {
          if (err) return res.send('Error destroying session');

          return res.send('Session destroyed');
     });
});


app.listen(3000);