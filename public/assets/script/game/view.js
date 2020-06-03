// View.

$( document ).ready(function() {

    // Settings.
    var settings = JSON.parse(localStorage.getItem('settingsTJS'));
    console.log('music= '+settings.music +' | effect= '+ settings.effect);

    var location = window.location;
    var idGame = location.href.split('id=A');

    var width = window.innerWidth;
    var height = window.innerHeight;

    const SCALE = 0.6;
    const SCALE_TEXT = 0.7;
    const WUNIT = 142*SCALE;
    const HUNIT = 80*SCALE;
    const FONT_RIGHT = {fontFamily: 'Arial', fontSize: 28, align: 'right'};
    const FONT_LEFT = {fontFamily: 'Arial', fontSize: 28, align: 'left'};
    const FONT_MONEY = {fontFamily: 'Arial', fontSize: 24, align: 'left'};
    const FONT_TINY = {fontFamily: 'Arial', fontSize: 22, align: 'left'};
    const FONT_INFOS = {fontFamily: 'Arial Black', fontSize: 43, align: 'center', color: '#FFF3C2', fontWeight: 'bold'};
    const ANIMATION_TIMER = 10;
    const ALPHA_PAWN = 0.7;
    const TIME_THIMBLE = 4000;
    const TIME_MODAL = 4000;

    var config = {
            type: Phaser.AUTO,
            width: width,
            height: height,
            backgroundColor:0xC5BF89,
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

    var game = new Phaser.Game(config);

    function preload (){

        // Cursor.
        this.load.image('cursor', '../assets/images/cursor.png');

        //link.
        this.load.image('link-home', '../assets/images/link-home.png');
        this.load.image('link-settings', '../assets/images/link-settings.png');

        // Boxes.
        this.load.image('resources', '../assets/images/resources.png');
        this.load.image('benefits', '../assets/images/benefits.png');
        this.load.image('coins', '../assets/images/coins.png');
        this.load.image('empty', '../assets/images/empty.png');
        this.load.image('chance', '../assets/images/chance.png');
        this.load.image('bank', '../assets/images/bank.png');
        this.load.image('attack', '../assets/images/attack.png');

        // Autres.
        this.load.image('centrum', '../assets/images/centrum.png');
        this.load.image('cadre_blue', '../assets/images/cadre_blue.png');
        this.load.image('cadre_red', '../assets/images/cadre_red.png');
        this.load.image('cadre_yellow', '../assets/images/cadre_yellow.png');
        this.load.image('cadre_green', '../assets/images/cadre_green.png');
        this.load.image('position_cards', '../assets/images/position_cards@2x.png');
        this.load.image('block', '../assets/images/block.png');
        this.load.image('btn_thimble', '../assets/images/btn_thimble.png');
        this.load.image('input_bank', '../assets/images/input_bank.png');

        // Img player.
        this.load.image('img-00', '../assets/images/_img-00_x90.png');
        this.load.image('img-01', '../assets/images/_img-01_x90.png');
        this.load.image('img-02', '../assets/images/_img-02_x90.png');
        this.load.image('img-03', '../assets/images/_img-03_x90.png');
        this.load.image('img-04', '../assets/images/_img-04_x90.png');

        // Card.
        this.load.image('card_meat', '../assets/images/card_meat.png');
        this.load.image('card_bread', '../assets/images/card_bread.png');
        this.load.image('card_salad', '../assets/images/card_salad.png');
        this.load.image('card_sauce', '../assets/images/card_sauce.png');
        this.load.image('empty_card', '../assets/images/empty_card.png');

        // Modal.
        this.load.image('modal', '../assets/images/modal_01.png');
        this.load.image('modal_chance', '../assets/images/modal_chance.png');
        this.load.image('modal_attack', '../assets/images/modal_attack.png');
        this.load.image('modal_bank', '../assets/images/modal_bank.png');
        this.load.image('gradient', '../assets/images/gradient@2x.png');

        this.load.image('btn_blue', '../assets/images/btn_blue.png');
        this.load.image('btn_red', '../assets/images/btn_red.png');
        this.load.image('btn_green', '../assets/images/btn_green.png');
        this.load.image('btn_yellow', '../assets/images/btn_yellow.png');
        this.load.image('btn_take', '../assets/images/btn_take.png');
        this.load.image('btn_lose', '../assets/images/btn_lose.png');
        this.load.image('area_red', '../assets/images/area_red.png');
        this.load.image('area_blue', '../assets/images/area_blue.png');
        this.load.image('area_green', '../assets/images/area_green.png');
        this.load.image('area_yellow', '../assets/images/area_yellow.png');
        this.load.image('btn_meat', '../assets/images/btn_v.png');
        this.load.image('btn_bread', '../assets/images/btn_p.png');
        this.load.image('btn_salad', '../assets/images/btn_sal.png');
        this.load.image('btn_sauce', '../assets/images/btn_sau.png');
        this.load.image('btn_ok', '../assets/images/btn_ok.png');
        this.load.image('btn_nothing', '../assets/images/btn_nothing.png');
        this.load.image('arrow_up', '../assets/images/arrow_up.png');
        this.load.image('arrow_down', '../assets/images/arrow_down.png');
        this.load.image('btn_yes', '../assets/images/btn_yes.png');
        this.load.image('btn_no', '../assets/images/btn_no.png');
        this.load.image('btn_close', '../assets/images/btn_close.png');
        this.load.image('btn_mute', '../assets/images/btn_mute.png');

        // pawn.

        this.load.image('flamingo_red', '../assets/images/pawn/flamingo_red.png');
        this.load.image('flamingo_blue', '../assets/images/pawn/flamingo_blue.png');
        this.load.image('flamingo_yellow', '../assets/images/pawn/flamingo_yellow.png');
        this.load.image('flamingo_green', '../assets/images/pawn/flamingo_green.png');

        this.load.image('fox_red', '../assets/images/pawn/fox_red.png');
        this.load.image('fox_blue', '../assets/images/pawn/fox_blue.png');
        this.load.image('fox_yellow', '../assets/images/pawn/fox_yellow.png');
        this.load.image('fox_green', '../assets/images/pawn/fox_green.png');

        this.load.image('turtle_red', '../assets/images/pawn/turtle_red.png');
        this.load.image('turtle_blue', '../assets/images/pawn/turtle_blue.png');
        this.load.image('turtle_yellow', '../assets/images/pawn/turtle_yellow.png');
        this.load.image('turtle_green', '../assets/images/pawn/turtle_green.png');

        // Musiques et sons.
        this.load.audio('music', '../assets/sounds/music.mp3');
        this.load.audio('dice', '../assets/sounds/dice.mp3');
        this.load.audio('buy', '../assets/sounds/buy.mp3');

        // thimble.
        this.load.video('video06', '../assets/videos/6.webm');
        this.load.video('video05', '../assets/videos/5.webm');
        this.load.video('video04', '../assets/videos/4.webm');
        this.load.video('video03', '../assets/videos/3.webm');
        this.load.video('video02', '../assets/videos/2.webm');
        this.load.video('video01', '../assets/videos/1.webm');

    }

    function create (){

        // Cursor.
        this.input.setDefaultCursor('url(../assets/images/cursor.png), pointer');

        this.info = this.add.text(width/2, height/2-20, '/', FONT_INFOS).setDepth(8).setOrigin(0.5);
        this.info.visible = false;
        this.gradient = this.add.image(width/2, height/2, 'gradient').setOrigin(0.5, 0.5).setDepth(5);
        this.gradient.visible = false;
        this.alertDeco = this.add.text(width/2, 100, 'Attention, si tu ne joues pas, tu seras exclu.', FONT_LEFT).setDepth(107).setOrigin(0.5);
        this.alertDeco.visible = false;

        this.video = [];

        this.video[5] = this.add.video(width/2, height/2, 'video06').setDepth(4).setOrigin(0.5, 1).setScale(0.8);
        this.video[4] = this.add.video(width/2, height/2, 'video05').setDepth(4).setOrigin(0.5, 1).setScale(0.8);
        this.video[3] = this.add.video(width/2, height/2, 'video04').setDepth(4).setOrigin(0.5, 1).setScale(0.8);
        this.video[2] = this.add.video(width/2, height/2, 'video03').setDepth(4).setOrigin(0.5, 1).setScale(0.8);
        this.video[1] = this.add.video(width/2, height/2, 'video02').setDepth(4).setOrigin(0.5, 1).setScale(0.8);
        this.video[0] = this.add.video(width/2, height/2, 'video01').setDepth(4).setOrigin(0.5, 1).setScale(0.8);

        this.bd = [];
        this.bg = [];
        this.hg = [];
        this.hd = [];

        this.casesX = [width/2, (width/2)-WUNIT, (width/2)-WUNIT*2, (width/2)-WUNIT*3, (width/2)-WUNIT*4, (width/2)-WUNIT*5, (width/2)-WUNIT*4, (width/2)-WUNIT*3, (width/2)-WUNIT*2, (width/2)-WUNIT, width/2, (width/2)+WUNIT, (width/2)+WUNIT*2, (width/2)+WUNIT*3, (width/2)+WUNIT*4, (width/2)+WUNIT*5, (width/2)+WUNIT*4, (width/2)+WUNIT*3, (width/2)+WUNIT*2, (width/2)+WUNIT]
        this.casesY = [(height/2)+HUNIT*5, (height/2)+HUNIT*4, (height/2)+HUNIT*3, (height/2)+HUNIT*2, (height/2)+HUNIT, height/2, (height/2)-HUNIT, (height/2)-HUNIT*2, (height/2)-HUNIT*3, (height/2)-HUNIT*4, (height/2)-HUNIT*5, (height/2)-HUNIT*4, (height/2)-HUNIT*3, (height/2)-HUNIT*2, (height/2)-HUNIT*1, height/2, (height/2)+HUNIT, (height/2)+HUNIT*2, (height/2)+HUNIT*3, (height/2)+HUNIT*4];

        // connection settings.
        this.socket = io.connect('/A'+idGame[1]);

        var myId = $.cookie("myId");
        var me;

        this.socket.emit('fine', function (result) {
            console.info("%c"+result.msg+" 🥰", "color: lightgreen");
        });

        this.socket.on('recupId', (player) => {
            this.socket.emit('idSocket', myId, this.socket.id);
        })


        // Affichage des joueurs + infos joueurs.
        this.socket.on('view', (playerForStart) => {
            this.bd.bread = this.add.image(width-43, height-200, 'position_cards').setScale(0.64);
            this.bd.meat = this.add.image(width-119, height-200, 'position_cards').setScale(0.64);
            this.bd.salad = this.add.image(width-195, height-200, 'position_cards').setScale(0.64);
            this.bd.sauce = this.add.image(width-271, height-200, 'position_cards').setScale(0.64);
            this.add.image(width-(500/2)*SCALE_TEXT, height-(222/2)*SCALE_TEXT, 'cadre_blue').setScale(SCALE_TEXT);
            this.add.image(width-200, height-32, 'block').setScale(SCALE_TEXT);
            this.bd.username = this.add.text(width-270, height-100, playerForStart[0].username, FONT_RIGHT);
            this.bd.img = this.add.image(width-60, height-55, playerForStart[0].img);
            this.bd.coins = this.add.text(width-265, height-45, playerForStart[0].coins, FONT_MONEY);
            this.bd.bank = this.add.text(width-185, height-45, playerForStart[0].bank, FONT_MONEY);

            this.bd.pawn = this.add.image(this.casesX[(playerForStart[0].position)-1], this.casesY[(playerForStart[0].position)-1], playerForStart[0].pawn+'_'+playerForStart[0].color).setScale(SCALE/1.5).setOrigin(0.5, 1).setAlpha(ALPHA_PAWN);

            this.bg.bread = this.add.image(43, height-200, 'position_cards').setScale(0.64);
            this.bg.meat = this.add.image(119, height-200, 'position_cards').setScale(0.64);
            this.bg.salad = this.add.image(195, height-200, 'position_cards').setScale(0.64);
            this.bg.sauce = this.add.image(271, height-200, 'position_cards').setScale(0.64);
            this.add.image(500/2*SCALE_TEXT, height-(222/2)*SCALE_TEXT, 'cadre_red').setScale(SCALE_TEXT);
            this.add.image(200, height-32, 'block').setScale(SCALE_TEXT);
            this.bg.username = this.add.text(140, height-100, playerForStart[1].username, FONT_LEFT);
            this.bg.img = this.add.image(60, height-55, playerForStart[1].img);
            this.bg.bank = this.add.text(215, height-45, playerForStart[1].bank, FONT_MONEY);
            this.bg.coins = this.add.text(135, height-45, playerForStart[1].coins, FONT_MONEY);

            this.bg.pawn = this.add.image(this.casesX[(playerForStart[1].position)-1], this.casesY[(playerForStart[1].position)-1], playerForStart[1].pawn+'_'+playerForStart[1].color).setScale(SCALE/1.5).setOrigin(0.5, 1).setAlpha(ALPHA_PAWN);

            if (playerForStart.length > 2) {
                this.hg.bread = this.add.image(43, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.hg.meat = this.add.image(119, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.hg.salad = this.add.image(195, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.hg.sauce = this.add.image(271, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.add.image(500/2*SCALE_TEXT, 222/2*SCALE_TEXT, 'cadre_yellow').setScale(SCALE_TEXT);
                this.add.image(200, 75, 'block').setScale(SCALE_TEXT);
                this.hg.username = this.add.text(140, 10, playerForStart[2].username, FONT_LEFT);
                this.hg.img = this.add.image(60, 55, playerForStart[2].img);
                this.hg.bank = this.add.text(215, 62, playerForStart[2].bank, FONT_MONEY);
                this.hg.coins = this.add.text(135, 62, playerForStart[2].coins, FONT_MONEY);

                this.hg.pawn = this.add.image(this.casesX[(playerForStart[2].position)-1], this.casesY[(playerForStart[2].position)-1], playerForStart[2].pawn+'_'+playerForStart[2].color).setScale(SCALE/1.5).setOrigin(0.5, 1).setAlpha(ALPHA_PAWN);
            }

            if (playerForStart.length > 3) {
                this.hd.bread = this.add.image(width-43, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.hd.meat = this.add.image(width-119, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.hd.salad = this.add.image(width-195, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.hd.sauce = this.add.image(width-271, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.add.image(width-(500/2)*SCALE_TEXT, 222/2*SCALE_TEXT, 'cadre_green').setScale(SCALE_TEXT);
                this.add.image(width-200, 75, 'block').setScale(SCALE_TEXT);
                this.hd.username = this.add.text(width-260, 10, playerForStart[3].username, FONT_RIGHT);
                this.hd.img = this.add.image(width-60, 55, playerForStart[3].img);
                this.hd.bank = this.add.text( width-185, 62, playerForStart[3].bank, FONT_MONEY);
                this.hd.coins = this.add.text(width-265, 62, playerForStart[3].coins, FONT_MONEY);

                this.hd.pawn = this.add.image(this.casesX[(playerForStart[3].position)-1], this.casesY[(playerForStart[3].position)-1], playerForStart[3].pawn+'_'+playerForStart[3].color).setScale(SCALE/1.5).setOrigin(0.5, 1).setAlpha(ALPHA_PAWN);
            }
        })

        // ---------
        //   BOXES
        // ---------

        // Haut.
        this.box11 = this.add.image(this.casesX[10], this.casesY[10], 'resources');
        this.box11.setScale(SCALE);

        this.box12 = this.add.image(this.casesX[11], this.casesY[11], 'benefits');
        this.box12.setScale(SCALE);

        this.box13 = this.add.image(this.casesX[12], this.casesY[12], 'coins');
        this.box13.setScale(SCALE);

        this.box14 = this.add.image(this.casesX[13], this.casesY[13], 'empty');
        this.box14.setScale(SCALE);

        this.box15 = this.add.image(this.casesX[14], this.casesY[14], 'chance');
        this.box15.setScale(SCALE);

        this.box16 = this.add.image(this.casesX[15], this.casesY[15], 'resources');
        this.box16.setScale(SCALE);

        this.box10 = this.add.image(this.casesX[9], this.casesY[9], 'chance');
        this.box10.setScale(SCALE);

        this.box09 = this.add.image(this.casesX[8], this.casesY[8], 'attack');
        this.box09.setScale(SCALE);

        this.box08 = this.add.image(this.casesX[7], this.casesY[7], 'coins');
        this.box08.setScale(SCALE);

        this.box07 = this.add.image(this.casesX[6], this.casesY[6], 'bank');
        this.box07.setScale(SCALE);

        this.box06 = this.add.image(this.casesX[5], this.casesY[5], 'resources');
        this.box06.setScale(SCALE);


        // Centre.
        var centrum = this.add.image(width/2, height/2, 'centrum');
        centrum.setScale(SCALE);


        // Bas.
        this.box17 = this.add.image(this.casesX[16], this.casesY[16], 'bank');
        this.box17.setScale(SCALE);

        this.box18 = this.add.image(this.casesX[17], this.casesY[17], 'coins');
        this.box18.setScale(SCALE);

        this.box19 = this.add.image(this.casesX[18], this.casesY[18], 'attack');
        this.box19.setScale(SCALE);

        this.box20 = this.add.image(this.casesX[19], this.casesY[19], 'chance');
        this.box20.setScale(SCALE);

        this.box05 = this.add.image(this.casesX[4], this.casesY[4], 'chance');
        this.box05.setScale(SCALE);

        this.box04 = this.add.image(this.casesX[3], this.casesY[3], 'empty');
        this.box04.setScale(SCALE);

        this.box03 = this.add.image(this.casesX[2], this.casesY[2], 'coins');
        this.box03.setScale(SCALE);

        this.box02 = this.add.image(this.casesX[1], this.casesY[1], 'benefits');
        this.box02.setScale(SCALE);

        this.box01 = this.add.image(this.casesX[0], this.casesY[0], 'resources');
        this.box01.setScale(SCALE);
        // --------------------
        //Config. infos player.
        // --------------------

        this.socket.on('player', (player) => {

            this.p = player;

            if (this.bd.bank) { // If this.bd.bank existe, la vue à été initialisée (dans view, plus haut).

                this.bd.pawn.setAlpha(ALPHA_PAWN);
                this.bg.pawn.setAlpha(ALPHA_PAWN);
                this.bd.bank.setText(player[0].bank);
                this.bd.coins.setText(player[0].coins);
                if (player[0].cards.meat === true) this.bd.meat.setTexture('card_meat');
                    else this.bd.meat.setTexture('position_cards');
                if (player[0].cards.bread === true) this.bd.bread.setTexture('card_bread');
                    else this.bd.bread.setTexture('position_cards');
                if (player[0].cards.salad === true) this.bd.salad.setTexture('card_salad');
                    else this.bd.salad.setTexture('position_cards');
                if (player[0].cards.sauce === true) this.bd.sauce.setTexture('card_sauce');
                    else this.bd.sauce.setTexture('position_cards');

                this.bg.bank.setText(player[1].bank);
                this.bg.coins.setText(player[1].coins);
                if (player[1].cards.meat === true) this.bg.meat.setTexture('card_meat');
                    else this.bg.meat.setTexture('position_cards');
                if (player[1].cards.bread === true) this.bg.bread.setTexture('card_bread');
                    else this.bg.bread.setTexture('position_cards');
                if (player[1].cards.salad === true) this.bg.salad.setTexture('card_salad');
                    else this.bg.salad.setTexture('position_cards');
                if (player[1].cards.sauce === true) this.bg.sauce.setTexture('card_sauce');
                    else this.bg.sauce.setTexture('position_cards');

                if (player.length > 2) {
                    this.hg.pawn.setAlpha(ALPHA_PAWN);
                    this.hg.bank.setText(player[2].bank);
                    this.hg.coins.setText(player[2].coins);
                    if (player[2].cards.meat === true) this.hg.meat.setTexture('card_meat');
                        else this.hg.meat.setTexture('position_cards');
                    if (player[2].cards.bread === true) this.hg.bread.setTexture('card_bread');
                        else this.hg.meat.setTexture('position_cards');
                    if (player[2].cards.salad === true) this.hg.salad.setTexture('card_salad');
                        else this.hg.meat.setTexture('position_cards');
                    if (player[2].cards.sauce === true) this.hg.sauce.setTexture('card_sauce');
                        else this.hg.meat.setTexture('position_cards');
                }

                if (player.length > 3) {
                    this.hd.pawn.setAlpha(ALPHA_PAWN);
                    this.hd.bank.setText(player[3].bank);
                    this.hd.coins.setText(player[3].coins);
                    if (player[3].cards.meat === true) this.hd.meat.setTexture('card_meat');
                        else this.hd.meat.setTexture('position_cards');
                    if (player[3].cards.bread === true) this.hd.bread.setTexture('card_bread');
                        else this.hd.meat.setTexture('position_cards');
                    if (player[3].cards.salad === true) this.hd.salad.setTexture('card_salad');
                        else this.hd.meat.setTexture('position_cards');
                    if (player[3].cards.sauce === true) this.hd.sauce.setTexture('card_sauce');
                        else this.hd.meat.setTexture('position_cards');
                }

                setTimeout(playersPositions, TIME_THIMBLE, this);

                function playersPositions(this0) {
                    this0.bd.pawn.setPosition(this0.casesX[this0.p[0].position-1], this0.casesY[this0.p[0].position-1]);
                    this0.bg.pawn.setPosition(this0.casesX[this0.p[1].position-1], this0.casesY[this0.p[1].position-1]);

                    if (this0.p.length > 2) this0.hg.pawn.setPosition(this0.casesX[this0.p[2].position-1], this0.casesY[this0.p[2].position-1]);

                    if (this0.p.length > 3) this0.hd.pawn.setPosition(this0.casesX[this0.p[3].position-1], this0.casesY[this0.p[3].position-1]);
                }
            }
        });

        // Music.
        var music = this.sound.add('music', {volume: (settings.music/100)});
        music.setLoop(true);
        music.play();


        // Tour de jeu et dé.
        this.thimbleButton = this.add.image(width/2, height-100, 'btn_thimble').setDepth(4).setInteractive();
        this.thimbleButton.visible = false;

        this.socket.on('play', (num) => {
            this.socket.emit('goTurn');
        })

        this.socket.on('yourTurn', (timerAlert) => {
            var thimbleView = this.thimbleButton;

            setTimeout(function(){ // Pour éviter adversaire déco.
                thimbleView.visible = true;
            }, TIME_THIMBLE);

            this.alertDecoMsg = setTimeout(alertDeco, timerAlert-10000, this);

            function alertDeco(this0) {
                this0.alertDeco.visible = true;
            }
        })

        this.thimbleButton.on('pointerdown', () => {
            clearTimeout(this.alertDecoMsg);
            this.socket.emit('thimble', true);
            this.alertDeco.visible = false;
            this.thimbleButton.visible = false;
        });

        this.bd.move = 0;
        this.bg.move = 0;
        this.hg.move = 0;
        this.hd.move = 0;

        this.socket.on('down', () => {
            this.socket.close()
            this.socket.open()
        })


        // Si joueur ne répond pas.
        this.socket.on('playerOut', () => {
            window.location.href = '/jeu/salon';
        })

        this.socket.on('missingPlayer', () => {
            this.modal.visible = true;
            this.text.visible = true;
            this.title.visible = true;
            this.title.setText('Fin de la partie.');
            this.text.setText('Un adversaire semble avoir disparu.\nTu vas être redirigé dans le salon.\nTu n\'as pas perdu de Coins.').setPosition(width/2, height/2-20);
            var backToLobby = this.add.image(width/2, height/2+100, 'btn_close').setDepth(107).setInteractive();

            backToLobby.on('pointerdown', () => {
                window.location.href = '/jeu/salon';
            });
        })

        // ----------
        //   Modal.
        // ----------
        // Chance.

        this.modal = this.add.image(width/2, height/2, 'modal').setDepth(6);
        this.modal.visible = false;

        this.modalChance = this.add.image(width/2, height/2-100, 'modal_chance').setDepth(6);
        this.modalChance.visible = false;

        this.modalAttack = this.add.image(width/2, height/2-100, 'modal_attack').setDepth(6);
        this.modalAttack.visible = false;

        this.modalBank = this.add.image(width/2, height/2-100, 'modal_bank').setDepth(6);
        this.modalBank.visible = false;

        this.title = this.add.text(width/2, height/2-150, 'Chance', FONT_LEFT).setDepth(7).setOrigin(0.5);
        this.text = this.add.text(width/2, height/2-100, 'text', FONT_LEFT).setDepth(7).setOrigin(0.5);
        this.price = this.add.text(width/2, height/2-150, 'Prix: - Coins', FONT_LEFT).setDepth(7).setOrigin(0.5);

        this.title.visible = false;
        this.text.visible = false;
        this.price.visible = false;

        this.area = [];
        this.btn = [];

        this.btn.take = this.add.image(width/2-120, height/2+50, 'btn_take').setInteractive().setDepth(7);
        this.btn.lose = this.add.image(width/2+120, height/2+50, 'btn_lose').setInteractive().setDepth(7);
        this.btn.take.visible = false;
        this.btn.lose.visible = false;

        this.btn.yes = this.add.image(width/2-120, height/2+50, 'btn_yes').setInteractive().setDepth(7);
        this.btn.no = this.add.image(width/2+120, height/2+50, 'btn_no').setInteractive().setDepth(7);
        this.btn.yes.visible = false;
        this.btn.no.visible = false;

        this.btn.red = this.add.image(width/2-120, height/2+50, 'btn_red').setInteractive().setDepth(7);
        this.btn.redText = this.add.text(width/2-160, height/2+34, 'Bouton', FONT_LEFT).setDepth(7);

        this.btn.green = this.add.image(width/2-120, height/2+120, 'btn_green').setInteractive().setDepth(7);
        this.btn.greenText = this.add.text(width/2-160, height/2+104, 'Bouton', FONT_LEFT).setDepth(7);

        this.btn.blue = this.add.image(width/2+120, height/2+50, 'btn_blue').setInteractive().setDepth(7);
        this.btn.blueText = this.add.text(width/2+80, height/2+34, 'Bouton', FONT_LEFT).setDepth(7);

        this.btn.yellow = this.add.image(width/2+120, height/2+120, 'btn_yellow').setInteractive().setDepth(7);
        this.btn.yellowText = this.add.text(width/2+80, height/2+104, 'Bouton', FONT_LEFT).setDepth(7);

        this.btn.red.visible = false;
        this.btn.redText.visible = false;

        this.btn.green.visible = false;
        this.btn.greenText.visible = false;

        this.btn.blue.visible = false;
        this.btn.blueText.visible = false;

        this.btn.yellow.visible = false;
        this.btn.yellowText.visible = false;


        this.socket.on('modal_chance', (data, text) => {

            setTimeout(chanceTimer, TIME_MODAL, this, data, text);
            function chanceTimer(this0, data, text) {

                this0.text.setText(text);

                var i = 0;

                data.forEach(element => {
                    if (element.id != myId) {
                        switch (element.color) {
                            case 'blue':
                                this0.btn.blue.visible = true;
                                this0.btn.blueText.visible = true;
                                this0.btn.blueText.setText(element.username);
                                this0.btn.blueNum = i;
                                break;
                            case 'red':
                                this0.btn.red.visible = true;
                                this0.btn.redText.visible = true;
                                this0.btn.redText.setText(element.username);
                                this0.btn.redNum = i;
                                break;
                            case 'yellow':
                                this0.btn.yellow.visible = true;
                                this0.btn.yellowText.visible = true;
                                this0.btn.yellowText.setText(element.username);
                                this0.btn.yellowNum = i;
                                break;
                            case 'green':
                                this0.btn.green.visible = true;
                                this0.btn.greenText.visible = true;
                                this0.btn.greenText.setText(element.username);
                                this0.btn.greenNum = i;
                                break;
                            default:
                            console.error('Error: chance button.');
                        }
                    }
                    i++;
                })

                this0.modalChance.visible = true;
                this0.gradient.visible = true;
                this0.text.visible = true;
            }
        })

        this.btn.red.on('pointerdown', () => {
            this.socket.emit('choice_chance', this.btn.redNum);
            console.log(this.btn.redNum);
            this.modalChance.visible = false;
            this.gradient.visible = false;
            this.title.visible = false;
            this.text.visible = false;

            this.btn.red.visible = false;
            this.btn.redText.visible = false;

            this.btn.green.visible = false;
            this.btn.greenText.visible = false;

            this.btn.blue.visible = false;
            this.btn.blueText.visible = false;

            this.btn.yellow.visible = false;
            this.btn.yellowText.visible = false;
        });

        this.btn.green.on('pointerdown', () => {
            this.socket.emit('choice_chance', this.btn.greenNum);
            console.log(this.btn.greenNum);
            this.modalChance.visible = false;
            this.gradient.visible = false;
            this.title.visible = false;
            this.text.visible = false;

            this.btn.red.visible = false;
            this.btn.redText.visible = false;

            this.btn.green.visible = false;
            this.btn.greenText.visible = false;

            this.btn.blue.visible = false;
            this.btn.blueText.visible = false;

            this.btn.yellow.visible = false;
            this.btn.yellowText.visible = false;
        });

        this.btn.blue.on('pointerdown', () => {
            this.socket.emit('choice_chance', this.btn.blueNum);
            console.log(this.btn.blueNum);
            this.modalChance.visible = false;
            this.gradient.visible = false;
            this.title.visible = false;
            this.text.visible = false;

            this.btn.red.visible = false;
            this.btn.redText.visible = false;

            this.btn.green.visible = false;
            this.btn.greenText.visible = false;

            this.btn.blue.visible = false;
            this.btn.blueText.visible = false;

            this.btn.yellow.visible = false;
            this.btn.yellowText.visible = false;
        });

        this.btn.yellow.on('pointerdown', () => {
            this.socket.emit('choice_chance', this.btn.yellowNum);
            this.modalChance.visible = false;
            this.gradient.visible = false;
            this.title.visible = false;
            this.text.visible = false;

            this.btn.red.visible = false;
            this.btn.redText.visible = false;

            this.btn.green.visible = false;
            this.btn.greenText.visible = false;

            this.btn.blue.visible = false;
            this.btn.blueText.visible = false;

            this.btn.yellow.visible = false;
            this.btn.yellowText.visible = false;
        });

        this.socket.on('makeLoseOrWin', (text) => {
            setTimeout(makeLoseOrWinTimer, TIME_MODAL, this, text);

            function makeLoseOrWinTimer(this0, text) {
                this0.modalChance.visible = true;
                this0.gradient.visible = true;
                this0.title.visible = true;
                this0.text.visible = true;
                this0.btn.take.visible = true;
                this0.btn.lose.visible = true;
                this0.text.setText(text);
            }
        })

        this.btn.take.on('pointerdown', () => {
            this.socket.emit('lose-win', 'win');
            this.modalChance.visible = false;
            this.gradient.visible = false;
            this.title.visible = false;
            this.text.visible = false;
            this.btn.take.visible = false;
            this.btn.lose.visible = false;
        });

        this.btn.lose.on('pointerdown', () => {
            this.socket.emit('lose-win', 'lose');
            this.modalChance.visible = false;
            this.gradient.visible = false;
            this.title.visible = false;
            this.text.visible = false;
            this.btn.take.visible = false;
            this.btn.lose.visible = false;
        });

        this.socket.on('destroy', (data, price) => {

            setTimeout(destroyModal, TIME_MODAL, this, data, price);

            function destroyModal(this0, data, price) {
                if (price  === 0) {
                    this0.modalChance.visible = true;
                }else{
                    this0.modalAttack.visible = true;
                }
                this0.gradient.visible = true;
                this0.text.visible = true;
                this0.price.visible = true;
                this0.btn.cancel = this0.add.image(width/2, height/2+100, 'btn_nothing').setDepth(7).setInteractive();
                this0.price.setText('Prix: '+price+' Coins');
                this0.text.setText('Quelle carte voulez-vous détruire?');

                this0.btn.meat = [];
                this0.btn.bread = [];
                this0.btn.salad = [];
                this0.btn.sauce = [];
                this0.area = [];
                this0.area.text = [];

                var space = 0;
                if(data.length === 2) space = 250;
                if(data.length === 3) space = 125;


                data.forEach((element, i) => { // Pour chaque joueur, ajout des 4 btn. + son nom.

                    this0.area[element.color] = this0.add.image((width/2-330)+space, height/2, 'area_'+element.color).setDepth(6.5);
                    this0.area.text[element.color] = this0.add.text((width/2-413)+space+90, height/2-40, element.username, FONT_LEFT).setDepth(7).setOrigin(0.5);
                    if (element.cards.meat === true) this0.btn.meat[element.color] = this0.add.image((width/2-410)+space+5, height/2+17, 'card_meat').setDepth(7).setInteractive().setScale(0.42);
                        else this0.btn.meat[element.color] = this0.add.image((width/2-410)+space+5, height/2+17, 'empty_card').setDepth(7).setScale(0.42);
                    if (element.cards.bread === true) this0.btn.bread[element.color] = this0.add.image((width/2-410)+space+53, height/2+17, 'card_bread').setDepth(7).setInteractive().setScale(0.42);
                        else this0.btn.bread[element.color] = this0.add.image((width/2-410)+space+53, height/2+17, 'empty_card').setDepth(7).setScale(0.42);
                    if (element.cards.salad === true) this0.btn.salad[element.color] = this0.add.image((width/2-410)+space+101, height/2+17, 'card_salad').setDepth(7).setInteractive().setScale(0.42);
                        else this0.btn.salad[element.color] = this0.add.image((width/2-410)+space+101, height/2+17, 'empty_card').setDepth(7).setScale(0.42);
                    if (element.cards.sauce === true) this0.btn.sauce[element.color] = this0.add.image((width/2-410)+space+149, height/2+17, 'card_sauce').setDepth(7).setInteractive().setScale(0.42);
                        else this0.btn.sauce[element.color] = this0.add.image((width/2-410)+space+149, height/2+17, 'empty_card').setDepth(7).setScale(0.42);

                    space += 210;
                })


                this0.btn.meat['blue'].on('pointerdown', () => {
                    this0.socket.emit('destroyed', 'meat-'+data[0].id);
                    console.log('blue m');
                    deleteModal(this0, data);
                });
                this0.btn.bread['blue'].on('pointerdown', () => {
                    this0.socket.emit('destroyed', 'bread-'+data[0].id);
                    console.log('blue b');
                    deleteModal(this0, data);
                });
                this0.btn.salad['blue'].on('pointerdown', () => {
                    this0.socket.emit('destroyed', 'salad-'+data[0].id);
                    console.log('blue sal');
                    deleteModal(this0, data);
                });
                this0.btn.sauce['blue'].on('pointerdown', () => {
                    this0.socket.emit('destroyed', 'sauce-'+data[0].id);
                    console.log('blue sau');
                    deleteModal(this0, data);
                });


                this0.btn.meat['red'].on('pointerdown', () => {
                    this0.socket.emit('destroyed', 'meat-'+data[1].id);
                    console.log('Red m');
                    deleteModal(this0, data);
                });
                this0.btn.bread['red'].on('pointerdown', () => {
                    this0.socket.emit('destroyed', 'bread-'+data[1].id);
                    console.log('Red b');
                    deleteModal(this0, data);
                });
                this0.btn.salad['red'].on('pointerdown', () => {
                    this0.socket.emit('destroyed', 'salad-'+data[1].id);
                    console.log('Red sal');
                    deleteModal(this0, data);
                });
                this0.btn.sauce['red'].on('pointerdown', () => {
                    this0.socket.emit('destroyed', 'sauce-'+data[1].id);
                    console.log('Red sau');
                    deleteModal(this0, data);
                });


                if (data.length > 2) {
                    this0.btn.meat['yellow'].on('pointerdown', () => {
                        this0.socket.emit('destroyed', 'meat-'+data[2].id);
                        console.log('yellow');
                        deleteModal(this0, data);
                    });
                    this0.btn.bread['yellow'].on('pointerdown', () => {
                        this0.socket.emit('destroyed', 'bread-'+data[2].id);
                        console.log('yellow');
                        deleteModal(this0, data);
                    });
                    this0.btn.salad['yellow'].on('pointerdown', () => {
                        this0.socket.emit('destroyed', 'salad-'+data[2].id);
                        console.log('yellow');
                        deleteModal(this0, data);
                    });
                    this0.btn.sauce['yellow'].on('pointerdown', () => {
                        this0.socket.emit('destroyed', 'sauce-'+data[2].id);
                        console.log('yellow');
                        deleteModal(this0, data);
                    });
                }
                if (data.length > 3) {
                    this0.btn.meat['green'].on('pointerdown', () => {
                        this0.socket.emit('destroyed', 'meat-'+data[3].id);
                        console.log('green');
                        deleteModal(this0, data);
                    });
                    this0.btn.bread['green'].on('pointerdown', () => {
                        this0.socket.emit('destroyed', 'bread-'+data[3].id);
                        console.log('green');
                        deleteModal(this0, data);
                    });
                    this0.btn.salad['green'].on('pointerdown', () => {
                        this0.socket.emit('destroyed', 'salad-'+data[3].id);
                        console.log('green');
                        deleteModal(this0, data);
                    });
                    this0.btn.sauce['green'].on('pointerdown', () => {
                        this0.socket.emit('destroyed', 'sauce-'+data[3].id);
                        console.log('green');
                        deleteModal(this0, data);
                    });
                }

                this0.btn.cancel.on('pointerdown', () => {
                    console.log('Cancel');
                    this0.socket.emit('destroyed', false);
                    deleteModal(this0, data);
                });
            }
        });

        // Texte d'infos sur l'écran. Infos.
        this.socket.on('infos', (time, info, sound) => {
            setTimeout( infos, time, this, info, sound)
            function infos(this0, info, sound) {

                if (sound === 'buy') this0.sound.add('buy', {volume: (settings.effect/100)}).play();

                this0.info.setText(info);
                this0.info.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
                this0.info.visible = true;
                this0.gradient.visible = true;

                setTimeout( deleteInfos, 2500, this0)
                function deleteInfos(this0) {
                    this0.info.visible = false;
                    this0.gradient.visible = false;
                }
            }
            console.log(info);
        })

        this.socket.on('chance_getFromEveryone', (data) => {
            console.log('Get from everyone: '+ data);
        })

        this.socket.on('chance_getFromOne', (p, p2, responseRandom) => {
            console.log(p.username +' take in '+ responseRandom + ' from ' +p2.username);
        })

        this.socket.on('resources', (text) => {
            setTimeout(resourcesTimer, TIME_MODAL, this, text);

            function resourcesTimer(this0, text) {
                this0.modalChance.visible = true;
                this0.gradient.visible = true;
                this0.text.visible = true;
                this0.btn.yes.visible = true;
                this0.btn.no.visible = true;
                this0.text.setText(text);
            }
        })
        this.btn.yes.on('pointerdown', () => {
            this.socket.emit('buyResources', true);
            this.modalChance.visible = false;
            this.gradient.visible = false;
            this.text.visible = false;
            this.btn.yes.visible = false;
            this.btn.no.visible = false;
        });

        this.btn.no.on('pointerdown', () => {
            this.socket.emit('buyResources', false);
            this.modalChance.visible = false;
            this.gradient.visible = false;
            this.text.visible = false;
            this.btn.yes.visible = false;
            this.btn.no.visible = false;
        });

        this.socket.on('bank', (data) => {

            setTimeout(bankTimer, TIME_MODAL, this, data);

            function bankTimer(this0, data) {
                if (data.coins >= 5) {
                    var bankNum = 0;
                    this0.text.setText('Combien voulez-vous placer \nà la banque?');
                    this0.btn.inputBank = this0.add.image(width/2, height/2, 'input_bank').setDepth(7);
                    this0.btn.inputBankText = this0.add.text(width/2, height/2, 0, FONT_LEFT).setDepth(7).setOrigin(0.5);
                    this0.btn.up = this0.add.image(width/2+120, height/2, 'arrow_up').setDepth(7).setInteractive().setScale(0.8);
                    this0.btn.down = this0.add.image(width/2+185, height/2, 'arrow_down').setDepth(7).setInteractive().setScale(0.8);
                    this0.btn.ok = this0.add.image(width/2, height/2+80, 'btn_ok').setDepth(7).setInteractive();
                    this0.modalBank.visible = true;
                    this0.gradient.visible = true;
                    this0.text.visible = true;

                    this0.btn.up.on('pointerdown', () => {
                        console.log('Up');
                        if (bankNum < data.coins-4) {
                            bankNum += 5;
                            this0.btn.inputBankText.setText(bankNum);
                        }
                    });
                    this0.btn.down.on('pointerdown', () => {
                        console.log('Down');

                        if (bankNum > 0) {
                            bankNum -= 5;
                            this0.btn.inputBankText.setText(bankNum);
                        }
                    });

                    this0.btn.ok.on('pointerdown', () => {
                        this0.socket.emit('addToBank', bankNum);

                        deleteBank(this0);
                    });
                }else{
                    this0.add.text(width/2, height/2+35, 'Pas de money', FONT_LEFT).setDepth(7);
                    this0.socket.emit('addToBank', 0);
                }
            }
        })

        this.socket.on('endScreen', (winner) => {

            setTimeout(bankTimer, TIME_MODAL, this, winner);

            function endTimer(this0, winner) {
                this0.modal.visible = true;
                this0.gradient.visible = true;
                this0.title.visible = true;
                this0.text.visible = true;
                var salon = this0.add.image(width/2, height/2+80, 'btn_meat').setDepth(7).setInteractive();
                this0.title.setText('#finDuGame');
                this0.text.setText(winner.username + ' remporte la partie! \n Bien joué!');

                salon.on('pointerdown', () => {
                    console.log('Retour salon');

                    window.location.href = '/jeu/salon';
                });
            }
        })

        this.socket.on('errorSocketIo', (data) => {
            switch (data) {
                case 500:
                    console.error('(500): Erreur serveur.');
                    break;
                case 401:
                    console.error('(403): Une authentification est nécéssaire (ou ce compte est déjà utilisé).');
                    break;
                case 410:
                    console.error('(410): La partie a été annulée car vous êtes le seul joueur présent.');
                    break;
                default:
                    console.error('(?): Erreur non-identifiée.');
            }
        })

        this.socket.on('responseThimble', (responseThimble, player) => {
            this.video[responseThimble-1].play();
            this.video[responseThimble-1].visible = true;

            if (player.color === 'blue') this.bd.pawn.setAlpha(1);
            if (player.color === 'red') this.bg.pawn.setAlpha(1);
            if (player.color === 'yellow') this.hg.pawn.setAlpha(1);
            if (player.color === 'green') this.hd.pawn.setAlpha(1);

            var passVideo = this.video;
            var diceSound = this.sound.add('dice');

            setTimeout(dice, 1500, diceSound);
            setTimeout(move, 3000, player, this);
            setTimeout(stopVideo, 5000, this);

            function dice(diceS){
                diceS.play();
            }

            function move(player, this0) {

                var realPosition;

                if (player.position+responseThimble-1 <= 19) realPosition = player.position+responseThimble-1;
                else realPosition = (player.position+responseThimble-1)-20;

                if (player.color === 'blue'){
                    this0.bd.move = responseThimble;
                }

                if (player.color === 'red'){
                    this0.bg.move = responseThimble;
                }

                if (player.color === 'yellow'){
                    this0.hg.move = responseThimble;
                }

                if (player.color === 'green'){
                    this0.hd.move = responseThimble;
                }
            }

            function stopVideo(this0) {
                for (var i = 0; i < 6; i++) {
                    this0.video[i].setCurrentTime(0);
                    this0.video[i].stop();
                    this0.video[i].visible = false;
                }
            }
        })


        // Btn. settings.
        var linkHome = this.add.image(width-15, height/2-30, 'link-home').setOrigin(1, 0.5).setDepth(5).setScale(0.5).setInteractive();
        var linkSettings = this.add.image(width-15, height/2+30, 'link-settings').setOrigin(1, 0.5).setDepth(5).setScale(0.5).setInteractive();

        linkHome.on('pointerdown', () => {
            window.location.href = '/jeu/salon';
        });
        linkSettings.on('pointerdown', () => {
            linkSettings.removeInteractive();
            this.modal.visible = true;
            this.gradient.visible = true;
            this.btn.close = this.add.image(width/2, height/2+150, 'btn_close').setDepth(107).setInteractive();

            this.settingsTitle = this.add.text(width/2, height/2-150, 'Paramètres', FONT_LEFT).setDepth(107).setOrigin(0.5);

            this.musicText = this.add.text(width/2, height/2-100, 'Volume de la musique', FONT_TINY).setDepth(107).setOrigin(0.5);
            this.musicVol = this.add.text(width/2, height/2-60, settings.music+'%', FONT_TINY).setDepth(107).setOrigin(0.5);

            this.effectText = this.add.text(width/2, height/2, 'Volume des effets sonores', FONT_TINY).setDepth(107).setOrigin(0.5);
            this.effectVol = this.add.text(width/2, height/2+40, settings.effect+'%', FONT_TINY).setDepth(107).setOrigin(0.5);

            this.musicUp = this.add.image(width/2+55, height/2-60, 'arrow_up').setDepth(107).setScale(0.5).setInteractive();
            this.musicDown = this.add.image(width/2-55, height/2-60, 'arrow_down').setDepth(107).setScale(0.5).setInteractive();
            this.musicMute = this.add.image(width/2+110, height/2-60, 'btn_mute').setDepth(107).setScale(0.5).setInteractive();

            this.effectUp = this.add.image(width/2+55, height/2+40, 'arrow_up').setDepth(107).setScale(0.5).setInteractive();
            this.effectDown = this.add.image(width/2-55, height/2+40, 'arrow_down').setDepth(107).setScale(0.5).setInteractive();
            this.effectMute = this.add.image(width/2+110, height/2+40, 'btn_mute').setDepth(107).setScale(0.5).setInteractive();

            this.musicDown.on('pointerdown', () => {
                if (settings.music > 0) {
                    settings.music = parseInt(settings.music)-10;
                    window.localStorage.setItem('settingsTJS', JSON.stringify({music: settings.music, effect: settings.effect, bgImg: true}));
                    this.musicVol.setText(settings.music+'%');
                    music.setVolume(settings.music/100);
                }
            })
            this.musicUp.on('pointerdown', () => {
                if (settings.music < 100) {
                    settings.music = parseInt(settings.music)+10;
                    window.localStorage.setItem('settingsTJS', JSON.stringify({music: settings.music, effect: settings.effect, bgImg: true}));
                    this.musicVol.setText(settings.music+'%');
                    music.setVolume(settings.music/100);
                }
            })
            this.effectUp.on('pointerdown', () => {
                if (settings.effect < 100) {
                    settings.effect = parseInt(settings.effect)+10;
                    window.localStorage.setItem('settingsTJS', JSON.stringify({music: settings.music, effect: settings.effect, bgImg: true}));
                    this.effectVol.setText(settings.effect+'%');
                }
            })
            this.effectDown.on('pointerdown', () => {
                if (settings.effect > 0) {
                    settings.effect = parseInt(settings.effect)-10;
                    window.localStorage.setItem('settingsTJS', JSON.stringify({music: settings.music, effect: settings.effect, bgImg: true}));
                    this.effectVol.setText(settings.effect+'%');
                }
            })
            this.musicMute.on('pointerdown', () => {
                settings.music = 0;
                window.localStorage.setItem('settingsTJS', JSON.stringify({music: settings.music, effect: settings.effect, bgImg: true}));
                this.musicVol.setText(settings.music+'%');
                music.setVolume(0);
            })
            this.effectMute.on('pointerdown', () => {
                settings.effect = 0;
                window.localStorage.setItem('settingsTJS', JSON.stringify({music: settings.music, effect: settings.effect, bgImg: true}));
                this.effectVol.setText(settings.effect+'%');
            })

            this.btn.close.on('pointerdown', () => {
                this.modal.visible = false;
                this.gradient.visible = false;
                this.btn.close.destroy();
                this.settingsTitle.destroy();
                this.musicText.destroy();
                this.musicVol.destroy();
                this.effectText.destroy();
                this.effectVol.destroy();

                this.musicUp.destroy();
                this.musicDown.destroy();
                this.effectUp.destroy();
                this.effectDown.destroy();
                this.musicMute.destroy();
                this.effectMute.destroy();
                linkSettings.setInteractive();
            });
        });

    } // Fin Create.


    function update(){
        if (this.bd.move > 0) {
            if (this.bd.pawn.y > height/2 && this.bd.pawn.x <= width/2) {
                this.bd.pawn.x -= WUNIT/ANIMATION_TIMER;
                this.bd.pawn.y -= HUNIT/ANIMATION_TIMER;
            }else if (this.bd.pawn.y <= height/2 && this.bd.pawn.x < width/2) {
                this.bd.pawn.x += WUNIT/ANIMATION_TIMER;
                this.bd.pawn.y -= HUNIT/ANIMATION_TIMER;
            }else if (this.bd.pawn.y < height/2 && this.bd.pawn.x >= width/2) {
                this.bd.pawn.x += WUNIT/ANIMATION_TIMER;
                this.bd.pawn.y += HUNIT/ANIMATION_TIMER;
            }else{
                this.bd.pawn.x -= WUNIT/ANIMATION_TIMER;
                this.bd.pawn.y += HUNIT/ANIMATION_TIMER;
            }
            this.bd.move -= 1/ANIMATION_TIMER;
        }
        if (this.bg.move > 0) {
            if (this.bg.pawn.y > height/2 && this.bg.pawn.x <= width/2) {
                this.bg.pawn.x -= WUNIT/ANIMATION_TIMER;
                this.bg.pawn.y -= HUNIT/ANIMATION_TIMER;
            }else if (this.bg.pawn.y <= height/2 && this.bg.pawn.x < width/2) {
                this.bg.pawn.x += WUNIT/ANIMATION_TIMER;
                this.bg.pawn.y -= HUNIT/ANIMATION_TIMER;
            }else if (this.bg.pawn.y < height/2 && this.bg.pawn.x >= width/2) {
                this.bg.pawn.x += WUNIT/ANIMATION_TIMER;
                this.bg.pawn.y += HUNIT/ANIMATION_TIMER;
            }else{
                this.bg.pawn.x -= WUNIT/ANIMATION_TIMER;
                this.bg.pawn.y += HUNIT/ANIMATION_TIMER;
            }
            this.bg.move -= 1/ANIMATION_TIMER;
        }
        if (this.hg.move > 0) {
            if (this.hg.pawn.y > height/2 && this.hg.pawn.x <= width/2) {
                this.hg.pawn.x -= WUNIT/ANIMATION_TIMER;
                this.hg.pawn.y -= HUNIT/ANIMATION_TIMER;
            }else if (this.hg.pawn.y <= height/2 && this.hg.pawn.x < width/2) {
                this.hg.pawn.x += WUNIT/ANIMATION_TIMER;
                this.hg.pawn.y -= HUNIT/ANIMATION_TIMER;
            }else if (this.hg.pawn.y < height/2 && this.hg.pawn.x >= width/2) {
                this.hg.pawn.x += WUNIT/ANIMATION_TIMER;
                this.hg.pawn.y += HUNIT/ANIMATION_TIMER;
            }else{
                this.hg.pawn.x -= WUNIT/ANIMATION_TIMER;
                this.hg.pawn.y += HUNIT/ANIMATION_TIMER;
            }
            this.hg.move -= 1/ANIMATION_TIMER;
        }
        if (this.hd.move > 0) {
            if (this.hd.pawn.y > height/2 && this.hd.pawn.x <= width/2) {
                this.hd.pawn.x -= WUNIT/ANIMATION_TIMER;
                this.hd.pawn.y -= HUNIT/ANIMATION_TIMER;
            }else if (this.hd.pawn.y <= height/2 && this.hd.pawn.x < width/2) {
                this.hd.pawn.x += WUNIT/ANIMATION_TIMER;
                this.hd.pawn.y -= HUNIT/ANIMATION_TIMER;
            }else if (this.hd.pawn.y < height/2 && this.hd.pawn.x >= width/2) {
                this.hd.pawn.x += WUNIT/ANIMATION_TIMER;
                this.hd.pawn.y += HUNIT/ANIMATION_TIMER;
            }else{
                this.hd.pawn.x -= WUNIT/ANIMATION_TIMER;
                this.hd.pawn.y += HUNIT/ANIMATION_TIMER;
            }
            this.hd.move -= 1/ANIMATION_TIMER;
        }
    }

    // Efface modal attack (ou chance).
    function deleteModal(thisObj, data) {
        data.forEach((element, i) => {
            thisObj.area[element.color].destroy();
            thisObj.area.text[element.color].destroy();
            thisObj.btn.meat[element.color].destroy();
            thisObj.btn.bread[element.color].destroy();
            thisObj.btn.salad[element.color].destroy();
            thisObj.btn.sauce[element.color].destroy();
        });

        thisObj.btn.cancel.destroy();
        thisObj.modalAttack.visible = false;
        thisObj.modalChance.visible = false;
        thisObj.gradient.visible = false;
        thisObj.title.visible = false;
        thisObj.text.visible = false;
        thisObj.price.visible = false;
    }

    function deleteBank(thisObj){
        thisObj.btn.inputBank.destroy();
        thisObj.btn.inputBankText.destroy();
        thisObj.btn.up.destroy();
        thisObj.btn.down.destroy();
        thisObj.btn.ok.destroy();
        thisObj.modalBank.visible = false;
        thisObj.gradient.visible = false;
        thisObj.title.visible = false;
        thisObj.text.visible = false;
    }
});
