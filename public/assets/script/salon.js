$( document ).ready(function() {

// Récupération des données du profil.
// -----------------------------------

    // Fetch des données du profil.
    fetch('../api/users/me/', {
        method: 'get'
    })
    .then(res => res.json())
    .then(function(profile){
        profile = profile;
        console.log(profile);

        if (profile["error"]) { // Si l'utilisateur tape l'URL du salon sans s'être co. (alors, json ne retourne rien)
            alert('Connecte-toi pour accéder au salon!');
            window.location.replace("/login");
        }else { // Affichage dans la page.
            $('#player').replaceWith('<div id="player" class="player"><p class="player-pseudo">'+ profile["username"] +'</p><p class="player-score">Partie(s) gagnée(s): '+ profile["score"]+'</p></div>');
            $('#imgPlayer').attr("src", "../assets/images/_"+profile["img"]+".png");
            profile = null;
        }

    })
    .catch(err => { console.log(err) });


// Déconnexion du joueur.
// ----------------------

    $('#disconnect').click(function(){
        console.log('Disconnect');

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
});
