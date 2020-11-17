let canvas;
let agentCanvas;
let background0;
let background1;
let flares = [];


let agent;//Class
let iPhone;//Class
let world;//Class

//----- Animations -----
//-- Non interest mode ---
let typing_L0 = [];
let typing_L1 = [];
let typing_R0 = [];


//-- Motor mimicry mode ---
let mimicking = [];
for(let i=0; i<2; i++){
  mimicking[i] = [];
}

let margin = 60;


//Sounds
let keySound = [];
let enterKeySound;
let spacebarSound;
let deleteKeySound;

let ambientSound;
let chairCreakingSound;


//To impliment transittion animation between action to action
//I need to store current action for later.
let previousAction = "thinking";

let intervalCount = 0;
let randomNum = Math.random(450, 1800);



canvas = p => {

  p.preload = () => {

    //Load component images
    background0 = p.loadImage("animations/background/background0.png");
    background1 = p.loadImage("animations/background/background1.png");

    //iPhone images
    defaultIPhone = p.loadImage("animations/iPhone/default.png");

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

    for(let i=0; i<2; i++){
      for(let j=0; j<61; j++){
        mimicking[i][j] = p.loadImage("animations/agent_motorMimicry/"+i+"/"+ p.nf(j, 3) + ".png");
      }
    }

    //Load typing sounds for typing()
    for(let i=0; i < 4; i++){
      keySound[i] = p.loadSound("/soundEffects/typing/key"+i+".mp3");
    }
    enterKeySound = p.loadSound("/soundEffects/typing/enter.mp3");
    spacebarSound = p.loadSound("/soundEffects/typing/spacebar.mp3");
    deleteKeySound = p.loadSound("/soundEffects/typing/delete.mp3");


    chairCreakingSound = p.loadSound("/soundEffects/chairCreaking.mp3");

    ambientSound = p.loadSound("/soundEffects/citySounds/ambience.mp3");
  }


  p.setup = () => {
    agentCanvas = p.createCanvas(960, 540);
    agentCanvas.id("agentCanvas");
    p.colorMode(p.HSB, 100, 100, 100);
    p.angleMode(p.DEGREES);

    p.frameRate(30);
    p.imageMode(p.CENTER);

    agent = new Agent();
    iPhone  = new Phone();
    world = new World();

    //Add all of ambient sounds
    world.ambience();
  }

  p.draw = () => {

    //Display background
    p.blendMode(p.BLEND);
    p.image(background1, 480, 270, 960, 540);
    p.image(background0, 480, 270, 960, 540);

    p.mode_motorMimicry();

    iPhone.display();

    //Add some optical flare effects!
    p.blendMode(p.SCREEN);
    p.image(flares[0], 1118, 102, 1600 * 1.5, 889 * 1.5);
    p.image(flares[1], 497, 285, 1600 * 0.2, 1333 * 0.2);
    p.image(flares[2], 932, 280, 1600 * 0.2, 1333 * 0.2);
  }

  // p.actionDuration = (min, max) => {
  //   console.log("new action interval emerged");
  //   if(intervalCount == 0){
  //     randomNum = p.random(min, max);
  //   }else{}
  //
  //   if(intervalCount > randomNum){
  //     intervalCount = 0;
  //   }else{
  //     intervalCount++;
  //   }
  //
  //   // console.log(this.randomNum);
  //   return myp5.int(randomNum);
  // }


  p.mode_motorMimicry = () => {
    agent.mimic();
  }

}//Canvas end



let myp5 = new p5(canvas);
