

let canvas;
let background0;
let background1;
let flares = [];

//Agent activity
let agentApperance = [];
let typing_L0 = [];
let typing_L1 = [];
let typing_R0 = [];
let thinking = [];
let index = 0;
let frameIncliment = 0;

canvas = p => {

  p.preload = () => {
    background0 = p.loadImage("data/background/background0.png");
    background1 = p.loadImage("data/background/background1.png");
    for(let i=0; i<3; i++){
      flares[i] = p.loadImage("data/optical_effect/flare" + i + ".png");
    }

    for(let i=0; i<5; i++){
      typing_L0[i] = p.loadImage("data/agent_typing/L0/" + p.nf(i, 2) + ".png");
    }
    for(let i=0; i<15; i++){
      typing_L1[i] = p.loadImage("data/agent_typing/L1/" + p.nf(i, 2) + ".png");
    }
    for(let i=0; i<5; i++){
      typing_R0[i] = p.loadImage("data/agent_typing/R0/" + p.nf(i, 2) + ".png");
    }

    for(let i=0; i<9; i++){
      thinking[i] = p.loadImage("data/agent_thinking/" + p.nf(i, 2) + ".png");
    }

  }


  p.setup = () => {
    p.createCanvas(960, 540);
    p.frameRate(30);
    p.imageMode(p.CENTER);
  }

  p.draw = () => {

    //Display background
    p.blendMode(p.BLEND);
    p.image(background1, 480, 270, 960, 540);
    p.image(background0, 480, 270, 960, 540);

    //This is where the agent comes in.
    index += frameIncliment;
    if(index > typing_L0.length - 2){
      frameIncliment = -1;
    }else if (index < 1) {
      frameIncliment = 1;
    }
    console.log(index);
    p.image(typing_L0[index], 480, 270, 960, 540);

    //Add some optical flare effects!
    p.blendMode(p.SCREEN);
    p.image(flares[0], 1118, 102, 1600 * 1.5, 889 * 1.5);
    p.image(flares[1], 497, 285, 1600 * 0.2, 1333 * 0.2);
    p.image(flares[2], 932, 280, 1600 * 0.2, 1333 * 0.2);



  }


}//Canvas end



let myp5 = new p5(canvas, 'canvas');
