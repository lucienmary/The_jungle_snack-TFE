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
        console.log(profile);

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

            ioConnect();
        }

    })
    .catch(err => { console.log(err) });


// Déconnexion du joueur.
// ----------------------

    $('#disconnect').click(function(){
        console.log('Disconnect');
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

    });


// Connexion socket.io
// -------------------

    // se connecte qd profil récup. par fetch (/api/users/me/).
    function ioConnect(){
        var socket = io.connect('http://localhost:8080')

        var join = $('#join');

        // Quand clic pr commencer une partie.
        join.click(() => {
            socket.emit('me', {id: profileLocal["id"], username: profileLocal["username"], score: profileLocal["score"], img: profileLocal["img"]});
        })

        socket.on('userJoin', (data) => {
            console.log(data);

            if (data['id'] !== profileLocal['id']) {
                $('#pseudo-01').text(data['username']);
                $('#score-01').text('Partie(s) gagnée(s): '+data['score']);
            }
        })

    }
});
