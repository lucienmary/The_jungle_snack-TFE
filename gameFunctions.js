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

        // Utilisation des rooms socket.io. (id de la room unique(idGame) passée par l'url).
        io.of('/A'+idGame).on('connection', (socket) => {

            // Si - de 2 joueurs (erreur de redirection ou autre, partie annulée).
            if (playerList.length < 2) {
                socket.emit('errorSocketIo', 410);
            }

            socket.on('fine', (callback) => {
                console.log('Game successfully connected to the server.');
                callback({msg: 'Game successfully connected to the server.'})
            })

            socket.emit('player', playerList); //Envoi de la liste de joueurs.
        })
    }
}
