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
router.post('/save', crud.save);
router.post('/update', crud.update);






module.exports = router;