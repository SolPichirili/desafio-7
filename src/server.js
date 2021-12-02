const express = require('express');
const { Server: SocketServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const fakerProducts = require ('../public/js/products');

const { getMessages, saveMessages } = require('./models/messages');

const server = express();
const httpServer = new HttpServer(server);
const io = new SocketServer(httpServer);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(express.static('public'));

server.set('view engine', 'ejs');

let port = process.env.PORT || 8080;

io.on('connection', async (socket) => {
    console.log('Nuevo usuario conectado.');

    const messages = await getMessages();
    socket.emit('messages', messages);

    socket.on('new-message', async (message) => {
        await saveMessages(message);
        const messages = await getMessages();

        io.sockets.emit('messages', messages);
    });
});

server.get('/', (req, res) => {
    res.render('../views/pages/index.ejs');
});

server.get('/api/productos-test', (req, res)=>{
    const products = fakerProducts;
    res.render('../views/pages/products.ejs', {
        productos: products
    });
});

const app = httpServer.listen(port, () => {
    console.log(`Servidor corriendo en ${port}`);
});

app.on('error', (error) => {
    console.log(`Error: ${error}`);
});