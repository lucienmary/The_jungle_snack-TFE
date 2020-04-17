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

        const GAME_CONFIG = {coins: 50, bank: 0, color:['blue', 'red', 'yellow', 'green']};
        const BOARD = 20;
        const BOXES = {chance: [5, 10, 15, 20], money: [3, 8, 13, 18], resources: [1, 6, 11, 16], attack: [9, 19], bank: [7, 17], benefit: [2, 12]};

        var player = [];

        // Utilisation des rooms socket.io. (id de la room unique(idGame) passée par l'url).
        io.of('/A'+idGame).on('connection', (socket) => {

            // Si - de 2 joueurs (erreur de redirection ou autre, partie annulée).
            if (playerList.length < 2) {
                socket.emit('errorSocketIo', 410);
            }

            // Msg connexion OK.
            socket.on('fine', (callback) => {
                console.log('\x1b[36m%s\x1b[0m\x1b[41m%s\x1b[0m', '/////)> ','Game successfully connected to the server.');
                callback({msg: 'Game successfully connected to the server.'})
            })

            newSettingsPlayer();
            function newSettingsPlayer() {
                var i = 0;
                playerList.forEach(element => {
                    delete element.socketId;
                    element.coins = GAME_CONFIG.coins;
                    element.color = GAME_CONFIG.color[i];
                    element.bank = GAME_CONFIG.bank;
                    element.position = 0;
                    element.cards = {bread: false, meat: false, salad: false, sauce: false};
                    element.chance = '';
                    i++;
                });

                player = playerList;
                //Envoi de la liste de joueurs.
                console.log(player);
                socket.emit('player', player);
            }




        }) // Fin connection.
    }
}
