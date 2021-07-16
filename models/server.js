const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const flash = require('connect-flash')

const { dbConnection } = require('../database/config');
const { response } = require('express');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = createServer(this.app);

        this.paths = {
            inicio: '/',
            nueva: '/vacantes/nueva'
        }

        // Conectar a MongoDB
        this.conectarDB();
        
        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body 
        this.app.use( express.urlencoded({extended: true}) );

        // Habilitar handlebars como view
        this.app.engine('handlebars', 
        exphbs({
            defaultLayout: 'layout',
            helpers: require('../helpers/handlebars') // leer archivo de esa ruta
        }));

        this.app.set('view engine', 'handlebars');

        // Archivos estáticos
        this.app.use( express.static('public') );

        // Cookies
        this.app.use( cookieParser() );

        // Session
        this.app.use( session({
            secret: process.env.SECRETO,
            key: process.env.KEY,
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({mongoUrl: process.env.MONGO_DB})
        }));

        // Alertas y flash message
        this.app.use( flash() );
        
        // Almacenar mensajes flash
        this.app.use((req, res = response, next) => {
            res.locals.mensajes = req.flash();
            next();
        });
        
    }

    routes() {

        this.app.use( this.paths.inicio, require('../routes/index') );
        this.app.use( this.paths.nueva, require('../routes/index'));
    }

    listen() {

        this.server.listen( this.port, () => {
            console.log(`Server corriendo en el puerto ${this.port}`);
        });
    }

}

module.exports = Server;