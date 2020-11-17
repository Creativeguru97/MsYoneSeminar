let canvas;
let agentCanvas;
let background0;
let background1;
let flares = [];


let agent;//Class
let iPhone;//Class
let world;//Class
let model;//Class

let c_Mdl_Width;
let c_Mdl_Height;

//Non interest version
let pRange0;
let pRange1;
let pRange2;
let pRange3;

//----- Animations -----
//-- Non interest mode ---
let typing_L0 = [];
let typing_L1 = [];
let typing_R0 = [];
let thinking = [];
let thinking_typing = [];

let defaultIPhone;

//-- Emotional transference mode ---
let laughing = [];
//Make the laughing 2D array!!!
for(let i=0; i<3; i++){
  laughing[i] = [];
}

let depressing = [];
for(let i=0; i<2; i++){
  depressing[i] = [];
}

let irritating = [];
for(let i=0; i<2; i++){
  irritating[i] = [];
}

let disgusting = [];
for(let i=0; i<2; i++){
  disgusting[i] = [];
}

let surprising = [];
for(let i=0; i<2; i++){
  surprising[i] = [];
}

//Sounds
let keySound = [];
let enterKeySound;
let spacebarSound;
let deleteKeySound;

let scrollingSound = [];

let ambientSound;
let putPhoneSound;
let chairCreakingSound;

//Agent default states
let isThinking = false;
let isTyping = false;

