// Toutes les fonctions du jeu.
// ----------------------------
    // Vérification joueurs,
    // Prépa. avant lancer partie,
    // Déroulement partie,
    // Fin de partie et retour salon.

    var usersCtrl = require('./routes/usersCtrl');


// Require.

module.exports = {
    gameSettings: (playerList, idGame, io, socket) => {
        var io = io;

        const GAME_CONFIG = {coins: 50, bank: 0, color:['blue', 'red', 'yellow', 'green'], position: [1, 6, 11, 16]};
        const BANKGOALS = 50;
        const BOARD = 20;
        const BOXES = {chance: [5, 10, 15, 20], money: [3, 8, 13, 18], resources: [1, 6, 11, 16], attack: [9, 19], bank: [7, 17], benefit: [2, 12], empty: [4, 14]};
        const RESOURCES = {bread: 1, meat: 6, salad: 11, sauce: 16};
        const RESOURCES_PRICE = 50;
        const MONEY = [50, 30, 15, 10, 80, 60, 50];
        const BENEFIT = 10; // En pourcent.
        const CHANCE = { giveForEveryone: [5, 15, 25], giveForOne: [30, 40, 50], getFromEveryone: [5, 15, 25], getFromOne: [30, 40, 50], makeLoseOrWin: [60, 40, 30]};
        const PLAYER_TIMEOUT = 1000*60; // Temps d'inactivité max.
        var turnTimeout;

        var player = [];
        var nextPlayer;
        var cptPlayer = 0;

        var viewPhaser = false;


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

                // Affiche la vue. (Cadre, nom, etc. qui n'est pas modifiable in game)
                io.of('/A'+idGame).to(socket.id).emit('view', player);

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
                            io.of('/A'+idGame).emit('infos', 4000, player[num].username + ' commence la partie.');

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
                if (player[num].cards.bread === true && player[num].cards.meat === true && player[num].cards.salad === true && player[num].cards.sauce === true) {
                    if (player[num].bank >= BANKGOALS) {
                        console.log('win: true');
                        return true;
                    }else {
                        console.log('win: middle false');
                        return false;
                    }
                }else{
                    console.log('win: false');
                    return false;
                }
            }
            function endScreen(winner) {
                io.of('/A'+idGame).emit('endScreen', winner);
                usersCtrl.score(winner);
            }

            socket.on('goTurn', () => {
                clearTimeout(turnTimeout);
                play(nextPlayer);
            })

            function play(num) {

                turnTimeout = setTimeout(function(){
                    io.of('/A'+idGame).to(player[num].socketId).emit('playerOut');
                    io.of('/A'+idGame).emit('missingPlayer');
                }, PLAYER_TIMEOUT);

                var endOfTurn;
                // console.log(player.length);
                console.log(player[num].id +' | '+num);

                io.of('/A'+idGame).to(player[num].socketId).emit('yourTurn', PLAYER_TIMEOUT);

                socket.on('thimble', (ok) => {
                    console.log('Dé lancé: '+ ok);
                    var responseThimble = thimble(6);

                    io.of('/A'+idGame).emit('responseThimble', responseThimble, player[num]);

                    // Nouvelle position.
                    if (player[num].position + responseThimble <= BOARD) {
                        player[num].position = player[num].position + responseThimble;
                    }else {
                        var totalBoxes = player[num].position + responseThimble;
                        player[num].position = totalBoxes - BOARD;
                    }

                    // Savoir sur quelle case on est.

                    // Chance.
                    if (player[num].position === BOXES.chance[0] || player[num].position === BOXES.chance[1] || player[num].position === BOXES.chance[2] || player[num].position === BOXES.chance[3]) {
                        console.log('Chance');

                        var randomChance = Math.floor(Math.random() * Math.floor(5));
                        // var randomChance = 4;
                        var responseRandom;

                        switch (randomChance) {
                            case 0:
                                responseRandom = CHANCE.giveForEveryone[Math.floor(Math.random() * Math.floor(2))];

                                var info = player[num].username + ' donne '+ responseRandom + ' Coins à chaque joueur!';

                                io.of('/A'+idGame).emit('infos', 4000, info);

                                player.forEach(element => {
                                    element.coins += responseRandom;
                                })
                                player[num].coins -= responseRandom*player.length;

                                console.log(responseRandom*player.length);

                                endOfTurn();
                            break;
                            case 1:
                                responseRandom = CHANCE.giveForOne[Math.floor(Math.random() * Math.floor(2))];

                                console.log('giveForOne');

                                var textModal = 'À qui voulez-vous offrir ' + responseRandom + ' Coins?';

                                io.of('/A'+idGame).to(player[num].socketId).emit('modal_chance', player, textModal);

                                socket.on('choice_chance', (data) => {

                                    player[data].coins += responseRandom;
                                    player[num].coins -= responseRandom;

                                    var info = player[num].username + ' a donné ' + responseRandom + ' Coins à ' + player[data].username;

                                    io.of('/A'+idGame).emit('infos', 0, info);

                                    endOfTurn();
                                })
                            break;
                            case 2:
                                responseRandom = CHANCE.getFromEveryone[Math.floor(Math.random() * Math.floor(2))];

                                var info = player[num].username + ' à volé '+ responseRandom + ' Coins à chaque joueur!';

                                io.of('/A'+idGame).emit('infos', 4000, info);

                                player.forEach(element => {
                                    element.coins -= responseRandom;
                                })
                                player[num].coins += responseRandom*player.length;

                                console.log(responseRandom*player.length);
                                endOfTurn();
                            break;
                            case 3:
                                responseRandom = CHANCE.getFromOne[Math.floor(Math.random() * Math.floor(2))];

                                console.log('getFromOne');
                                var textModal = 'À qui voulez-vous voler ' + responseRandom + ' Coins?';
                                io.of('/A'+idGame).to(player[num].socketId).emit('modal_chance', player, textModal);

                                socket.on('choice_chance', (data) => {

                                    player[data].coins -= responseRandom;
                                    player[num].coins += responseRandom;

                                    var info = player[num].username + ' a volé ' + responseRandom + ' Coins à ' + player[data].username;

                                    io.of('/A'+idGame).emit('infos', 0, info);

                                    endOfTurn();
                                })
                            break;
                            case 4:
                                responseRandom = CHANCE.makeLoseOrWin[Math.floor(Math.random() * Math.floor(2))];

                                console.log('modal_makeLoseOrWin');

                                var textModal = 'Faire perdre '+ responseRandom +' Coins à tes \nadversaires ou les empocher?'

                                io.of('/A'+idGame).to(player[num].socketId).emit('makeLoseOrWin', textModal);

                                socket.on('lose-win', (data) => {
                                    var info;
                                    if (data === 'lose') {
                                        player.forEach(element => {
                                            element.coins -= responseRandom;
                                        })
                                        player[num].coins += responseRandom;

                                        info = 'Tous le monde perd ' + responseRandom + ' Coins grâce à ' + player[num].username;
                                    }else{
                                        player[num].coins += responseRandom;

                                        info = player[num].username + ' empoche les ' + responseRandom +' Coins';
                                    }
                                    io.of('/A'+idGame).emit('infos', 0, info);

                                    endOfTurn();
                                })
                                // io.of('/A'+idGame).emit('anim_money', player[num].username, MONEY[randomPosition]);
                            break;
                            case 5:
                                io.of('/A'+idGame).to(player[num].socketId).emit('destroy', player, 0, 'Chance');

                                console.log('Destroy');

                                socket.on('destroyed', (data) => {

                                    var info;

                                    if (data !== false) {
                                        var tab = data.split('-');

                                        player.forEach(element => {
                                            if (element.id == tab[1]) {
                                                info = player[num].username + ' détruit la carte ' + tab[0] + ' de ' + element.username + '.';
                                                switch (tab[0]) {
                                                    case 'bread':
                                                        element.cards.bread = false;
                                                        console.log(element);
                                                    break;
                                                    case 'meat':
                                                        element.cards.meat = false;
                                                        console.log(element);
                                                    break;
                                                    case 'salad':
                                                        element.cards.salad = false;
                                                        console.log(element);
                                                    break;
                                                    case 'sauce':
                                                        element.cards.sauce = false;
                                                        console.log(element);
                                                    break;
                                                    default:

                                                }
                                            }
                                        });
                                        console.log('Suppr '+tab[0]+' for '+tab[1]);

                                        io.of('/A'+idGame).emit('infos', 0, info);
                                        endOfTurn();
                                    }else{
                                        info = player[num].username + ' est pacifiste, il n\'a rien détruit.';
                                        io.of('/A'+idGame).emit('infos', 0, info);
                                        endOfTurn();
                                    }
                                })
                            break;
                            default:
                                console.log('Erreur chance');
                                endOfTurn();
                        }
                        console.log('Here | '+responseRandom);


                    // Money.
                    }else if (player[num].position === BOXES.money[0] || player[num].position === BOXES.money[1] || player[num].position === BOXES.money[2] || player[num].position === BOXES.money[3]) {
                        console.log('Money');
                        var randomPosition = (Math.floor(Math.random() * MONEY.length));

                        if (randomPosition === null) {
                            randomPosition = 25;
                            console.log('bug money');
                        }
                        player[num].coins = player[num].coins + MONEY[randomPosition];

                        var info = player[num].username + ' a gagné ' + MONEY[randomPosition] + ' Coins';
                        io.of('/A'+idGame).emit('infos', 4000, info);

                        io.of('/A'+idGame).emit('anim_money', player[num].username, MONEY[randomPosition]);
                        endOfTurn();

                    // Resources.
                    }else if (player[num].position === BOXES.resources[0] || player[num].position === BOXES.resources[1] || player[num].position === BOXES.resources[2] || player[num].position === BOXES.resources[3]) {
                        console.log('Resources');
                        var text = 'Veux-tu acheter la carte';
                        var priceCard = 'pour '+ RESOURCES_PRICE +' Coins?'
                        var buyRes;


                        if (player[num].coins >= RESOURCES_PRICE) {
                            switch (player[num].position) {
                                case RESOURCES.bread:
                                    if (player[num].cards.bread === false) {
                                        io.of('/A'+idGame).to(player[num].socketId).emit('resources', text+' pain '+priceCard);
                                        buyRes = 'bread';
                                    }else{
                                        var info = 'Tu possèdes déjà cette carte! \ud83d\ude03';
                                        io.of('/A'+idGame).to(player[num].socketId).emit('infos', 4000, info);
                                        endOfTurn();
                                    }
                                break;

                                case RESOURCES.meat:
                                    if (player[num].cards.meat === false) {
                                        io.of('/A'+idGame).to(player[num].socketId).emit('resources', text+' viande '+priceCard);
                                        buyRes = 'meat';
                                    }else{
                                        var info = 'Tu possèdes déjà cette carte! \ud83d\ude03';
                                        io.of('/A'+idGame).to(player[num].socketId).emit('infos', 4000, info);
                                        endOfTurn();
                                    }
                                break;

                                case RESOURCES.salad:
                                    if (player[num].cards.salad === false) {
                                        io.of('/A'+idGame).to(player[num].socketId).emit('resources', text+' salade '+priceCard);
                                        buyRes = 'salad';
                                    }else{
                                        var info = 'Tu possèdes déjà cette carte! \ud83d\ude03';
                                        io.of('/A'+idGame).to(player[num].socketId).emit('infos', 4000, info);
                                        endOfTurn();
                                    }
                                break;

                                case RESOURCES.sauce:
                                    if (player[num].cards.sauce === false ) {
                                        io.of('/A'+idGame).to(player[num].socketId).emit('resources', text+' sauce '+priceCard);
                                        buyRes = 'sauce';
                                    }else{
                                        var info = 'Tu possèdes déjà cette carte! \ud83d\ude03';
                                        io.of('/A'+idGame).to(player[num].socketId).emit('infos', 4000, info);
                                        endOfTurn();
                                    }
                                break;
                                default:
                                    endOfTurn();
                            }
                        }else{
                            info = 'Tu n\'as pas assez de Coins pour acheter cette carte.' ;
                            io.of('/A'+idGame).to(player[num].socketId).emit('infos', 4000, info);
                            endOfTurn();
                        }

                        socket.on('buyResources', (boo) => {
                            if (boo === true) {
                                var newRes;
                                if (buyRes === 'bread'){
                                    player[num].cards.bread = true;
                                    newRes = 'pain';
                                }
                                if (buyRes === 'meat'){
                                    player[num].cards.meat = true;
                                    newRes = 'viande';
                                }
                                if (buyRes === 'salad'){
                                    player[num].cards.salad = true;
                                    newRes = 'salade';
                                }
                                if (buyRes === 'sauce'){
                                    player[num].cards.sauce = true;
                                    newRes = 'sauce';
                                }
                                player[num].coins = player[num].coins - RESOURCES_PRICE;

                                info = player[num].username + ' a acheté la catre '+ newRes +'!';
                                io.of('/A'+idGame).emit('infos', 0, info, 'buy');
                                endOfTurn();
                            }else{
                                endOfTurn();
                            }
                        })

                    // Attack.
                    }else if (player[num].position === BOXES.attack[0] || player[num].position === BOXES.attack[1]) {
                        console.log('Attack');

                        var price = 40;

                        if (price <= player[num].coins) {
                            io.of('/A'+idGame).to(player[num].socketId).emit('destroy', player, price, 'Attaque');

                            socket.on('destroyed', (data) => {

                                var info;

                                if (data !== false) {
                                    var tab = data.split('-');

                                    player[num].coins -= price;
                                    player.forEach(element => {
                                        if (element.id == tab[1]) {
                                            info = player[num].username + ' détruit la carte ' + tab[0] + ' de ' + element.username;
                                            switch (tab[0]) {
                                                case 'bread':
                                                    element.cards.bread = false;
                                                    console.log(element);
                                                break;
                                                case 'meat':
                                                    element.cards.meat = false;
                                                    console.log(element);
                                                break;
                                                case 'salad':
                                                    element.cards.salad = false;
                                                    console.log(element);
                                                break;
                                                case 'sauce':
                                                    element.cards.sauce = false;
                                                    console.log(element);
                                                break;
                                                default:

                                            }
                                        }
                                    });
                                    console.log('Suppr '+tab[0]+' for '+tab[1]);

                                    io.of('/A'+idGame).emit('infos', 0, info);
                                    endOfTurn();
                                }else{
                                    info = player[num].username + ' est pacifiste, il n\'a rien détruit.';
                                    io.of('/A'+idGame).emit('infos', 0, info);
                                    endOfTurn();
                                }
                            })
                        }else{
                            io.of('/A'+idGame).to(player[num].socketId).emit('noMoney', 'attack', price);

                            info = 'Tu es à sec!\nIl te faut 40 Coins pour attaquer.';
                            io.of('/A'+idGame).to(player[num].socketId).emit('infos', 4000, info);
                            endOfTurn();
                        }

                    // Bank.
                    }else if (player[num].position === BOXES.bank[0] || player[num].position === BOXES.bank[1]) {
                        console.log('bank');

                        if (player[num].coins > 0) {
                            io.of('/A'+idGame).to(player[num].socketId).emit('bank', {coins: player[num].coins});

                            socket.on('addToBank', (addToBank) => {
                                console.log('add: '+addToBank + ' Coins');
                                if (addToBank <= player[num].coins) {
                                    var nb = player[num].bank;
                                    player[num].bank = parseInt(addToBank) + nb;
                                    console.log('Bank: '+ player[num].bank);
                                    player[num].coins = player[num].coins - addToBank;

                                    info = player[num].username + ' a placé ' + addToBank + ' Coins.';
                                    io.of('/A'+idGame).emit('infos', 0, info);
                                    endOfTurn();
                                }else {
                                    info = 'Tu ne peux pas placer plus que ce que tu possèdes!';
                                    io.of('/A'+idGame).to(player[num].socketId).emit('infos', 0, info);
                                    endOfTurn();
                                }
                            })

                        }else{
                            info = 'Tu es à sec! Tu ne peux rien placer à la banque.';
                            io.of('/A'+idGame).to(player[num].socketId).emit('infos', 4000, info);
                            endOfTurn();
                        }

                    // Benefits.
                    }else if (player[num].position === BOXES.benefit[0] || player[num].position === BOXES.benefit[1]) {
                        console.log('benefit');

                        player[num].bank = Math.floor(player[num].bank + (player[num].bank/100)*BENEFIT);

                        info = 'Tu as reçu ' + Math.floor((player[num].bank/100)*BENEFIT) + ' Coins d\'intérêt.';
                        io.of('/A'+idGame).to(player[num].socketId).emit('infos', 4000, info);

                        endOfTurn();

                    // Empty.
                    }else if (player[num].position === BOXES.empty[0] || player[num].position === BOXES.empty[1]) {
                        console.log('Nothing');
                        endOfTurn();
                    }

                    function endOfTurn() {

                        //  Éviter le négatif.
                        player.forEach(element => {
                            if (element.coins < 0) {
                                element.coins = 0;
                            }
                        })

                        player[num].win = win(num);
                        if (player[num].win === true) {
                            console.log('The winner is: '+player[num].username);

                            endScreen(player[num]);
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
                        io.of('/A'+idGame).to(player[num].socketId).emit('play', num);
                    }

                })

            }


        }) // Fin connection.
    }
}
