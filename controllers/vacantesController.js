const Vacante = require('../models/Vacantes');

const nuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        nombrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y pública tu vacante'
    });
}

const agregarVacante = async(req, res) => {

    const vacante = new Vacante(req.body);

    // Crear arreglo de skills
    vacante.skills = req.body.skills.split(',');

    // Almacenar en la BD
    const nuevaVacante = await vacante.save();

    // Redireccionar
    res.redirect(`/vacantes/${nuevaVacante.url}`);

}

const mostrarVacante = async(req, res, next) => {

    const vacante = await Vacante.findOne({ url: req.params.url}).lean(); // .lean() permite mostrar los datos en handlebars

    // si no hay resultados
    if(!vacante) return next();

    res.render('vacante', {
        vacante,
        nombrePagina: vacante.titulo,
        barra: true
    })
}

const formEditarVacante = async(req, res, next) => {

    const vacante = await Vacante.findOne({ url: req.params.url}).lean(); // .lean() permite mostrar los datos en handlebars

    if(!vacante) return next();

    res.render('editar-vacante', {
        vacante,
        nombrePagina: `Editar - ${vacante.titulo}`
    });
}

const editarVacante = async(req, res) => {

    const vacanteActualizada = req.body;
    vacanteActualizada.skills = req.body.skills.split(','); // convertir string de los skills a array

    // Actualizar cambios
    const vacante = await Vacante.findOneAndUpdate({url: req.params.url}, 
        vacanteActualizada, {
            new: true,
            runValidators: true
    } );

    // Redirigir
    res.redirect(`/vacantes/${vacante.url}`);

}

module.exports = {
    nuevaVacante,
    agregarVacante,
    mostrarVacante,
    formEditarVacante,
    editarVacante
}