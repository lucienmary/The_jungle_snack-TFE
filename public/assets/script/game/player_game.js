$( document ).ready(function() {

    // Fetch des données du profil.
    fetch('../api/users/me/', {
        method: 'get'
    })
    .then(res => res.json())
    .then(function(profile){
        profile = profile;
        console.log(profile);

        if (profile["error"]) {
            console.log('ERROR!');
        }

        $('#player').replaceWith('<p id="player">'+ profile["username"] +'</p>');
        // $('#scorePlayer').replaceWith('<p class="player" id="scorePlayer">Partie gagnée: '+ profile["score"] +'</p>');

    })
    .catch(err => { console.log(err) });
});
