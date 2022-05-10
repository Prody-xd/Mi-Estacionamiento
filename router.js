const express = require('express');
const router = express.Router();

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

const crud = require('./controllers/crud');
router.post('/save', crud.save)

//Ruta de editar  registros

router.get('/edit/id', (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM users where id=?'[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('edit', {user:results[0]});
        }
    })
})

module.exports = router;