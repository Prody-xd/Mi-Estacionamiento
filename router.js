const express = require('express');
const router = express.Router();
const app = express();

const conexion = require('./database/db');

//MOSTRAR todos los Registros
router.get('/', (req, res)=>{
    
     conexion.query('SELECT * FROM cliente', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('index', {results:results});
        }
    })  
})


//Ruta para crear registros
router.get('/create', (req, res)=>{
    res.render('create');
})
// ruta para home
router.get('/home', (req, res)=>{
    res.render('indexhome');
})

//Ruta de editar registros

router.get('/edit/:id_cliente', (req, res)=>{
    const id_cliente = req.params.id_cliente;
    conexion.query('SELECT * FROM cliente WHERE id_cliente=?',[id_cliente], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('edit', {user:results[0]});
        }
    })
})

const crud = require('./controllers/crud');
const bcryptjs = require('bcryptjs');
const Connection = require('mysql/lib/Connection');
router.post('/save', crud.save);
router.post('/update', crud.update);


//8- estableciendo las rutas
router.get('/log', (req, res)=>{
    res.render('indexlogin', {msg:'ESTO ES UN MENSAJE DESDE NODE'});
})

router.get('/login', (req, res)=>{
    res.render('login');
})

router.get('/register', (req, res)=>{
    res.render('register');
})

router.post('/register', async (req, res)=>{
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    conexion.query('INSERT INTO users SET ?', {user:user, name:name, rol:rol, pass:passwordHaash}, async(error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.render('register',{
                alert: true,
                alertTitle: "Registration",
                alertMessage: "¡Sucessful Registration!",   
                alertIcon: 'success',
                showConfirmButton:false,
                timer:1500,
                ruta:''
            })
                
        }
    })

})

router.post('/auth', async (req, res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    if(user && pass){
        conexion.query('SELECT * FROM users WHERE user = ?', [user], async (error, results)=>{
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                res.send('login',{
                    alet:true,
                    aletTitle: "Error",
                    alertMessage: "Usuario y/o password incorrectas",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer:false,
                    ruta:'login'
                });
            }else{
                req.session.name = results[0].name
                res.send('login',{
                    alet:true,
                    aletTitle: "Conexion Exitosa",
                    alertMessage: "¡Login Correcto!",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer:1500,
                    ruta:''
                });
            }
        })
    }else{
        res.send('login',{
            alet:true,
            aletTitle: "Advertencia",
            alertMessage: "¡Por Favor ingrese un usuario y/o contraseña!",
            alertIcon: "warning",
            showConfirmButton: true,
            timer:1500,
            ruta:'login'
        });
    }
})


module.exports = router;