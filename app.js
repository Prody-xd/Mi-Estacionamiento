const express = require('express');
const { json } = require('express/lib/response');
const app = express();

//1- Seteamos  urlencoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(express(json));

//2- Invocamos dotenv
const dotenv = require('dotenv');
dotenv.config({path:'.env/.env'})

//3- directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//4- establecemos el motor  de plantillas ejs
app.set('view engine', 'ejs');

//5- invocamos bcryptjs
const bcryptjs = require('bcryptjs');

//6- Var.session
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized:true
}));

//7- invocamos modulo de conexion a la BD
const conecction = require ('./database/db')


console.log(__dirname);
app.use('/', require('./router'));

app.listen(5000,  ()=>{
    console.log('SERVER corriendo en http://localhost:5000');
});
app.get('/mapa', function (req, res) {
    res.render('mapa');
  })
