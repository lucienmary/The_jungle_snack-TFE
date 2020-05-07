// JS link partie.html

$( document ).ready(function() {

    var location = window.location;
    var idGame = location.href.split('id=A');

    var socket = io.connect('/A'+idGame[1]);

    var myId = $.cookie("myId");
    var me;

    // socket.emit('fine', function (result) {
    //     console.info("%c"+result.msg+" 👍", "color: lightgreen");
    // });


    // socket.on('recupId', (player) => {
    //     socket.emit('idSocket', myId, socket.id);
    // })

    socket.on('player', (player) => {

        $('#playerList').empty();

        for (var i = 0; i < player.length; i++) {
            var classMyPosition = '';

            if (player[i].id == myId) {
                classMyPosition = 'itsme';
                me = player[i];
            }

            // $('#playerList').append(`
            //     <li class="clearfix list-player__el infos-player `+ classMyPosition +`">
            //         <img src="../assets/images/_`+ player[i].img +`.png" alt="Photo player">
            //         <div class="player">
            //             <p class="player-pseudo player-`+player[i].color+`">`+ player[i].username +`</p>
            //             <p><span id="coins_`+player[i].id+`">`+player[i].coins+`</span> 💰</p>
            //             <p><span id="bank_`+player[i].id+`">`+player[i].bank+`</span> 🏦</p>
            //             <p id="position_`+player[i].id+`">Position: `+player[i].position+`</p>
            //             <p id="chance_`+player[i].id+`">`+player[i].chance+`</p>
            //
            //             <ul class="resources">
            //                 <li>Bread: `+player[i].cards.bread+`</li>
            //                 <li>Meat: `+player[i].cards.meat+`</li>
            //                 <li>Salad: `+player[i].cards.salad+`</li>
            //                 <li>Sauce: `+player[i].cards.sauce+`</li>
            //             </ul>
            //         </div>
            //     </li>
            // `);
        }
    });




    // Fonctions de jeu.
    // ----------------
    // ---------------

    // Appelée qd mon tour de jouer.
    // socket.on('play', () => {
    //     console.log('PPPPPLAY');
    //     socket.emit('goTurn');
    // })

    // Appelée qd fin de mon tour pour reload client (éviter de relancer play plusieurs fois).
    // socket.on('down', () => {
    //     socket.close()
    //     socket.open()
    //     // socket.reload()
    // })



    // Dé.
    // --
    // socket.on('yourTurn', (pop) => {
    //     console.log('trest');
    //     setTimeout(function(){ // Pour éviter adversaire déco.
    //         $('#thimble').prop('disabled', false);
    //     }, 1000);
    // })

    // $('#thimble').click( function() {
    //     socket.emit('thimble', true);
    //     $('#thimble').prop('disabled', true);
    // })

    // Afficher dé de tout les joueurs.
    // socket.on('responseThimble', (responseThimble) => {
    //     console.log(responseThimble);
    // })


    // Chance.
    // ------
    // socket.on('modal_chance', (data) => {
    //     var i = 0;
    //     data.forEach(element => {
    //         if (element.id != myId) {
    //             $('#modal_chance_ul').append(`
    //                 <li>
    //                     <img src="../assets/images/_`+element.img+`.png">
    //                     <button id="num-`+i+`">`+element.username+`</button>
    //                 </li>
    //             `)
    //         }
    //         i++;
    //     })
    //
    //     $('#num-0').click( function() {
    //         socket.emit('choice_chance', 0);
    //         restartChance();
    //     })
    //     $('#num-1').click( function() {
    //         socket.emit('choice_chance', 1);
    //         restartChance();
    //     })
    //     $('#num-2').click( function() {
    //         socket.emit('choice_chance', 2);
    //         restartChance();
    //     })
    //     $('#num-3').click( function() {
    //         socket.emit('choice_chance', 3);
    //         restartChance();
    //     })
    //
    //     $('#modal_chance').removeClass('hidden');
    // })


    // socket.on('makeLoseOrWin', (data) => {
    //     $('#modal_makeLoseOrWin').removeClass('hidden');
    //     $('#title_makeLoseOrWin').text('Faire perdre '+ data +' Coins à tes adversaires ou les empocher?');
    // })
    // $('#lose').click( function() {
    //     socket.emit('lose-win', 'lose');
    //     $('#modal_makeLoseOrWin').addClass('hidden');
    // })
    // $('#win').click( function() {
    //     socket.emit('lose-win', 'win');
    //     $('#modal_makeLoseOrWin').addClass('hidden');
    // })

    // Destroy.
    // socket.on('destroy', (data, price, title) => {
    //     $('#title_chanceDestroy').text(title);
    //     $('#price_chanceDestroy').text(price);
    //     data.forEach(element => {
    //         if (element.id != myId) {
    //             // if (element.cards.bread === true || element.cards.meat === true || element.cards.salad === true || element.cards.sauce === true) {
    //             //
    //             // }
    //             $('#modal_chanceDestroy_ul').append(`
    //                 <li id="modal_chanceDestroy_li-`+ element.id +`">
    //                     <div>
    //                         <img src="../assets/images/_`+element.img+`.png">
    //                         <p>`+element.username+`</p>
    //                     </div>
    //                     <div>
    //                         <button id="bread-`+element.id+`" class="button-destroy">🍞</button>
    //                         <button id="meat-`+element.id+`" class="button-destroy">🥩</button>
    //                         <button id="salad-`+element.id+`" class="button-destroy">🥗</button>
    //                         <button id="sauce-`+element.id+`" class="button-destroy">🥫</button>
    //                     </div>
    //                 </li>
    //             `);
    //
    //             if (element.cards.bread === false) {
    //                 $('#bread-'+element.id).prop('disabled', true);
    //             };
    //             if (element.cards.meat === false) {
    //                 $('#meat-'+element.id).prop('disabled', true);
    //             };
    //             if (element.cards.salad === false) {
    //                 $('#salad-'+element.id).prop('disabled', true);
    //             };
    //             if (element.cards.sauce === false) {
    //                 $('#sauce-'+element.id).prop('disabled', true);
    //             };
    //         }
    //     })
    //
    //     $('#modal_chanceDestroy').append(`<button id="iAmPacifist" type="button" name="button">Ne rien détruire</button>`);
    //     $('#modal_chanceDestroy').removeClass('hidden');
    //
    //     $('.button-destroy').click(function(e) {
    //         console.log( this.id);
    //         socket.emit('destroyed', this.id);
    //         $('#modal_chanceDestroy').addClass('hidden');
    //         $('#modal_chanceDestroy_ul').empty();
    //         $('#iAmPacifist').remove();
    //     });
    //     $('#iAmPacifist').click(function(e) {
    //         console.log('I am pacifist');
    //         socket.emit('destroyed', false);
    //         $('#modal_chanceDestroy').addClass('hidden');
    //         $('#modal_chanceDestroy_ul').empty();
    //         $('#iAmPacifist').remove();
    //     });
    //
    // })

    // socket.on('chance_giveForEveryone', (data) => {
    //     console.log('Give for everyone: '+ data);
    // })

    // socket.on('chance_getFromEveryone', (data) => {
    //     console.log('Get from everyone: '+ data);
    // })

    // socket.on('chance_giveForOne', (p, p2, responseRandom) => {
    //     console.log(p.username +' gives '+ responseRandom + ' for ' +p2.username);
    // })
    //
    // socket.on('chance_getFromOne', (p, p2, responseRandom) => {
    //     console.log(p.username +' take in '+ responseRandom + ' from ' +p2.username);
    // })

    // function restartChance() {
    //     $('#modal_chance').addClass('hidden');
    //     $('#modal_chance_ul').empty();
    // }



    // Bank.
    // ----
    // socket.on('bank', (data) => {
    //     console.log('Go bank');
    //     console.log(me.coins);
    //
    //     $('#modal_bank').removeClass('hidden');
    //     $('#input_bank').attr('max', me.coins);
    //     $('#input_bank').val(0);
    // })

    // $('#submit_bank').click( function() {
    //     var added = $('#input_bank').val();
    //     console.log(added);
    //     socket.emit('addToBank', added);
    //
    //     $('#modal_bank').addClass('hidden');
    // })
    // socket.on('noBank', (data) => { // Si compte à sec.
    //     console.log("Tu ne peux pas placer d'argent en banque. T'as R...");
    // });



    socket.on('noMoney', (box, price) => {

        if (box === 'attack') {

            $('#title_noMoney').text("Tu es à sec!");
            $('#text_noMoney').text("Tu n'as pas les "+ price +" Coins nécéssaire.");
        }else if(box === 'bank'){

            $('#title_noMoney').text("Tu ne peux pas placer autant!");
            $('#text_noMoney').text("Tu n'as pas les "+ price +" Coins nécéssaire.");
        }

        $('#modal_noMoney').removeClass('hidden');

        setTimeout( function() {
            $('#modal_noMoney').addClass('hidden');
        },3000);
    })




    // Anim.
    // ----
    socket.on('anim_money', (playerName, card) => {
        console.log(playerName +' a gagné: '+ card +' Coins');
    })



    // End / Winner.
    socket.on('endScreen', (winner) => {
        $('#gameView').addClass('hidden');
        $('#endView').removeClass('hidden');
        $('#winner').text('Le gagnant est '+winner.username);
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
