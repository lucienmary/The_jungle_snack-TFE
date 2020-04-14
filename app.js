// Imports
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var apiRouter = require('./apiRouter').router;
var gameCtrl = require('./routes/gameCtrl');

// Instantiate server
var server = express();

// distribution des fichiers statics.
server.use(express.static('public'));

// Body Parser config.
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());


// Configuration des routes.
server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).sendFile(path.join(__dirname + '/public/'));
})
.get('/contact', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).sendFile(path.join(__dirname + '/public/contact.html'));
})
.get('/regles', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).sendFile(path.join(__dirname + '/public/tuto.html'));
})
.get('/vie-privee', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).sendFile(path.join(__dirname + '/public/vie-privee.html'));
})
.get('/register', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).sendFile(path.join(__dirname + '/public/register.html'));
})
.get('/login', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).sendFile(path.join(__dirname + '/public/login.html'));
})


// .get('/jeu/salon', gameCtrl.playerProfile)
.get('/jeu/salon', function(req, res) {
    // res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname + '/public/salon.html'));
})
.get('/jeu/settings', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).sendFile(path.join(__dirname + '/public/settings.html'));
})
.get('/jeu/profil', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).sendFile(path.join(__dirname + '/public/profil.html'));
})
.get('/jeu/partie', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).sendFile(path.join(__dirname + '/public/partie.html'));
})

// // Redirection homepage.
// .get('/projets/tfe/mvp', function(req, res) {
//     res.status(200).redirect("/");
// })

server.use('/api/', apiRouter);



// Launch server.
listen = server.listen(8080, function(){
    console.log('Serveur en écoute 🔥');
})

// Socket.io
// ---------
var playerList = [];

const io = require('socket.io')(listen);

io.on('connect', (socket) => {

    socket.on('enterPlayerList', (data) => {
        socket.newUser = {id: data.id, username: data.username, score: data.score, img: data.img };

        if (playerList.find(double => double.id === socket.newUser.id)) {
            socket.emit('errorSocketIo', 401);

        }else{
            playerList.push(socket.newUser);
            io.sockets.emit('displayPlayers', {playerList: playerList});

        }
    })

    socket.on('exitPlayerList', (data) => {
        // delete playerList["id-"+data.id];
    })
})
