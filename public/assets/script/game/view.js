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
    }

    function create (){
        this.socket = io.connect('/A'+idGame[1]);


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



        // Autres.
        var cadre_bd = this.add.image(width-(500/2)*SCALE_TEXT, height-(222/2)*SCALE_TEXT, 'cadre').setScale(SCALE_TEXT);

        this.add.image(width-200, height-32, 'block').setScale(SCALE_TEXT);
        this.bgCards.bread = this.add.image(width-43, height-200, 'position_cards').setScale(0.64);
        this.bgCards.meat = this.add.image(width-119, height-200, 'position_cards').setScale(0.64);
        this.bgCards.salad = this.add.image(width-195, height-200, 'position_cards').setScale(0.64);
        this.bgCards.sauce = this.add.image(width-271, height-200, 'position_cards').setScale(0.64);


        var cadre_hg = this.add.image(500/2*SCALE_TEXT, 222/2*SCALE_TEXT, 'cadre').setScale(SCALE_TEXT).setRotation(3.14);

        this.add.image(200, 75, 'block').setScale(SCALE_TEXT);
        this.hgCards.bread = this.add.image(width-43, 200, 'position_cards').setScale(0.64).setRotation(3.14);
        this.hgCards.meat = this.add.image(width-119, 200, 'position_cards').setScale(0.64).setRotation(3.14);
        this.hgCards.salad = this.add.image(width-195, 200, 'position_cards').setScale(0.64).setRotation(3.14);
        this.hgCards.sauce = this.add.image(width-271, 200, 'position_cards').setScale(0.64).setRotation(3.14);


        var cadre_bg = this.add.image(500/2*SCALE_TEXT, height-(222/2)*SCALE_TEXT, 'cadre02').setScale(SCALE_TEXT);

        this.add.image(200, height-32, 'block').setScale(SCALE_TEXT);
        this.bgCards.bread = this.add.image(43, height-200, 'position_cards').setScale(0.64);
        this.bgCards.meat = this.add.image(119, height-200, 'position_cards').setScale(0.64);
        this.bgCards.salad = this.add.image(195, height-200, 'position_cards').setScale(0.64);
        this.bgCards.sauce = this.add.image(271, height-200, 'position_cards').setScale(0.64);


        var cadre_hd = this.add.image(width-(500/2)*SCALE_TEXT, 222/2*SCALE_TEXT, 'cadre02').setScale(SCALE_TEXT).setRotation(3.14);

        this.add.image(width-200, 75, 'block').setScale(SCALE_TEXT);
        this.hdCards.bread = this.add.image(43, 200, 'position_cards').setScale(0.64).setRotation(3.14);
        this.hdCards.meat = this.add.image(119, 200, 'position_cards').setScale(0.64).setRotation(3.14);
        this.hdCards.salad = this.add.image(195, 200, 'position_cards').setScale(0.64).setRotation(3.14);
        this.hdCards.sauce = this.add.image(271, 200, 'position_cards').setScale(0.64).setRotation(3.14);



        this.socket.on('player', (player) => {
            console.log('Ok!');

            this.text_bd = this.add.text(width-270, height-100, player[0].username, FONT_RIGHT);
            this.img_bd = this.add.image(width-60, height-55, player[0].img);

            this.text_bg = this.add.text(140, height-100, player[1].username, FONT_LEFT);
            this.img_bg = this.add.image(60, height-55, player[1].img);

            switch (player.length) {
                case 3:
                    this.text_hg = this.add.text(140, 20, player[2].username, FONT_LEFT);
                    this.img_hg = this.add.image(60, 20, player[2].img);
                break;

                case 4:
                    this.text_hg = this.add.text(140, 20, player[2].username, FONT_LEFT);
                    this.text_hd = this.add.text(width-260, 20, player[3].username, FONT_RIGHT);
                    this.img_hd = this.add.image(width-60, 20, player[3].img);
                break;

                default:

            }
        })
    }
});
