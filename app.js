// Imports
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var apiRouter = require('./apiRouter').router;
var gameCtrl = require('./routes/gameCtrl');
var favicon = require('serve-favicon');
const methodOverride = require('method-override');

const NB_TO_START = 2;
const SECOND_TO_START = 20;

var idGame = 0;

// Instantiate server
var server = express();

// distribution des fichiers statics.
server.use(express.static('public'));

// Pour utiliser '_method' ds les headers de req. (pour avoir PUT et DELETE)(ex.: pour modif du profil).
server.use(methodOverride('_method'));

server.use(favicon(path.join(__dirname + '/public/assets/images/favicon.ico')))

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
listen = server.listen(80, function(){
    console.log('Serveur en écoute 🔥');
})

// Socket.io
// ---------
var playerList = [];

const Server = require('socket.io');
const io = new Server(listen);


var gameFunctions = require('./gameFunctions');

io.on('connect', (socket) => {
    io.sockets.emit('displayPlayers', {playerList: playerList});

    var pawnChoice = 'flamingo';
    socket.on('pawnChoice', (data) => {
        pawnChoice = data;

         if (typeof(socket.newUser)!="undefined") {
            socket.newUser.pawn = pawnChoice;
            io.sockets.emit('displayPlayers', {playerList: playerList});
        }
    })

    socket.on('enterPlayerList', (data) => {
        socket.newUser = {id: data.id, username: data.username, score: data.score, img: data.img, socketId: socket.id, pawn: pawnChoice};


        if (playerList.find(double => double.id === socket.newUser.id)) {
            socket.emit('errorSocketIo', 401);

        }else{
            playerList.push(socket.newUser);
            io.sockets.emit('displayPlayers', {playerList: playerList});

        }

        if (playerList.length === NB_TO_START) {
            startTimer(true);
        }
    })

    socket.on('exitPlayerList', (data) => {
        if (playerList.find(forDelete => forDelete.id === data.id)) {
            for (var i = 0; i < playerList.length; i++) {
                if (playerList[i].id === data.id) {
                    playerList = playerList.filter(item => item !== playerList[i]);
                    io.sockets.emit('displayPlayers', {playerList: playerList});
                }
            }
        }else{
            socket.emit('errorSocketIo', 500);
        }

        if (playerList.length < NB_TO_START) {
            startTimer(false);
        }
    })

    socket.on('disconnect', (data) => {
        var cookieId = socket.request.headers.cookie.split('myId=');
        var myId = cookieId[1].slice(0,2);

        if (playerList.find(forDelete => forDelete.id == myId)) {
            for (var i = 0; i < playerList.length; i++) {
                if (playerList[i].id == myId) {
                    playerList = playerList.filter(item => item !== playerList[i]);
                    io.sockets.emit('displayPlayers', {playerList: playerList});
                }
            }
        }else{
            socket.emit('errorSocketIo', 500);
        }

        if (playerList.length < 2) {
            startTimer(false);
        }
    });




    // Timer.

    // TODO: Modif stopTimer(); (Si pas dernier joueur à rejoindre se déco. timer ne se stop pas.)

    var secondInterval;

    function startTimer(boo){

        if (boo === true) {
            time = SECOND_TO_START;
            io.sockets.emit('timerForStart', true, SECOND_TO_START);
            secondInterval = setInterval(function(){
                time--;
                if (time === 0) {
                    startTJS();
                    clearInterval(secondInterval);
                }
            }, 1000);
        }else{
            io.sockets.emit('timerForStart', false, SECOND_TO_START);
            clearInterval(secondInterval);
        }
    }

    socket.on('stopTime', () => {
        clearInterval(secondInterval);
    })

    // Go Jouer!
    function startTJS(){
        gameFunctions.gameSettings(playerList, idGame, io, socket);
        for (var i = 0; i < playerList.length; i++) {
            io.to(playerList[i].socketId).emit('start', '/jeu/partie?id=A'+idGame);

        }
        playerList = [];
        idGame++;
    };

})
