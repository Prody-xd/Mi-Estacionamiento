const conexion = require('../database/db');

exports.save = (req, res)=>{
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const rut_cliente = req.body.rut_cliente;
    const edad = req.body.edad;
    const direccion = req.body.direccion;
    const comuna = req.body.comuna;
    const banco_cliente = req.body.banco_cliente;
    const tarjeta_de_credito = req.body.tarjeta_de_credito;
    conexion.query('INSERT INTO cliente SET ?',{nombres:nombres, apellidos:apellidos, rut_cliente:rut_cliente, edad:edad, direccion:direccion, comuna:comuna, banco_cliente:banco_cliente, tarjeta_de_credito:tarjeta_de_credito}, (error, results)=>{
        if(error){
            console.log(error);   
        }else{
            res.redirect('/');
        }
    })
}

exports.update = (req, res)=>{
    const id_cliente = req.body.id_cliente;
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const rut_cliente = req.body.rut_cliente;
    const edad = req.body.edad;
    const direccion = req.body.direccion;
    const comuna = req.body.comuna;
    const banco_cliente = req.body.banco_cliente;
    const tarjeta_de_credito = req.body.tarjeta_de_credito;


    conexion.query('UPDATE cliente SET ? WHERE id_cliente = ?',[{nombres:nombres, apellidos:apellidos, rut_cliente:rut_cliente, edad:edad, direccion:direccion, comuna:comuna, banco_cliente:banco_cliente, tarjeta_de_credito:tarjeta_de_credito}, id_cliente], (error, results)=>{
        if(error){
            console.log(error);   
        }else{
            res.redirect('/');
        }  
    })
}

