

let canvas;
let background0;
let background1;
let flares = [];

//Agent and the animations relevant
let agent;
let agentApperance = [];
let typing_L0 = [];
let typing_L1 = [];
let typing_R0 = [];
let thinking = [];
let typingProbability;

//Typing sounds
let keySound = [];
let enterKeySound;
let spacebarSound;
let deleteKeySound;

canvas = p => {

  p.preload = () => {

    //Load component images
    background0 = p.loadImage("animations/background/background0.png");
    background1 = p.loadImage("animations/background/background1.png");
    for(let i=0; i<3; i++){
      flares[i] = p.loadImage("animations/optical_effect/flare" + i + ".png");
    }

    //Load agent animations
    for(let i=0; i<5; i++){
      typing_L0[i] = p.loadImage("animations/agent_typing/L0/" + p.nf(i, 2) + ".png");
    }
    for(let i=0; i<15; i++){
      typing_L1[i] = p.loadImage("animations/agent_typing/L1/" + p.nf(i, 2) + ".png");
    }
    for(let i=0; i<5; i++){
      typing_R0[i] = p.loadImage("animations/agent_typing/R0/" + p.nf(i, 2) + ".png");
    }

    for(let i=0; i<21; i++){
      thinking[i] = p.loadImage("animations/agent_thinking/" + p.nf(i, 3) + ".png");
    }

    //Load typing sounds for typing()
    for(let i=0; i < 4; i++){
      keySound[i] = p.loadSound("/soundEffects/typing/key"+i+".mp3");
    }
    enterKeySound = p.loadSound("/soundEffects/typing/enter.mp3");
    spacebarSound = p.loadSound("/soundEffects/typing/spacebar.mp3");
    deleteKeySound = p.loadSound("/soundEffects/typing/delete.mp3");
  }


  p.setup = () => {
    p.createCanvas(960, 540);
    p.frameRate(30);
    p.imageMode(p.CENTER);

    agent = new Agent();
    // setInterval(() => {
    //   typingProbability = p.int(p.random(0, 10));
    //   console.log(typingProbability);
    // }, 6000);

  }

  p.draw = () => {

    //Display background
    p.blendMode(p.BLEND);
    p.image(background1, 480, 270, 960, 540);
    p.image(background0, 480, 270, 960, 540);

    //This is where the agent comes in.

    agent.typing(8, "sustain", 0, 0.5);


    //Add some optical flare effects!
    p.blendMode(p.SCREEN);
    p.image(flares[0], 1118, 102, 1600 * 1.5, 889 * 1.5);
    p.image(flares[1], 497, 285, 1600 * 0.2, 1333 * 0.2);
    p.image(flares[2], 932, 280, 1600 * 0.2, 1333 * 0.2);

  }


}//Canvas end



let myp5 = new p5(canvas, 'canvas');