//Agent emotional emotionalStates
let isDefaultState = false;
let isDepressing = false;
let isLaughing = false;
let isIrritating = false;
let isDisgusting = false;
let isSurprised = false;


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

    for(let i=0; i<41; i++){
      thinking[i] = p.loadImage("animations/agent_thinking/" + p.nf(i, 3) + ".png");
    }

    for(let i=0; i<21; i++){
      thinking_typing[i] = p.loadImage("animations/thinking_typing/" + p.nf(i, 3) + ".png");
    }

    for(let i=0; i<3; i++){
      for(let j=0; j<7; j++){
        laughing[i][j] = p.loadImage("animations/agent_laughing/"+i+"/"+ p.nf(j, 2) + ".png");
      }
    }

    for(let i=0; i<2; i++){
      for(let j=0; j<271; j++){
        depressing[i][j] = p.loadImage("animations/agent_depressing/"+i+"/"+ p.nf(j, 4) + ".png");
      }
    }

    for(let i=0; i<2; i++){
      for(let j=0; j<9; j++){
        irritating[i][j] = p.loadImage("animations/agent_irritating/"+i+"/"+ p.nf(j, 2) + ".png");
      }
    }

    for(let i=0; i<2; i++){
      for(let j=0; j<121; j++){
        disgusting[i][j] = p.loadImage("animations/agent_disgusting/"+i+"/"+ p.nf(j, 4) + ".png");
      }
    }

    for(let i=0; i<2; i++){
      for(let j=0; j<91; j++){
        surprising[i][j] = p.loadImage("animations/agent_surprising/"+i+"/"+ p.nf(j, 3) + ".png");
      }
    }

    //Load typing sounds for typing()
    for(let i=0; i < 4; i++){
      keySound[i] = p.loadSound("/soundEffects/typing/key"+i+".mp3");
    }
    enterKeySound = p.loadSound("/soundEffects/typing/enter.mp3");
    spacebarSound = p.loadSound("/soundEffects/typing/spacebar.mp3");
    deleteKeySound = p.loadSound("/soundEffects/typing/delete.mp3");

    //Load scrolling sound for thinking()
    for(let i=0; i < 2; i++){
      scrollingSound[i] = p.loadSound("/soundEffects/scrolling/scrolling"+i+".mp3");
    }

    chairCreakingSound = p.loadSound("/soundEffects/chairCreaking.mp3");

    ambientSound = p.loadSound("/soundEffects/citySounds/ambience.mp3");
  }


  p.setup = () => {
    agentCanvas = p.createCanvas(960, 540);
    agentCanvas.id("agentCanvas");
    p.colorMode(p.HSB, 100, 100, 100);
    p.angleMode(p.DEGREES);

    c_Mdl_Width = 300;
    c_Mdl_Height = 300;

    p.frameRate(30);
    p.imageMode(p.CENTER);

    agent = new Agent();
    iPhone  = new Phone();
    world = new World();
    model = new Circumplex_model();

    let firstAction = p.int(p.random(0, 2));
    if(firstAction == 0){
      isThinking = true;
      previousAction = "thinking";
      console.log("Agent is thinking");
      console.log("----------");
    }else if(firstAction == 1){
      isTyping = true;
      previousAction = "typing";
      console.log("Agent is typing");
      console.log("----------");
    }else{}

    //Add all of ambient sounds
    world.ambience();
  }

  p.draw = () => {

    //Display background
    p.blendMode(p.BLEND);
    p.image(background1, 480, 270, 960, 540);
    p.image(background0, 480, 270, 960, 540);

    //This is the agent behaviors.
    //I'll make those ba able to switch in need.

    p.mode_emotionalTransference(600);

    model.show();//Display the circumplex coordinate of user's emotion.

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


  p.defaultActionChoicer = (duration) => {
    if (p.frameCount % duration == 0) {

      agent.index = 0;//Re initialize
      console.log("previousAction: " + previousAction);

      let whichAction = p.int(p.random(0, 100));

      //This value represent a need for checking social media.
      //The more unread messsage, more become want to check it.
      let instantGratification = iPhone.UnreadMessagesNum * 2.5;
      if(instantGratification > 60){
        instantGratification = 60;
      }else{}

      //Which is normal condition
      if(isThinking == true){
        pRange0 = 70;
        pRange1 = 100;
      }else if(isTyping == true){
        pRange0 = 30;
        pRange1 = 100;
      }

      console.log("instantGratification: "+instantGratification);
      console.log("Next action probability: ");
      console.log("thinking: " + pRange0 + "%");
      console.log("typing: " + p.str(pRange1 - pRange0) + "%");
      console.log("↓");

      if(whichAction < pRange0){
        isThinking = true;
        isTyping = false;
        console.log("Agent is thinking");
        console.log("----------");

        agent.thinkingFrame = 0;
      }else if(whichAction >= pRange0 && whichAction < pRange1){
        isThinking = false;
        isTyping = true;
        console.log("Agent is typing");
        console.log("----------");

        agent.typingFrame = 0;
      }else{}
    }
  }


  p.emotionProbability = (duration) => {
    if (p.frameCount % duration == 0) {

      agent.emotionArrayIndex = 0;

      agent.epochCount = 0;//reinitialize for loopAnimation()
      agent.irritatingFrame = 0;
      agent.depressingFrame = 0;

      //Iniciating all booleans
      isDefaultState = false;
      isDepressing = false;
      isLaughing = false;
      isIrritating = false;
      isDisgusting = false;
      isSurprised = false;

      //If the agent's emotion is positive and arosal
      if(model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] >= -p.PI/2 &&
      model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] < 0){

        let dDefault = p.dist(
          model.agentEmotionPosition.x,
          model.agentEmotionPosition.y,
          model.neutralPolar.x,
          model.neutralPolar.y
        );

        let dHappy = p.dist(
          model.agentEmotionPosition.x,
          model.agentEmotionPosition.y,
          model.happyPolar.x,
          model.happyPolar.y
        );

        let dSurprised = p.dist(
          model.agentEmotionPosition.x,
          model.agentEmotionPosition.y,
          model.surprisedPolar.x,
          model.surprisedPolar.y
        );

        let pDefault = model.radius * p.sqrt(2) / dDefault;
        let pHappy = model.radius * p.sqrt(2) / dHappy;
        let pSurprised = model.radius * p.sqrt(2) / dSurprised;


        let multiRatio = 100 / (pDefault + pHappy + pSurprised);
        pDefault = pDefault * multiRatio;
        pHappy = pHappy * multiRatio;
        pSurprised = pSurprised * multiRatio;

        console.log("--- emotion probabilities ---");
        console.log("pDefault: " + pDefault);
        console.log("pHappy: " + pHappy);
        console.log("pSurprised: " + pSurprised);

        let whichEmotion = p.int(p.random(0, 100));
        if(whichEmotion <= pDefault){
          isDefaultState = true;
          console.log("--- emotion ---");
          console.log("Agent is default state");
        }else if (whichEmotion > pDefault && whichEmotion <= pDefault + pHappy) {
          isLaughing = true;
          console.log("--- emotion ---");
          console.log("Agent is laughing");
        }else if (whichEmotion > pDefault + pHappy && whichEmotion <= 100) {
          isSurprised = true;
          console.log("--- emotion ---");
          console.log("Agent is surprised");
        }

        //If the agent's emotion is negative and arosal
      }else if (model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] > -p.PI &&
      model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] < -p.PI/2) {

        let dDefault = p.dist(
          model.agentEmotionPosition.x,
          model.agentEmotionPosition.y,
          model.neutralPolar.x,
          model.neutralPolar.y
        );

        let dAngry = p.dist(
          model.agentEmotionPosition.x,
          model.agentEmotionPosition.y,
          model.angryPolar.x,
          model.angryPolar.y
        );

        let dFear = p.dist(
          model.agentEmotionPosition.x,
          model.agentEmotionPosition.y,
          model.fearfulPolar.x,
          model.fearfulPolar.y
        );

        let dDisgust = p.dist(
          model.agentEmotionPosition.x,
          model.agentEmotionPosition.y,
          model.disgustedPolar.x,
          model.disgustedPolar.y
        );

        let pDefault = model.radius * p.sqrt(2) / dDefault;
        let pAngry = model.radius * p.sqrt(2) / dAngry;
        let pFear = model.radius * p.sqrt(2) / dFear;
        let pDisgust = model.radius * p.sqrt(2) / dDisgust;


        let multiRatio = 100 / (pDefault + pAngry + pFear + pDisgust);
        pDefault = pDefault * multiRatio;
        pAngry = pAngry * multiRatio;
        pFear = pFear * multiRatio;
        pDisgust = pDisgust * multiRatio;

        console.log("-----------");
        console.log("pDefault: " + pDefault);
        console.log("pAngry: " + pAngry);
        console.log("pFear: " + pFear);
        console.log("pDisgust: " + pDisgust);

        let whichEmotion = p.int(p.random(0, 100));
        if(whichEmotion <= pDefault){
          isDefaultState = true;
          console.log("--- emotion ---");
          console.log("Agent is default state");
        }else if (whichEmotion > pDefault && whichEmotion <= pDefault + pAngry) {

          isIrritating = true;
          console.log("--- emotion ---");
          console.log("Agent is irritating");
        }else if (whichEmotion > pDefault + pAngry && whichEmotion <= pDefault + pAngry + pFear) {
          isDisgusting = true;
          console.log("--- emotion ---");
          console.log("Agent is fearful");
        }else if (whichEmotion > pDefault + pAngry + pFear && whichEmotion <= 100) {
          isDisgusting = true;
          console.log("--- emotion ---");
          console.log("Agent is disgusted");
        }

      //If the agent's emotion is positive and unarosal
      }else if(model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] > 0 &&
      model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] < p.PI/2) {

        isDefaultState = true;

      //If the agent's emotion is negative and unarosal
      }else if(model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] > p.PI/2 &&
      model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] < p.PI) {

        let dDefault = p.dist(
          model.agentEmotionPosition.x,
          model.agentEmotionPosition.y,
          model.neutralPolar.x,
          model.neutralPolar.y
        );

        let dSad = p.dist(
          model.agentEmotionPosition.x,
          model.agentEmotionPosition.y,
          model.sadPolar.x,
          model.sadPolar.y
        );

        let pDefault = model.radius * p.sqrt(2) / dDefault;
        let pSad = model.radius * p.sqrt(2) / dSad;


        let multiRatio = 100 / (pDefault + pSad);
        pDefault = pDefault * multiRatio;
        pSad = pSad * multiRatio;

        console.log("-----------");
        console.log("pDefault: " + pDefault);
        console.log("pSad: " + pSad);

        let whichEmotion = p.int(p.random(0, 100));
        if(whichEmotion <= pDefault){
          isDefaultState = true;
          console.log("--- emotion ---");
          console.log("Agent is default state");
        }else if (whichEmotion > pDefault && whichEmotion <= 100){
          isDepressing = true;
          console.log("--- emotion ---");
          console.log("Agent is isDepressing");
        }

      }
    }
  }//emotionProbability finished


  p.mode_emotionalTransference = (duration) => {

    p.defaultActionChoicer(duration);

    p.emotionProbability(duration);

    if(isThinking == true){

      if(isDefaultState == true){
        agent.thinking();
      }else if(isLaughing == true){
        agent.laughing("thinking", p.random(6, 10));
      }else if(isDepressing == true){
        agent.depressing("thinking", 1);
      }else if(isIrritating == true){
        agent.irritating("thinking", p.random(3, 6));
      }else if(isDisgusting == true){
        agent.disgusting("thinking", 1);
      }else if(isSurprised == true){
        agent.surprised("thinking");
      }

    }else if(isTyping == true){

      if(isDefaultState == true){
        agent.typing(8, "sustain", 0, 0.5);
      }else if(isLaughing == true){
        agent.laughing("typing", p.random(6, 10));
      }else if(isDepressing == true){
        agent.depressing("typing", 1);
      }else if(isIrritating == true){
        agent.irritating("typing", p.random(3, 6));
      }else if(isDisgusting == true){
        agent.disgusting("typing", 1);
      }else if(isSurprised == true){
        agent.surprised("typing");
      }

    }
  }

}//Canvas end



let myp5 = new p5(canvas);
