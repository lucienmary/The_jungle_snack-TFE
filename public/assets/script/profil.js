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
            alert('Connecte-toi pour accéder à ton profil!');
            window.location.replace("/login");
        }else { // Affichage dans la page.
            $('#player').replaceWith(`<div id="player" class="infos-player__el"><p class="pseudo">`+ profile["username"] +`</p><p>Partie gagnée: `+ profile["score"]+`</p></div>`);
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
