import express from 'express';
import cors from 'cors';
import connect from './src/database/connect.js';
import Router from './src/routes/routes.js';
import morgan from 'morgan';

connect();

const app = express();
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar los cuerpos de las solicitudes codificados en URL
app.use(cors());

app.use(morgan('dev'));
app.use('/api', Router);

app.listen(3000, () => {
    console.log('Servidor ejecutándose en el puerto 3000');
});

