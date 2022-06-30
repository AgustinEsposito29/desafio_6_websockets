import express, { json, urlencoded } from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import router from './routes.js';

const PUERTO = process.env.PORT || 8080;

//Instanciamos servidores
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//Seteamos motor de Plantilla
app.set('views', './views');
app.set('view engine', 'pug');


//Middlewares
app.use(json())
app.use(urlencoded({extended: true}))
app.use(router);

// Servicio Estatico
app.use(express.static('./public'))

// Manejo de errors
app.use((err, req, res, next) =>{
    res.status(500).send({
        message: err.message
    })
    next(err);
})

//Levantamos Servidor
httpServer.listen(PUERTO, ()=>{
    console.log(`Servidor Escuchando en el puerto: ${PUERTO}`);
})

httpServer.on('error', (e)=>{
    console.log('Error en el servidor!');
})

// WebSockets
const messages = []
//Evento que recibe cualquier coenexion al servidor socket
io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    //Eviamos todos los mensajes 
    socket.emit('mensajes', messages);

    //Recibimos nuevo mensaje
    socket.on('nuevoMensaje', (data)=>{
        //Enviamos mensajes al arreglo
        messages.push(data);

        // Enviamos todos los datos de nuevo
        io.sockets.emit('mensajes', messages);
    })
});

