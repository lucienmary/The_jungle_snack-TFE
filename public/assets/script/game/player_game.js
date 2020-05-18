$( document ).ready(function() {

    // Fetch des données du profil.
    fetch('../api/users/me/', {
        method: 'get'
    })
    .then(res => res.json())
    .then(function(profile){
        profile = profile;
        // console.log(profile);

        if (profile["error"]) {
            console.log('ERROR!');
        }

        $('#player').text(profile.username);
        $('#imgPlayer').attr("src", "../assets/images/_"+profile["img"]+".png");
        // $('#scorePlayer').replaceWith('<p class="player" id="scorePlayer">Partie gagnée: '+ profile["score"] +'</p>');

    })
    .catch(err => { console.log(err) });
});
