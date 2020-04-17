// JS link partie.html
$( document ).ready(function() {

    var location = window.location;
    var idGame = location.href.split('id=A');

    var socket = io.connect('/A'+idGame[1]);

    socket.emit('fine', function (result) {
        console.log(result.msg);
    });

    socket.on('player', (playerList) => {
        console.log(playerList);
    });






    // Gestion des erreurs.
    socket.on('errorSocketIo', (data) => {
        switch (data) {
            case 500:
                console.error('(500): Erreur serveur.');
                break;
            case 401:
                console.error('(403): Une authentification est nécéssaire (ou ce compte est déjà utilisé).');
                // setTimeout( disco,1000);
                break;
            case 410:
                console.error('(410): La partie a été annulée car vous êtes le seul joueur présent.');
                // setTimeout( disco,1000);
                break;
            default:
                console.error('(?): Erreur non-identifiée.');
        }
    })
});
