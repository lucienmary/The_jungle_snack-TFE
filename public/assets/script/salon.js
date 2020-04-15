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
        }else { // Affichage dans la page.
            $('#player').replaceWith('<div id="player" class="player"><p class="player-pseudo">'+ profile["username"] +'</p><p class="player-score">Partie(s) gagnée(s): '+ profile["score"]+'</p></div>');
            $('#imgPlayer').attr("src", "../assets/images/_"+profile["img"]+".png");

            // liste joueur.
            $('#img-me').attr("src", "../assets/images/_"+profile["img"]+".png");
            $('#pseudo-me').text(profile["username"]);
            $('#score-me').text('Partie(s) gagnée(s): '+profile["score"]);

            document.cookie = 'myId='+profileLocal['id']+'; path=/'; // cookie pour identifier joueur si quitte sans déco.

            ioConnect();
        }

    })
    .catch(err => { console.log(err) });


// Déconnexion du joueur.
// ----------------------

    var disco = function disco(){
        profileLocal = null;

        fetch('../api/users/disconnect/', {
            method: 'get'
        })
        .then(res => res.json())
        .then(function(data){
            console.log(data);
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
            console.log(data.playerList);
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


        // socket.emit('disconnect', {id: profileLocal["id"]});



    } // Fin ioConnect();
}); // Fin doc.
