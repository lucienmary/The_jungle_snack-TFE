// Toutes les fonctions du jeu.
// ----------------------------
    // Vérification joueurs,
    // Prépa. avant lancer partie,
    // Déroulement partie,
    // Fin de partie et retour salon.


// Require.

module.exports = {
    gameSettings: (playerList, idGame, io, socket) => {
        var io = io;

        const GAME_CONFIG = {coins: 50, bank: 0, color:['blue', 'red', 'yellow', 'green'], position: [1, 6, 11, 16]};
        const BANKGOALS = 100;
        const BOARD = 20;
        const BOXES = {chance: [5, 10, 15, 20], money: [3, 8, 13, 18], resources: [1, 6, 11, 16], attack: [9, 19], bank: [7, 17], benefit: [2, 12]};

        var player = [];
        var nextPlayer;
        var cptPlayer = 0;


        // Modification des players pour accueillir infos de jeu.
        var j = 0;
        playerList.forEach(element => {
            element.coins = GAME_CONFIG.coins;
            element.color = GAME_CONFIG.color[j];
            element.bank = GAME_CONFIG.bank;
            element.position = GAME_CONFIG.position[j];
            element.cards = {bread: false, meat: false, salad: false, sauce: false};
            element.chance = '';
            element.win = false;
            j++;
        });
        player = playerList;

        // Utilisation des rooms socket.io. (id de la room unique(idGame) passée par l'url).
        io.of('/A'+idGame).on('connection', (socket) => {

            // Msg. signaler bien connecté.
            socket.on('fine', (callback) => {
                console.log('\x1b[36m%s\x1b[0m\x1b[41m%s\x1b[0m', '/////)> ','Game successfully connected to the server.');
                callback({msg: 'Game successfully connected to the server.'})
            })

            // Si - de 2 joueurs (erreur de redirection ou autre, partie annulée).
            if (playerList.length < 2) {
                socket.emit('errorSocketIo', 410);
            }

            // Envoi liste de joueur à chaque connexion/modif.
            io.of('/A'+idGame).to(socket.id).emit('player', player);

            // Récup. socketId joueur.
            io.of('/A'+idGame).to(socket.id).emit('recupId', player);
            socket.on('idSocket', (id, newSocketId) => {
                playerList.forEach(element => {
                    if (element.id == id && element.socketId != newSocketId) {
                        element.socketId = newSocketId;
                        cptPlayer++;

                        if (cptPlayer === player.length) {
                            var num = Math.floor(Math.random() * Math.floor(player.length));

                            nextPlayer = num;
                            io.of('/A'+idGame).to(player[num].socketId).emit('play');
                        }
                    }
                })
            })


            function thimble(max){
                var nb = Math.floor(Math.random() * Math.floor(max)+1);
                console.log('Dé: ' +nb);
                return nb;
            }
            function win(num) {
                if (player[num].cards.bread === true && player[num].cards.meat === true && player[num].cards.salad === true && player[num].cards.sauce === true && player[num].bank === BANKGOALS) {
                    return true;
                }else{
                    return false;
                }
            }

            socket.on('goTurn', () => {
                play(nextPlayer);
            })

            function play(num) {
                // console.log(player.length);
                console.log(player[num].id +' | '+num);

                io.of('/A'+idGame).to(player[num].socketId).emit('yourTurn', true);

                socket.on('thimble', (ok) => {
                    console.log('Dé lancé: '+ ok);
                    var responseThimble = thimble(5);

                    io.of('/A'+idGame).emit('responseThimble', responseThimble);

                    // Nouvelle position.
                    if (player[num].position + responseThimble <= BOARD) {
                        player[num].position = player[num].position + responseThimble;
                    }else {
                        var totalBoxes = player[num].position + responseThimble;
                        player[num].position = totalBoxes - BOARD;
                    }

                    // Savoir sur quelle case on est.
                    if (player[num].position === BOXES.chance[0] || player[num].position === BOXES.chance[1] || player[num].position === BOXES.chance[2] || player[num].position === BOXES.chance[3]) {
                        console.log('Chance');
                    }else if (player[num].position === BOXES.money[0] || player[num].position === BOXES.money[1] || player[num].position === BOXES.money[2] || player[num].position === BOXES.money[3]) {
                        console.log('Money');
                    }else if (player[num].position === BOXES.resources[0] || player[num].position === BOXES.resources[1] || player[num].position === BOXES.resources[2] || player[num].position === BOXES.resources[3]) {
                        console.log('Resources');
                    }else if (player[num].position === BOXES.attack[0] || player[num].position === BOXES.attack[1]) {
                        console.log('Attack');
                    }else if (player[num].position === BOXES.bank[0] || player[num].position === BOXES.bank[1]) {
                        console.log('bank');
                    }else if (player[num].position === BOXES.benefit[0] || player[num].position === BOXES.benefit[1]) {
                        console.log('benefit');
                    }

                    player[num].win = win(num);
                    if (player[num].win === true) {
                        console.log('The winner is: '+player[num].username);
                    }

                    io.of('/A'+idGame).to(player[num].socketId).emit('down');

                    if (num+1 == player.length) {
                        num = 0;

                    }else {
                        num++;
                    }

                    console.log('---------');

                    io.of('/A'+idGame).emit('player', player);

                    nextPlayer = num;
                    io.of('/A'+idGame).to(player[num].socketId).emit('play');
                })

            }


        }) // Fin connection.
    }
}
