// View.

$( document ).ready(function() {
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
    const ANIMATION_TIMER = 10;
    const ALPHA_PAWN = 0.7;

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

        // pawn.
        this.load.image('pawn_flamingo', '../assets/images/pawn_flamingo.png');
        this.load.image('pawn_fox', '../assets/images/pawn_fox.png');
        this.load.image('pawn_turtle', '../assets/images/pawn_turtle.png');


        // Musiques et son.
        this.load.audio('music', '../assets/sounds/music.mp3');

        // thimble.
        this.load.video('video06', '../assets/videos/6.webm');
        this.load.video('video05', '../assets/videos/5.webm');
        this.load.video('video04', '../assets/videos/4.webm');
        this.load.video('video03', '../assets/videos/3.webm');
        this.load.video('video02', '../assets/videos/2.webm');
        this.load.video('video01', '../assets/videos/1.webm');

    }

    function create (){

        var music = this.sound.add('music');
        music.setLoop(true);
        music.play();

        this.gradient = this.add.image(width/2, height/2, 'gradient').setOrigin(0.5, 0.5).setDepth(5);
        this.gradient.visible = false;

        this.video = [];

        this.video[5] = this.add.video(width/2, 0, 'video06').setDepth(4).setOrigin(0.5, 0).setScale(0.8);
        this.video[4] = this.add.video(width/2, 0, 'video05').setDepth(4).setOrigin(0.5, 0).setScale(0.8);
        this.video[3] = this.add.video(width/2, 0, 'video04').setDepth(4).setOrigin(0.5, 0).setScale(0.8);
        this.video[2] = this.add.video(width/2, 0, 'video03').setDepth(4).setOrigin(0.5, 0).setScale(0.8);
        this.video[1] = this.add.video(width/2, 0, 'video02').setDepth(4).setOrigin(0.5, 0).setScale(0.8);
        this.video[0] = this.add.video(width/2, 0, 'video01').setDepth(4).setOrigin(0.5, 0).setScale(0.8);

        // this.nb = 0;
        this.bd = [];
        this.bg = [];
        this.hg = [];
        this.hd = [];

        this.casesX = [width/2, (width/2)-WUNIT, (width/2)-WUNIT*2, (width/2)-WUNIT*3, (width/2)-WUNIT*4, (width/2)-WUNIT*5, (width/2)-WUNIT*4, (width/2)-WUNIT*3, (width/2)-WUNIT*2, (width/2)-WUNIT, width/2, (width/2)+WUNIT, (width/2)+WUNIT*2, (width/2)+WUNIT*3, (width/2)+WUNIT*4, (width/2)+WUNIT*5, (width/2)+WUNIT*4, (width/2)+WUNIT*3, (width/2)+WUNIT*2, (width/2)+WUNIT]
        this.casesY = [(height/2)+HUNIT*5, (height/2)+HUNIT*4, (height/2)+HUNIT*3, (height/2)+HUNIT*2, (height/2)+HUNIT, height/2, (height/2)-HUNIT, (height/2)-HUNIT*2, (height/2)-HUNIT*3, (height/2)-HUNIT*4, (height/2)-HUNIT*5, (height/2)-HUNIT*4, (height/2)-HUNIT*3, (height/2)-HUNIT*2, (height/2)-HUNIT*1, height/2, (height/2)+HUNIT, (height/2)+HUNIT*2, (height/2)+HUNIT*3, (height/2)+HUNIT*4];
        // var initialized = false;

        // connection settings.
        this.socket = io.connect('/A'+idGame[1]);

        var myId = $.cookie("myId");
        var me;

        this.socket.emit('fine', function (result) {
            console.info("%c"+result.msg+" 🥰", "color: lightgreen");
            // console.info("%c"+result.nb, "color: red");
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

            this.bd.pawn = this.add.image(this.casesX[(playerForStart[0].position)-1], this.casesY[(playerForStart[0].position)-1], 'pawn_flamingo').setScale(SCALE/1.5).setOrigin(0.5, 1).setAlpha(ALPHA_PAWN);

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

            this.bg.pawn = this.add.image(this.casesX[(playerForStart[1].position)-1], this.casesY[(playerForStart[1].position)-1], 'pawn_turtle').setScale(SCALE/1.5).setOrigin(0.5, 1).setAlpha(ALPHA_PAWN);

            if (playerForStart.length > 2) {
                this.hg.bread = this.add.image(43, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.hg.meat = this.add.image(119, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.hg.salad = this.add.image(195, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.hg.sauce = this.add.image(271, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.add.image(500/2*SCALE_TEXT, 222/2*SCALE_TEXT, 'cadre_yellow').setScale(SCALE_TEXT).setRotation(3.14);
                this.add.image(200, 75, 'block').setScale(SCALE_TEXT);
                this.hg.username = this.add.text(140, 10, playerForStart[2].username, FONT_LEFT);
                this.hg.img = this.add.image(60, 55, playerForStart[2].img);
                this.hg.bank = this.add.text(215, 45, playerForStart[2].bank, FONT_MONEY);
                this.hg.coins = this.add.text(135, 45, playerForStart[2].coins, FONT_MONEY);

                this.hg.pawn = this.add.image(this.casesX[(playerForStart[2].position)-1], this.casesY[(playerForStart[2].position)-1]-75, 'pawn_fox').setScale(SCALE/1.5).setOrigin(0.5, 1).setAlpha(ALPHA_PAWN);
            }

            if (playerForStart.length > 3) {
                this.hd.bread = this.add.image(width-43, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.hd.meat = this.add.image(width-119, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.hd.salad = this.add.image(width-195, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.hd.sauce = this.add.image(width-271, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                this.add.image(width-(500/2)*SCALE_TEXT, 222/2*SCALE_TEXT, 'cadre_green').setScale(SCALE_TEXT).setRotation(3.14);
                this.add.image(width-200, 75, 'block').setScale(SCALE_TEXT);
                this.hd.username = this.add.text(width-260, 10, playerForStart[3].username, FONT_RIGHT);
                this.hd.img = this.add.image(width-60, 55, playerForStart[3].img);
                this.hd.bank = this.add.text( width-135, 45, playerForStart[3].bank, FONT_MONEY);
                this.hd.coins = this.add.text(width-215, 45, playerForStart[3].coins, FONT_MONEY);

                this.hd.pawn = this.add.image(this.casesX[(playerForStart[3].position)-1], this.casesY[(playerForStart[3].position)-1]-75, 'pawn_fox').setScale(SCALE/1.5).setOrigin(0.5, 1).setAlpha(ALPHA_PAWN);
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

        console.log(this.box16.y);
        // --------------------
        //Config. infos player.
        // --------------------

        this.socket.on('player', (player) => {

            this.p = player;
            this.gradient.visible = false;

            if (this.bd.bank) { // If this.bd.bank existe, la vue à été initialisée (dans view, plus haut).

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
            }
        });


        // Tour de jeu et dé.
        this.thimbleButton = this.add.image(width/2, height-100, 'btn_thimble').setDepth(4).setInteractive();
        this.thimbleButton.visible = false;

        this.socket.on('play', () => {
            console.log('Play');
            this.socket.emit('goTurn');
        })

        this.socket.on('yourTurn', (pop) => {
            var thimbleView = this.thimbleButton;

            setTimeout(function(){ // Pour éviter adversaire déco.
                thimbleView.visible = true;
            }, 1000);
        })

        this.thimbleButton.on('pointerdown', () => {
            this.socket.emit('thimble', true);
            this.thimbleButton.visible = false;
        });

        this.bd.move = 0;
        this.bg.move = 0;
        this.hg.move = 0;
        this.hd.move = 0;

        this.socket.on('down', () => {
            this.socket.close()
            this.socket.open()
            // socket.reload()
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

        this.title = this.add.text(width/2-160, height/2-150, 'Chance', FONT_LEFT).setDepth(7);
        this.text = this.add.text(width/2-160, height/2-100, 'text', FONT_LEFT).setDepth(7);
        this.price = this.add.text(width/2+160, height/2-150, 'Prix: - Coins', FONT_LEFT).setDepth(7);

        this.title.visible = false;
        this.text.visible = false;
        this.price.visible = false;

        this.area = [];
        this.btn = [];

        this.btn.take = this.add.image(width/2-120, height/2+50, 'btn_take').setInteractive().setDepth(7);
        this.btn.lose = this.add.image(width/2+120, height/2+50, 'btn_lose').setInteractive().setDepth(7);

        this.btn.take.visible = false;
        this.btn.lose.visible = false;

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

            setTimeout(chanceTimer, 3000, this);

            // this.modalChance.visible = true;
            // this.gradient.visible = true;
            // // this.title.visible = true;
            // this.text.visible = true;
            this.text.setText(text);

            var i = 0;

            data.forEach(element => {
                if (element.id != myId) {
                    switch (element.color) {
                        case 'blue':
                            this.btn.blue.visible = true;
                            this.btn.blueText.visible = true;
                            this.btn.blueText.setText(element.username);
                            this.btn.blueNum = i;
                            break;
                        case 'red':
                            this.btn.red.visible = true;
                            this.btn.redText.visible = true;
                            this.btn.redText.setText(element.username);
                            this.btn.redNum = i;
                            break;
                        case 'yellow':
                            this.btn.yellow.visible = true;
                            this.btn.yellowText.visible = true;
                            this.btn.yellowText.setText(element.username);
                            this.btn.yellowNum = i;
                            break;
                        case 'green':
                            this.btn.green.visible = true;
                            this.btn.greenText.visible = true;
                            this.btn.greenText.setText(element.username);
                            this.btn.greenNum = i;
                            break;
                        default:
                        console.error('Error: chance button.');
                    }
                }
                i++;
            })
        })

        this.btn.red.on('pointerdown', () => {
            this.socket.emit('choice_chance', this.btn.redNum);
            console.log(this.btn.redNum);
            this.modalChance.visible = false;
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
            this.modalChance.visible = true;
            this.gradient.visible = true;
            this.title.visible = true;
            this.text.visible = true;
            this.btn.take.visible = true;
            this.btn.lose.visible = true;
            this.text.setText(text);
        })

        this.btn.take.on('pointerdown', () => {
            this.socket.emit('lose-win', 'win');
            this.modalChance.visible = false;
            this.title.visible = false;
            this.text.visible = false;
            this.btn.take.visible = false;
            this.btn.lose.visible = false;
        });

        this.btn.lose.on('pointerdown', () => {
            this.socket.emit('lose-win', 'lose');
            this.modalChance.visible = false;
            this.title.visible = false;
            this.text.visible = false;
            this.btn.take.visible = false;
            this.btn.lose.visible = false;
        });

        this.socket.on('destroy', (data, price, title) => {

            if (price  === 0) {
                this.modalChance.visible = true;
            }else{
                this.modalAttack.visible = true;
            }
            this.gradient.visible = true;
            this.title.visible = true;
            this.text.visible = true;
            this.price.visible = true;
            this.btn.cancel = this.add.image(width/2, height/2+100, 'btn_meat').setDepth(7).setInteractive();
            this.title.setText(title);
            this.price.setText('Prix: '+price+' Coins');
            this.text.setText('Quelle carte voulez-vous détruire?');

            this.btn.meat = [];
            this.btn.bread = [];
            this.btn.salad = [];
            this.btn.sauce = [];
            this.area = [];
            this.area.text = [];

            data.forEach((element, i) => { // Pour chaque joueur, ajout des 4 btn. + son nom.
                this.area[element.color] = this.add.image( (width/2-270)+i*180, height/2, 'area_'+element.color).setDepth(6.5);
                this.area.text[element.color] = this.add.text((width/2-310)+i*180, height/2-50, element.username, FONT_LEFT).setDepth(7);
                this.btn.meat[element.color] = this.add.image((width/2-335)+i*180, height/2, 'btn_meat').setDepth(7).setInteractive();
                this.btn.bread[element.color] = this.add.image((width/2-290)+i*180, height/2, 'btn_bread').setDepth(7).setInteractive();
                this.btn.salad[element.color] = this.add.image((width/2-245)+i*180, height/2, 'btn_salad').setDepth(7).setInteractive();
                this.btn.sauce[element.color] = this.add.image((width/2-200)+i*180, height/2, 'btn_sauce').setDepth(7).setInteractive();
            })


            this.btn.meat['blue'].on('pointerdown', () => {
                this.socket.emit('destroyed', 'meat-'+data[0].id);
                console.log('blue m');
                deleteModal(this, data);
            });
            this.btn.bread['blue'].on('pointerdown', () => {
                this.socket.emit('destroyed', 'bread-'+data[0].id);
                console.log('blue b');
                deleteModal(this, data);
            });
            this.btn.salad['blue'].on('pointerdown', () => {
                this.socket.emit('destroyed', 'salad-'+data[0].id);
                console.log('blue sal');
                deleteModal(this, data);
            });
            this.btn.sauce['blue'].on('pointerdown', () => {
                this.socket.emit('destroyed', 'sauce-'+data[0].id);
                console.log('blue sau');
                deleteModal(this, data);
            });


            this.btn.meat['red'].on('pointerdown', () => {
                this.socket.emit('destroyed', 'meat-'+data[1].id);
                console.log('Red m');
                deleteModal(this, data);
            });
            this.btn.bread['red'].on('pointerdown', () => {
                this.socket.emit('destroyed', 'bread-'+data[1].id);
                console.log('Red b');
                deleteModal(this, data);
            });
            this.btn.salad['red'].on('pointerdown', () => {
                this.socket.emit('destroyed', 'salad-'+data[1].id);
                console.log('Red sal');
                deleteModal(this, data);
            });
            this.btn.sauce['red'].on('pointerdown', () => {
                this.socket.emit('destroyed', 'sauce-'+data[1].id);
                console.log('Red sau');
                deleteModal(this, data);
            });


            if (data.length > 2) {
                this.btn.meat['yellow'].on('pointerdown', () => {
                    this.socket.emit('destroyed', 'meat-'+data[2].id);
                    console.log('yellow');
                    deleteModal(this, data);
                });
                this.btn.bread['yellow'].on('pointerdown', () => {
                    this.socket.emit('destroyed', 'bread-'+data[2].id);
                    console.log('yellow');
                    deleteModal(this, data);
                });
                this.btn.salad['yellow'].on('pointerdown', () => {
                    this.socket.emit('destroyed', 'salad-'+data[2].id);
                    console.log('yellow');
                    deleteModal(this, data);
                });
                this.btn.sauce['yellow'].on('pointerdown', () => {
                    this.socket.emit('destroyed', 'sauce-'+data[2].id);
                    console.log('yellow');
                    deleteModal(this, data);
                });
            }
            if (data.length > 3) {
                this.btn.meat['green'].on('pointerdown', () => {
                    this.socket.emit('destroyed', 'meat-'+data[3].id);
                    console.log('green');
                    deleteModal(this, data);
                });
                this.btn.bread['green'].on('pointerdown', () => {
                    this.socket.emit('destroyed', 'bread-'+data[3].id);
                    console.log('green');
                    deleteModal(this, data);
                });
                this.btn.salad['green'].on('pointerdown', () => {
                    this.socket.emit('destroyed', 'salad-'+data[3].id);
                    console.log('green');
                    deleteModal(this, data);
                });
                this.btn.sauce['green'].on('pointerdown', () => {
                    this.socket.emit('destroyed', 'sauce-'+data[3].id);
                    console.log('green');
                    deleteModal(this, data);
                });
            }


            this.btn.cancel.on('pointerdown', () => {
                console.log('Cancel');
                this.socket.emit('destroyed', false);
                deleteModal(this, data);
            });
        });

        this.socket.on('chance_giveForEveryone', (data) => {
            console.log('Give for everyone: '+ data);
        })

        this.socket.on('chance_getFromEveryone', (data) => {
            console.log('Get from everyone: '+ data);
        })

        this.socket.on('chance_giveForOne', (p, p2, responseRandom) => {
            console.log(p.username +' gives '+ responseRandom + ' for ' +p2.username);
        })

        this.socket.on('chance_getFromOne', (p, p2, responseRandom) => {
            console.log(p.username +' take in '+ responseRandom + ' from ' +p2.username);
        })

        this.socket.on('bank', (data) => {
            console.log('Go bank');
            console.log(data);

            if (data.coins >= 5) {
                var bankNum = 0;

                this.title.setText('Banque');
                this.text.setText('Combien voulez-vous placer \nà la banque?');
                this.btn.inputBank = this.add.image(width/2, height/2, 'btn_blue').setDepth(7);
                this.btn.inputBankText = this.add.text(width/2, height/2+35, 0, FONT_LEFT).setDepth(7);
                this.btn.up = this.add.image(width/2+100, height/2, 'btn_meat').setDepth(7).setInteractive();
                this.btn.down = this.add.image(width/2+140, height/2, 'btn_meat').setDepth(7).setInteractive();
                this.btn.ok = this.add.image(width/2, height/2+80, 'btn_meat').setDepth(7).setInteractive();
                this.modalBank.visible = true;
                this.gradient.visible = true;
                this.title.visible = true;
                this.text.visible = true;

                this.btn.up.on('pointerdown', () => {
                    console.log('Up');
                    if (bankNum < data.coins-4) {
                        bankNum += 5;
                        this.btn.inputBankText.setText(bankNum);
                    }
                });
                this.btn.down.on('pointerdown', () => {
                    console.log('Down');

                    if (bankNum > 0) {
                        bankNum -= 5;
                        this.btn.inputBankText.setText(bankNum);
                    }
                });

                this.btn.ok.on('pointerdown', () => {
                    this.socket.emit('addToBank', bankNum);

                    deleteBank(this);
                });
            }else{
                this.add.text(width/2, height/2+35, 'Pas de money', FONT_LEFT).setDepth(7);
                this.socket.emit('addToBank', 0);
            }
        })

        this.socket.on('endScreen', (winner) => {
            this.modal.visible = true;
            this.gradient.visible = true;
            this.title.visible = true;
            this.text.visible = true;
            var salon = this.add.image(width/2, height/2+80, 'btn_meat').setDepth(7).setInteractive();
            this.title.setText('#finDuGame');
            this.text.setText(winner.username + ' remporte la partie! \n Bien joué!');

            salon.on('pointerdown', () => {
                console.log('Retour salon');

                window.location.href = '/jeu/salon';
            });
        })

        this.socket.on('errorSocketIo', (data) => {
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

        this.socket.on('responseThimble', (responseThimble, player) => {
            console.log(responseThimble);

            console.log('video');
            this.video[responseThimble-1].play();
            this.video[responseThimble-1].visible = true;

            var passVideo = this.video;

            setTimeout(move, 3000, player, this);
            setTimeout(stopVideo, 5000, this);

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
                    console.log('cc');
                    this0.video[i].setCurrentTime(0);
                    this0.video[i].stop();
                    this0.video[i].visible = false;
                }
            }
        })
    } // Fin Create.


    function update(){
        if (this.bd.move > 0) {
            this.bd.pawn.setAlpha(1);
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

            setTimeout(replaceBd, 2000, this);

            // setTimeout(replacePawn, 1000, player, this);
            //
            // function replacePawn(player, this0) {
            //
            //     this0.bg.pawn.x = this0.casesX[(player[1].position)-1];
            //     this0.bg.pawn.y = this0.casesY[(player[1].position)-1];
            // }
        }
        if (this.bg.move > 0) {
            this.bg.pawn.setAlpha(1);
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

            setTimeout(replaceBg, 2000, this);
        }
        if (this.hg.move > 0) {
            this.hg.pawn.setAlpha(1);
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

            setTimeout(replaceHg, 2000, this);
        }
        if (this.hd.move > 0) {
            this.hd.pawn.setAlpha(1);
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

            setTimeout(replaceHd, 2000, this);
        }
    }

    function replaceBd(this0){
        this0.bd.pawn.setAlpha(ALPHA_PAWN);
        this0.bd.pawn.x = this0.casesX[(this0.p[0].position)-1];
        this0.bd.pawn.y = this0.casesY[(this0.p[0].position)-1];
    }

    function replaceBg(this0){
        this0.bg.pawn.setAlpha(ALPHA_PAWN);
        this0.bg.pawn.x = this0.casesX[(this0.p[1].position)-1];
        this0.bg.pawn.y = this0.casesY[(this0.p[1].position)-1];
    }

    function replaceHg(this0){
        this0.hg.pawn.setAlpha(ALPHA_PAWN);
        this0.hg.pawn.x = this0.casesX[(this0.p[2].position)-1];
        this0.hg.pawn.y = this0.casesY[(this0.p[2].position)-1];
    }

    function replaceHd(this0){
        this0.hd.pawn.setAlpha(ALPHA_PAWN);
        this0.hd.pawn.x = this0.casesX[(this0.p[3].position)-1];
        this0.hd.pawn.y = this0.casesY[(this0.p[3].position)-1];
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
        thisObj.title.visible = false;
        thisObj.text.visible = false;
    }

    function chanceTimer(this0) {
        this0.modalChance.visible = true;
        this0.gradient.visible = true;
        this0.text.visible = true;
    }
});
