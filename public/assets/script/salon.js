$( document ).ready(function() {

var profileLocal;

// Récupération des données du profil.
// -----------------------------------

    // Fetch des données du profil.
    fetch('../api/users/me/', {
        method: 'get'
    })
    .then(res => res.json())
    .then(function(profile){
        profileLocal = profile;

        if (profile["error"]) { // Si l'utilisateur tape l'URL du salon sans s'être co. (alors, json ne retourne rien)
            alert('Connecte-toi pour accéder au salon!');
            window.location.replace("/login");
            document.cookie = "Authorization=; path=/";
            document.cookie = "clientAuth=false; path=/";
            document.cookie = "myId=; path=/";

        }else { // Affichage dans la page.
            $('#player').replaceWith('<div id="player" class="player"><p class="player-pseudo">'+ profile["username"] +'</p><p class="player-score">Partie(s) gagnée(s): '+ profile["score"]+'</p></div>');
            $('#imgPlayer').attr("src", "../assets/images/_"+profile["img"]+".png");

            document.cookie = 'myId='+profileLocal['id']+'; path=/'; // cookie pour identifier joueur si quitte sans déco.

            ioConnect();
        }

    })
    .catch(err => {
        console.log(err)
    });


// Déconnexion du joueur.
// ----------------------

    var disco = function disco(){
        profileLocal = null;

        fetch('../api/users/disconnect/', {
            method: 'get'
        })
        .then(res => res.json())
        .then(function(data){
            window.location.replace("/login");
        })
        .catch(err => { console.log(err) });

    }

    $('#disconnect').click(disco);


// Connexion socket.io
// -------------------

    // se connecte qd profil récup. par fetch (/api/users/me/).
    function ioConnect(){
        var socket = io.connect('http://localhost:8080', console.info('Successfully connected with socket'));

        var join = $('#join');

        // Quand clic pr commencer une partie.
        join.click(() => {
            if (join.text() == 'Entrer') { // Entrer.
                join.text('Sortir');
                socket.emit('enterPlayerList', {id: profileLocal["id"], username: profileLocal["username"], score: profileLocal["score"], img: profileLocal["img"]});

            }else{ // Sortir.
                join.text('Entrer');
                socket.emit('exitPlayerList', {id: profileLocal["id"]});
            }
        })

        // Afficher les autres joueurs dans la playerlist.
        socket.on('displayPlayers', (data) => {
            var playerList = data.playerList;

            $('#playerList').empty();

            for (var i = 0; i < playerList.length; i++) {

                var classMyPosition = '';

                if (playerList[i].id === profileLocal["id"]) {
                    classMyPosition = 'itsme';
                }

                $('#playerList').append(`
                    <li class="clearfix list-player__el infos-player `+ classMyPosition +`">
                        <img src="../assets/images/_`+ playerList[i].img +`.png" alt="Photo player">
                        <div class="player">
                            <p class="player-pseudo">`+ playerList[i].username +`</p>
                            <p>`+ playerList[i].score +`</p>
                        </div>
                    </li>
                `);
            }
        })


        // Gestion des erreurs.
        socket.on('errorSocketIo', (data) => {
            switch (data) {
                case 500:
                    console.error('(500): Erreur serveur.');
                    break;
                case 401:
                    console.error('(403): Une authentification est nécéssaire (ou ce compte est déjà utilisé).');
                    setTimeout( disco,1000);
                    break;
                default:
                    console.error('(?): Erreur non-identifiée.');
            }
        })


        // Timer.
        var secondInterval;
        socket.on('timerForStart', (data, SECOND_TO_START) => {

            if (data === true) {
                var time = SECOND_TO_START;
                secondInterval = setInterval(function(){
                    time--;
                    $('#timerForStart').text(time);

                    if (time === 0) {
                        clearInterval(secondInterval);
                    }
                }, 1000);
            }else{
                clearInterval(secondInterval);
                $('#timerForStart').text(SECOND_TO_START);
                socket.emit('stopTime'); // Envoyé par client pour demander à tous de stopper (Stoppé par premier client entré).
            }
        })


        // Start game.
        socket.on('start', (destination) => {
            console.info('🏁 START! 🏁');
            window.location.href = destination;
        })

    } // Fin ioConnect();
}); // Fin doc.
