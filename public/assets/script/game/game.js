// JS link partie.html
$( document ).ready(function() {

    var location = window.location;
    var idGame = location.href.split('id=A');

    var socket = io.connect('/A'+idGame[1]);

    var myId = $.cookie("myId");
    var me;

    socket.emit('fine', function (result) {
        console.info("%c"+result.msg+" 👍", "color: lightgreen");
    });


    socket.on('recupId', (player) => {
        socket.emit('idSocket', myId, socket.id);
    })

    socket.on('player', (player) => {

        $('#playerList').empty();

        for (var i = 0; i < player.length; i++) {
            var classMyPosition = '';

            if (player[i].id == myId) {
                classMyPosition = 'itsme';
                me = player[i];
            }

            $('#playerList').append(`
                <li class="clearfix list-player__el infos-player `+ classMyPosition +`">
                    <img src="../assets/images/_`+ player[i].img +`.png" alt="Photo player">
                    <div class="player">
                        <p class="player-pseudo player-`+player[i].color+`">`+ player[i].username +`</p>
                        <p><span id="coins_`+player[i].id+`">`+player[i].coins+`</span> 💰</p>
                        <p><span id="bank_`+player[i].id+`">`+player[i].bank+`</span> 🏦</p>
                        <p id="position_`+player[i].id+`">Position: `+player[i].position+`</p>
                        <p id="chance_`+player[i].id+`">`+player[i].chance+`</p>

                        <ul class="resources">
                            <li>Bread: `+player[i].cards.bread+`</li>
                            <li>Meat: `+player[i].cards.meat+`</li>
                            <li>Salad: `+player[i].cards.salad+`</li>
                            <li>Sauce: `+player[i].cards.sauce+`</li>
                        </ul>
                    </div>
                </li>
            `);
        }
    });




    // Fonctions de jeu.
    // ----------------
    // ---------------

    // Appelée qd mon tour de jouer.
    socket.on('play', () => {
        socket.emit('goTurn');
    })

    // Appelée qd fin de mon tour pour reload client (éviter de relancer play plusieurs fois).
    socket.on('down', () => {
        socket.close()
        socket.open()
        // socket.reload()
    })



    // Dé.
    // --
    socket.on('yourTurn', (pop) => {
        setTimeout(function(){ // Pour éviter adversaire déco.
            $('#thimble').prop('disabled', false);
        }, 1000);
    })

    $('#thimble').click( function() {
        socket.emit('thimble', true);
        $('#thimble').prop('disabled', true);
    })

    // Afficher dé de tout les joueurs.
    socket.on('responseThimble', (responseThimble) => {
        console.log(responseThimble);
    })


    // Bank.
    // ----
    socket.on('bank', (data) => {
        console.log('Go bank');
        console.log(me.coins);

        $('#modal_bank').removeClass('hidden');
        $('#input_bank').attr('max', me.coins);

        setTimeout(function(){
            $('#modal_bank').addClass('hidden');
        }, 8000);
    })

    $('#submit_bank').click( function() {
        var added = $('#input_bank').val();
        console.log(added);
        socket.emit('addToBank', added);

        $('#modal_bank').addClass('hidden');
    })


    // Anim.
    // ----
    socket.on('anim_money', (playerName, card) => {
        console.log(playerName +' a gagné: '+ card +' Coins');
    })



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
