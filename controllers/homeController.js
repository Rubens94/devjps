const Vacante = require('../models/Vacantes');


const mostrarTrabajos = async(req, res, next) => {

    const vacantes = await Vacante.find().lean(); // .lean permite mostrar los vacantes en la parte de handlebars

    if (!vacantes) return next();

    res.render('home', {
        nombrePagina: 'devJobs',
        tagline: 'Encuentra y Pública Trabajos para Desarrolladores Web',
        barra: true,
        boton: true,
        vacantes
    });
}

module.exports = {
    mostrarTrabajos
}