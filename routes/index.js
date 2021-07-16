const { Router} = require('express');

const {
    mostrarTrabajos
} = require('../controllers/homeController');

const { 
    formCrearCuetna,
    crearUsuario,
    validarRegistro
} = require('../controllers/usuariosController');

const {
    nuevaVacante,
    agregarVacante,
    mostrarVacante,
    formEditarVacante,
    editarVacante
} = require('../controllers/vacantesController');

const router = Router();

router.get('/', mostrarTrabajos);
router.get('/vacantes/nueva', nuevaVacante);
router.post('/vacantes/nueva', agregarVacante);

// Mostrar vacante
router.get('/vacantes/:url', mostrarVacante)

// Editar vacante
router.get('/vacantes/editar/:url', formEditarVacante);
router.post('/vacantes/editar/:url', editarVacante);

// Crear cuentas
router.get('/crear-cuenta', formCrearCuetna);
router.post('/crear-cuenta', 
    validarRegistro,
crearUsuario);

module.exports = router;