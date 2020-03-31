$( document ).ready(function() {

    var profile;

    // Fetch des données du profil.
    fetch('../api/users/me', {
        method: 'GET'
    })
    .then(res => res.json())
    .then(function(data){
        profile = data;
        console.log(profile);

        if (profile["error"]) {
            console.log('ERROR!');
        }

        $('#player').replaceWith('<div id="player" class="player"><p class="player-pseudo">'+ profile["username"] +'</p><p class="player-score">Partie(s) gagnée(s): '+ profile["score"]+'</p></div>');
        // $('#scorePlayer').replaceWith('<p class="player" id="scorePlayer">Partie gagnée: '+ profile["score"] +'</p>');

    })
    .catch(err => { console.log(err) });
});
