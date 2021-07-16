const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Hacer que las respuestas de mongoose sean promesas
const slug = require('slug'); // Paquete para generar las URL
const shortid = require('shortid'); // Paquete para generar un ID

const vacantesSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: 'El nombre de la vacante es obligatorio',
        trim: true // Quita los espacios en blanco por la izquierda y derecha de un String
    },
    empresa: {
        type: String,
        trim: true
    },
    ubicacion: {
        type: String,
        trim: true,
        required: 'La ubicación es obligatoria'
    },
    salario: {
        type: String,
        default: 0,
        trim: true
    },
    contrato: {
        type: String
    },
    descripcion: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        lowercase: true // Hacer el String en minúsculas
    },
    skills: [String],
    candidatos: [{
        nombre: String,
        email: String,
        cv: String
    }]
});

vacantesSchema.pre('save', function(next) {
    // Crear URL
    const url = slug(this.titulo);
    this.url = `${url}-${shortid.generate()}`;

    next();
});

module.exports = mongoose.model('Vacante', vacantesSchema);