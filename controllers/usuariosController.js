const { response } = require("express");
const Usuarios = require('../models/Usuario');
const {
    body,
    validationResult
} = require('express-validator');

const formCrearCuetna = (req, res = response) => {

    res.render('crear-cuenta', {
        nombrePagina: 'Crear tu cuenta en DevJobs',
        tagline: 'Comienza a publixxar tus vacantes gratis, solo debes crear una cuenta'
    });


}

const crearUsuario = async(req, res = response, next) => {

    // crear el usuario
    const usuario = new Usuarios(req.body);
    console.log(usuario);

    try{
        await usuario.save();
        res.redirect('/iniciar-sesion');
    }catch (error){
        req.flash('error', error);
        res.redirect('/crear-cuenta');
    }

}

const validarRegistro = async(req, res, next) => {

    //sanitizar los campos
    const rules = [
        body('nombre').not().isEmpty().withMessage('El nombre es obligatorio').escape(),
        body('email').isEmail().withMessage('El email es obligatorio').normalizeEmail(),
        body('password').not().isEmpty().withMessage('El password es obligatorio').escape(),
        body('confirmar').not().isEmpty().withMessage('Confirmar password es obligatorio').escape(),
        body('confirmar').equals(req.body.password).withMessage('Los passwords no son iguales')
    ];
 
    await Promise.all(rules.map(validation => validation.run(req)));
    const errores = validationResult(req);
    //console.log(errores); // ver errores en consola
    //si hay errores
    if (!errores.isEmpty()) {
        req.flash('error', errores.array().map(error => error.msg));
        res.render('crear-cuenta', {
            nombrePagina: 'Crea una cuenta en Devjobs',
            tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
            mensajes: req.flash()
        });
        return;
    }
 
    //si toda la validacion es correcta
    next();
}

module.exports = {
    formCrearCuetna,
    crearUsuario,
    validarRegistro
}