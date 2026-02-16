'use strict';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { corsOptions } from './cors-configuration.js'; 
import { dbConnection } from './db.js';
import { helmetConfiguration } from './helmet-configuration.js';
import { requestLimit } from '../middlewares/request-limit.js';
import { errorHandler } from '../middlewares/handle-errors.js';

//Rutas
const BASE_URL = '/Kinalbook/v1';

const middleware = (app) => {
    app.use(helmet(helmetConfiguration));
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(requestLimit);
    app.use(morgan('dev'));
}

//rutas modulos
const routes = (app) => {

}

const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3001;

    try {
        await dbConnection();
        middleware(app);
        
        // Las rutas deben cargarse ANTES que el manejador de errores
        //routes(app);

        // El manejador de errores siempre debe ir al final
        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
}

export { initServer };