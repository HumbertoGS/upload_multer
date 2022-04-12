const express = require('express');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid');

//Inicializar
const app = express();

//Configuraciones
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//Middlewares
const storageMulter = multer.diskStorage({
    destination: path.join(__dirname,'public/upload'),
    filename: (req, file, callback)=>{
        callback(null, uuid.v4() + path.extname(file.originalname));
    }
});

app.use(multer({
    storage: storageMulter,
    dest: path.join(__dirname,'public/upload'),
    limits: {fileSize: 2000000},
    fileFilter:(req, file, callback)=>{
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimetype = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname));
        if(mimetype && extName){
            return callback(null, true);
        }
        callback("Error: Archivo debe de ser del tipo jpeg|jpg|png|gif");
    }
}).single('image'));

//Routes
app.use(require('./routes/index'));

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '/assets')));

//Puerto
app.listen(app.get('port'), ()=>{
    console.log(`Port in ${app.get('port')}`);
});