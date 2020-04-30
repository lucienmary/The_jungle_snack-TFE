let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}
// PIXI.utils.sayHello('THE JUNGLE SNACK!')

//Create a Pixi Application
let app = new PIXI.Application({width: 256, height: 256});

let height = window.innerHeight;
let width = window.innerWidth;
const POSITION = height/100;
const HPOS = -64;
const WPOS = 114;
const SCALE = 0.8;
const ANCHOR = 0.5;

document.body.appendChild(app.view);

app.renderer.backgroundColor = 0xB9B275;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);



PIXI.loader
    .add([
        "../assets/images/resources.png",
        "../assets/images/empty.png",
        "../assets/images/chance.png",
        "../assets/images/coins.png",
        "../assets/images/benefits.png",
        "../assets/images/attack.png",
        "../assets/images/bank.png",
        "../assets/images/centre.png",
        "../assets/images/shadow.png",
        "../assets/images/cadre_bd.png",
        "../assets/images/cadre_bg.png"
    ])
    .load(setup);

function setup() {
    let box1 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/resources.png"].texture);
    let box2 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/benefits.png"].texture);
    let box3 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/coins.png"].texture);
    let box4 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/empty.png"].texture);
    let box5 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/chance.png"].texture);
    let box6 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/resources.png"].texture);
    let box7 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/bank.png"].texture);
    let box8 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/coins.png"].texture);
    let box9 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/attack.png"].texture);
    let box10 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/chance.png"].texture);
    let box11 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/resources.png"].texture);
    let box12 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/benefits.png"].texture);
    let box13 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/coins.png"].texture);
    let box14 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/empty.png"].texture);
    let box15 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/chance.png"].texture);
    let box16 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/resources.png"].texture);
    let box17 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/bank.png"].texture);
    let box18 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/coins.png"].texture);
    let box19 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/attack.png"].texture);
    let box20 = new PIXI.Sprite(PIXI.loader.resources["../assets/images/chance.png"].texture);
    let centre = new PIXI.Sprite(PIXI.loader.resources["../assets/images/centre.png"].texture);
    let shadow = new PIXI.Sprite(PIXI.loader.resources["../assets/images/shadow.png"].texture);
    let cadre_bd = new PIXI.Sprite(PIXI.loader.resources["../assets/images/cadre_bd.png"].texture);
    let cadre_hg = new PIXI.Sprite(PIXI.loader.resources["../assets/images/cadre_bd.png"].texture);
    let cadre_bg = new PIXI.Sprite(PIXI.loader.resources["../assets/images/cadre_bg.png"].texture);
    let cadre_hd = new PIXI.Sprite(PIXI.loader.resources["../assets/images/cadre_bg.png"].texture);


  // Shadow.

    shadow.position.set(width/2, height-POSITION*29.5);
    shadow.scale.set(SCALE, SCALE);
    shadow.anchor.x = ANCHOR;
    shadow.anchor.y = ANCHOR;
    app.stage.addChild(shadow);


  // Haut.

    box11.position.set(width/2, height-POSITION*20+HPOS*10);
    box11.scale.set(SCALE, SCALE);
    box11.anchor.x = ANCHOR;
    box11.anchor.y = ANCHOR;
    app.stage.addChild(box11);

    box10.position.set(width/2-WPOS*1, height-POSITION*20+HPOS*9);
    box10.scale.set(SCALE, SCALE);
    box10.anchor.x = ANCHOR;
    box10.anchor.y = ANCHOR;
    app.stage.addChild(box10);

    box9.position.set(width/2-WPOS*2, height-POSITION*20+HPOS*8);
    box9.scale.set(SCALE, SCALE);
    box9.anchor.x = ANCHOR;
    box9.anchor.y = ANCHOR;
    app.stage.addChild(box9);

    box8.position.set(width/2-WPOS*3, height-POSITION*20+HPOS*7);
    box8.scale.set(SCALE, SCALE);
    box8.anchor.x = ANCHOR;
    box8.anchor.y = ANCHOR;
    app.stage.addChild(box8);

    box12.position.set(width/2+WPOS*1, height-POSITION*20+HPOS*9);
    box12.scale.set(SCALE, SCALE);
    box12.anchor.x = ANCHOR;
    box12.anchor.y = ANCHOR;
    app.stage.addChild(box12);

    box13.position.set(width/2+WPOS*2, height-POSITION*20+HPOS*8);
    box13.scale.set(SCALE, SCALE);
    box13.anchor.x = ANCHOR;
    box13.anchor.y = ANCHOR;
    app.stage.addChild(box13);

    box14.position.set(width/2+WPOS*3, height-POSITION*20+HPOS*7);
    box14.scale.set(SCALE, SCALE);
    box14.anchor.x = ANCHOR;
    box14.anchor.y = ANCHOR;
    app.stage.addChild(box14);

    box15.position.set(width/2+WPOS*4, height-POSITION*20+HPOS*6);
    box15.scale.set(SCALE, SCALE);
    box15.anchor.x = ANCHOR;
    box15.anchor.y = ANCHOR;
    app.stage.addChild(box15);

    box7.position.set(width/2-WPOS*4, height-POSITION*20+HPOS*6);
    box7.scale.set(SCALE, SCALE);
    box7.anchor.x = ANCHOR;
    box7.anchor.y = ANCHOR;
    app.stage.addChild(box7);


  // Centre.

    centre.position.set(width/2, height-POSITION*20+HPOS*5);
    centre.scale.set(SCALE, SCALE);
    centre.anchor.x = ANCHOR;
    centre.anchor.y = ANCHOR;
    app.stage.addChild(centre);

  // Bas.

    box16.position.set(width/2+WPOS*5, height-POSITION*20+HPOS*5);
    box16.scale.set(SCALE, SCALE);
    box16.anchor.x = ANCHOR;
    box16.anchor.y = ANCHOR;
    app.stage.addChild(box16);

    box6.position.set(width/2-WPOS*5, height-POSITION*20+HPOS*5);
    box6.scale.set(SCALE, SCALE);
    box6.anchor.x = ANCHOR;
    box6.anchor.y = ANCHOR;
    app.stage.addChild(box6);

    box17.position.set(width/2+WPOS*4, height-POSITION*20+HPOS*4);
    box17.scale.set(SCALE, SCALE);
    box17.anchor.x = ANCHOR;
    box17.anchor.y = ANCHOR;
    app.stage.addChild(box17);

    box5.position.set(width/2-WPOS*4, height-POSITION*20+HPOS*4);
    box5.scale.set(SCALE, SCALE);
    box5.anchor.x = ANCHOR;
    box5.anchor.y = ANCHOR;
    app.stage.addChild(box5);

    box18.position.set(width/2+WPOS*3, height-POSITION*20+HPOS*3);
    box18.scale.set(SCALE, SCALE);
    box18.anchor.x = ANCHOR;
    box18.anchor.y = ANCHOR;
    app.stage.addChild(box18);

    box4.position.set(width/2-WPOS*3, height-POSITION*20+HPOS*3);
    box4.scale.set(SCALE, SCALE);
    box4.anchor.x = ANCHOR;
    box4.anchor.y = ANCHOR;
    app.stage.addChild(box4);

    box19.position.set(width/2+WPOS*2, height-POSITION*20+HPOS*2);
    box19.scale.set(SCALE, SCALE);
    box19.anchor.x = ANCHOR;
    box19.anchor.y = ANCHOR;
    app.stage.addChild(box19);

    box3.position.set(width/2-WPOS*2, height-POSITION*20+HPOS*2);
    box3.scale.set(SCALE, SCALE);
    box3.anchor.x = ANCHOR;
    box3.anchor.y = ANCHOR;
    app.stage.addChild(box3);

    box20.position.set(width/2+WPOS*1, height-POSITION*20+HPOS*1);
    box20.scale.set(SCALE, SCALE);
    box20.anchor.x = ANCHOR;
    box20.anchor.y = ANCHOR;
    app.stage.addChild(box20);

    box2.position.set(width/2-WPOS*1, height-POSITION*20+HPOS*1);
    box2.scale.set(SCALE, SCALE);
    box2.anchor.x = ANCHOR;
    box2.anchor.y = ANCHOR;
    app.stage.addChild(box2);

    box1.position.set(width/2, height-POSITION*20);
    box1.scale.set(SCALE, SCALE);
    box1.anchor.x = ANCHOR;
    box1.anchor.y = ANCHOR;
    app.stage.addChild(box1);


  // Cadre.

    cadre_bd.position.set(width, height);
    cadre_bd.scale.set(SCALE, SCALE);
    cadre_bd.anchor.x = 1;
    cadre_bd.anchor.y = 1;
    app.stage.addChild(cadre_bd);

    cadre_hg.position.set( 200, 80);
    cadre_hg.scale.set(SCALE, SCALE);
    cadre_hg.anchor.x = 0.5;
    cadre_hg.anchor.y = 0.5;
    cadre_hg.rotation = 3.14;
    app.stage.addChild(cadre_hg);

    cadre_bg.position.set( 0, height);
    cadre_bg.scale.set(SCALE, SCALE);
    cadre_bg.anchor.x = 0;
    cadre_bg.anchor.y = 1;
    app.stage.addChild(cadre_bg);

    cadre_hd.position.set(width-200, 80);
    cadre_hd.scale.set(SCALE, SCALE);
    cadre_hd.anchor.x = 0.5;
    cadre_hd.anchor.y = 0.5;
    cadre_hd.rotation = 3.14;
    app.stage.addChild(cadre_hd);
}
