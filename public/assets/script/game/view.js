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

    var config = {
            type: Phaser.AUTO,
            width: width,
            height: height,
            backgroundColor:0xC5BF89,
            scene: {
                preload: preload,
                create: create
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
        this.load.image('cadre', '../assets/images/cadre_bd.png');
        this.load.image('cadre02', '../assets/images/cadre_bg.png');
        this.load.image('position_cards', '../assets/images/position_cards@2x.png');
        this.load.image('block', '../assets/images/block.png');

        // Img player.
        this.load.image('img-00', '../assets/images/_img-00_x90.png');
        this.load.image('img-01', '../assets/images/_img-01_x90.png');
        this.load.image('img-02', '../assets/images/_img-02_x90.png');
        this.load.image('img-03', '../assets/images/_img-03_x90.png');
        this.load.image('img-04', '../assets/images/_img-04_x90.png');


        // Modal.
        this.load.image('modal', '../assets/images/modal_01.png');

        this.load.image('btn_blue', '../assets/images/btn_blue.png');
        this.load.image('btn_red', '../assets/images/btn_red.png');
        this.load.image('btn_green', '../assets/images/btn_green.png');
        this.load.image('btn_yellow', '../assets/images/btn_yellow.png');
    }

    function create (){

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


        // ---------
        //   BOXES
        // ---------

        // Haut.
        var box11 = this.add.image(width/2, (height/2)-HUNIT*5, 'resources');
        box11.setScale(SCALE);

        var box12 = this.add.image((width/2)+WUNIT, (height/2)-HUNIT*4, 'benefits');
        box12.setScale(SCALE);

        var box13 = this.add.image((width/2)+WUNIT*2, (height/2)-HUNIT*3, 'coins');
        box13.setScale(SCALE);

        var box14 = this.add.image((width/2)+WUNIT*3, (height/2)-HUNIT*2, 'empty');
        box14.setScale(SCALE);

        var box15 = this.add.image((width/2)+WUNIT*4, (height/2)-HUNIT*1, 'chance');
        box15.setScale(SCALE);

        var box16 = this.add.image((width/2)+WUNIT*5, height/2, 'resources');
        box16.setScale(SCALE);

        var box10 = this.add.image((width/2)-WUNIT, (height/2)-HUNIT*4, 'chance');
        box10.setScale(SCALE);

        var box09 = this.add.image((width/2)-WUNIT*2, (height/2)-HUNIT*3, 'attack');
        box09.setScale(SCALE);

        var box08 = this.add.image((width/2)-WUNIT*3, (height/2)-HUNIT*2, 'coins');
        box08.setScale(SCALE);

        var box07 = this.add.image((width/2)-WUNIT*4, (height/2)-HUNIT, 'bank');
        box07.setScale(SCALE);

        var box06 = this.add.image((width/2)-WUNIT*5, height/2, 'resources');
        box06.setScale(SCALE);


        // Centre.
        var centrum = this.add.image(width/2, height/2, 'centrum');
        centrum.setScale(SCALE);


        // Bas.
        var box17 = this.add.image((width/2)+WUNIT*4, (height/2)+HUNIT, 'bank');
        box17.setScale(SCALE);

        var box18 = this.add.image((width/2)+WUNIT*3, (height/2)+HUNIT*2, 'coins');
        box18.setScale(SCALE);

        var box19 = this.add.image((width/2)+WUNIT*2, (height/2)+HUNIT*3, 'attack');
        box19.setScale(SCALE);

        var box20 = this.add.image((width/2)+WUNIT, (height/2)+HUNIT*4, 'chance');
        box20.setScale(SCALE);

        var box05 = this.add.image((width/2)-WUNIT*4, (height/2)+HUNIT, 'chance');
        box05.setScale(SCALE);

        var box04 = this.add.image((width/2)-WUNIT*3, (height/2)+HUNIT*2, 'empty');
        box04.setScale(SCALE);

        var box03 = this.add.image((width/2)-WUNIT*2, (height/2)+HUNIT*3, 'coins');
        box03.setScale(SCALE);

        var box02 = this.add.image((width/2)-WUNIT, (height/2)+HUNIT*4, 'benefits');
        box02.setScale(SCALE);

        var box01 = this.add.image(width/2, (height/2)+HUNIT*5, 'resources');
        box01.setScale(SCALE);






        // --------------------
        //Config. infos player.
        // --------------------

        this.bd = [];
        this.bg = [];
        this.hg = [];
        this.hd = [];


        this.socket.on('player', (player) => {

            for (var i = 0; i < player.length; i++) {
                if (player[i].id == myId) {
                    this.me = player[i];
                }
            }

            // BD player.
            var cadre_bd = this.add.image(width-(500/2)*SCALE_TEXT, height-(222/2)*SCALE_TEXT, 'cadre').setScale(SCALE_TEXT);
            var block_bd = this.add.image(width-200, height-32, 'block').setScale(SCALE_TEXT);
            this.bd.bread = this.add.image(width-43, height-200, 'position_cards').setScale(0.64);
            this.bd.meat = this.add.image(width-119, height-200, 'position_cards').setScale(0.64);
            this.bd.salad = this.add.image(width-195, height-200, 'position_cards').setScale(0.64);
            this.bd.sauce = this.add.image(width-271, height-200, 'position_cards').setScale(0.64);

            this.bd.username = this.add.text(width-270, height-100, player[0].username, FONT_RIGHT);
            this.bd.coins = this.add.text(width-265, height-45, player[0].coins+' 💰', FONT_MONEY);
            this.bd.bank = this.add.text(width-185, height-45, player[0].bank+ ' 🏦', FONT_MONEY);
            this.bd.img = this.add.image(width-60, height-55, player[0].img);

            // BG player.
            var cadre_bg = this.add.image(500/2*SCALE_TEXT, height-(222/2)*SCALE_TEXT, 'cadre02').setScale(SCALE_TEXT);
            var block_bg = this.add.image(200, height-32, 'block').setScale(SCALE_TEXT);
            this.bg.bread = this.add.image(43, height-200, 'position_cards').setScale(0.64);
            this.bg.meat = this.add.image(119, height-200, 'position_cards').setScale(0.64);
            this.bg.salad = this.add.image(195, height-200, 'position_cards').setScale(0.64);
            this.bg.sauce = this.add.image(271, height-200, 'position_cards').setScale(0.64);

            this.bg.username = this.add.text(140, height-100, player[1].username, FONT_LEFT);
            this.bg.bank = this.add.text(215, height-45, player[1].bank+ ' 🏦', FONT_MONEY);
            this.bg.coins = this.add.text(135, height-45, player[1].coins+' 💰', FONT_MONEY);
            this.bg.img = this.add.image(60, height-55, player[1].img);

            switch (player.length) {
                case 2:
                    console.log('🟢 '+player.length+' joueurs connectés/affiché');
                break;

                case 3:
                    var cadre_hg = this.add.image(500/2*SCALE_TEXT, 222/2*SCALE_TEXT, 'cadre').setScale(SCALE_TEXT).setRotation(3.14);

                    this.hg.bread = this.add.image(43, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                    this.hg.meat = this.add.image(119, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                    this.hg.salad = this.add.image(195, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                    this.hg.sauce = this.add.image(271, 200, 'position_cards').setScale(0.64).setRotation(3.14);

                    var block_hg = this.add.image(200, 75, 'block').setScale(SCALE_TEXT);
                    this.hg.username = this.add.text(140, 10, player[2].username, FONT_LEFT);
                    this.hg.bank = this.add.text(215, 45, player[2].bank+ ' 🏦', FONT_MONEY);
                    this.hg.coins = this.add.text(135, 45, player[2].coins+' 💰', FONT_MONEY);
                    this.hg.img = this.add.image(60, 55, player[2].img);
                    console.log('🟢 '+player.length+' joueurs connectés/affichés');
                break;

                case 4:
                    // HG Player.
                    this.hg.bread = this.add.image(43, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                    this.hg.meat = this.add.image(119, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                    this.hg.salad = this.add.image(195, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                    this.hg.sauce = this.add.image(271, 200, 'position_cards').setScale(0.64).setRotation(3.14);

                    var cadre_hg = this.add.image(500/2*SCALE_TEXT, 222/2*SCALE_TEXT, 'cadre').setScale(SCALE_TEXT).setRotation(3.14);
                    this.add.image(200, 75, 'block').setScale(SCALE_TEXT);
                    this.hg.username = this.add.text(140, 10, player[2].username, FONT_LEFT);
                    this.hg.bank = this.add.text(215, 45, player[2].bank+ ' 🏦', FONT_MONEY);
                    this.hg.coins = this.add.text(135, 45, player[2].coins+' 💰', FONT_MONEY);
                    this.hg.img = this.add.image(60, 55, player[2].img);

                    // HD Player.
                    var cadre_hd = this.add.image(width-(500/2)*SCALE_TEXT, 222/2*SCALE_TEXT, 'cadre02').setScale(SCALE_TEXT).setRotation(3.14);
                    this.add.image(width-200, 75, 'block').setScale(SCALE_TEXT);
                    this.hd.bread = this.add.image(width-43, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                    this.hd.meat = this.add.image(width-119, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                    this.hd.salad = this.add.image(width-195, 200, 'position_cards').setScale(0.64).setRotation(3.14);
                    this.hd.sauce = this.add.image(width-271, 200, 'position_cards').setScale(0.64).setRotation(3.14);

                    this.hd.username = this.add.text(width-260, 10, player[3].username, FONT_RIGHT);
                    this.hd.bank = this.add.text(width-215, 45, player[3].bank+ ' 🏦', FONT_MONEY);
                    this.hd.coins = this.add.text(width-135, 45, player[3].coins+' 💰', FONT_MONEY);
                    this.hd.img = this.add.image(width-60, 55, player[3].img);

                    console.log('🟢 '+player.length+' joueurs connectés/affichés');
                break;

            default:
                console.error('Erreur de chargement des joueurs');
            }
        })


        // Tour de jeu et dé.
        this.thimbleButton = this.add.text(width/2-100, height-100, '////// 🎲 //////', { fill: '#f0f' }).setInteractive();
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

        this.socket.on('responseThimble', (responseThimble) => {
            console.log(responseThimble);
        })

        this.socket.on('down', () => {
            this.socket.close()
            this.socket.open()
            // socket.reload()
        })


        // Modal.
        // Chance.

        this.modal = this.add.image(width/2, height/2, 'modal').setDepth(0);
        this.modal.visible = false;

        this.title = this.add.text(width/2-160, height/2-150, 'Chance', FONT_LEFT);
        this.text = this.add.text(width/2-160, height/2-50, 'text', FONT_LEFT);

        this.title.visible = false;
        this.text.visible = false;

        this.btn = [];

        this.btn.red = this.add.image(width/2-120, height/2+50, 'btn_red').setInteractive().setDepth(1);
        this.btn.redText = this.add.text(width/2-160, height/2+34, 'Bouton', FONT_LEFT).setDepth(1);

        this.btn.green = this.add.image(width/2-120, height/2+120, 'btn_green').setInteractive().setDepth(1);
        this.btn.greenText = this.add.text(width/2-160, height/2+104, 'Bouton', FONT_LEFT).setDepth(1);

        this.btn.blue = this.add.image(width/2+120, height/2+50, 'btn_blue').setInteractive().setDepth(1);
        this.btn.blueText = this.add.text(width/2+80, height/2+34, 'Bouton', FONT_LEFT).setDepth(1);

        this.btn.yellow = this.add.image(width/2+120, height/2+120, 'btn_yellow').setInteractive().setDepth(1);
        this.btn.yellowText = this.add.text(width/2+80, height/2+104, 'Bouton', FONT_LEFT).setDepth(1);

        this.btn.red.visible = false;
        this.btn.redText.visible = false;

        this.btn.green.visible = false;
        this.btn.greenText.visible = false;

        this.btn.blue.visible = false;
        this.btn.blueText.visible = false;

        this.btn.yellow.visible = false;
        this.btn.yellowText.visible = false;


        this.socket.on('modal_chance', (data, text) => {

            this.modal.visible = true;
            this.title.visible = true;
            this.text.visible = true;
            this.text.setText(text);

            var i = 0;

            data.forEach(element => {
                if (element.id != myId) {
                    switch (element.color) {
                        case 'red':
                            this.btn.red.visible = true;
                            this.btn.redText.visible = true;
                            this.btn.redText.setText(element.username);
                            this.btn.redNum = i;

                            break;
                        case 'green':
                            this.btn.green.visible = true;
                            this.btn.greenText.visible = true;
                            this.btn.greenText.setText(element.username);
                            this.btn.greenNum = i;
                            break;
                        case 'blue':
                            this.btn.blue.visible = true;
                            this.btn.blueText.visible = true;
                            this.btn.blueText.setText(element.username);
                            this.btn.blueNum = i;
                            break;
                        case 'yellow':
                            this.btn.yellow.visible = true;
                            this.btn.yellowText.visible = true;
                            this.btn.yellowText.setText(element.username);
                            this.btn.yellowNum = i;
                            break;
                        default:
                        console.error('Error: chance button.');
                    }
                    // this.btn = this.add.image(width/2-200+i*200, height/2+50, 'btn_'+element.color);
                    // this.btn01.visible = true;
                    // this.btn01.setText(element.username);

                    // this.btn01 = this.add.text(width/2-250+i*200, height/2+35, element.username, FONT_LEFT);
                }
                i++;
            })
        })


        this.btn.red.on('pointerdown', () => {
            this.socket.emit('choice_chance', this.btn.redNum);
            console.log(this.btn.redNum);
            this.modal.visible = false;
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
            this.modal.visible = false;
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
            this.modal.visible = false;
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
            this.modal.visible = false;
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

    } // Fin Create.


    function mask(){

    }

});
