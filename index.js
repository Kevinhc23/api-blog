import express from 'express';
import cors from 'cors';
import connect from './src/database/connect.js';
import Router from './src/routes/routes.js';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import path from 'path';

connect();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar los cuerpos de las solicitudes codificados en URL
app.use(cors());

// Middleware para subir archivos
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


app.use(morgan('dev'));
app.use('/api', Router);



const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'src', 'page')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'page', 'index.html'));
});






app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}!!!`);
});

