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

//----- Animations -----
//-- Non interest mode ---
let typing_L0 = [];
let typing_L1 = [];
let typing_R0 = [];
let thinking = [];
let pullIPhone = [];
let thinking_typing = [];

//other oriented behavior
let laughing = [];
let laughingTransition = [];
let caring = [];


let defaultIPhone;

//Sounds
let keySound = [];
let enterKeySound;
let spacebarSound;
let deleteKeySound;

let scrollingSound = [];

let ambientSound;
let chairCreakingSound;

//Agent default states
let isThinking = false;
let isTyping = false;

//User emotional emotionalStates
let isDefaultState = true;
let isLaughing = false;
let isCaring = false;

let maxEValue = [0, 0, 0, 0, 0, 0];//To store all emoitons value in last 20 seconds

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


    //Other oriented behavior's animations
    for(let i=0; i<7; i++){
      laughing[i] = p.loadImage("animations/otherOriented/laughing/laughter/" + p.nf(i, 2) + ".png");
    }

    for(let i=0; i<16; i++){
      laughingTransition[i] = p.loadImage("animations/otherOriented/laughing/transition/" + p.nf(i, 3) + ".png");
    }

    for(let i=0; i<41; i++){
      caring[i] = p.loadImage("animations/otherOriented/caring/" + p.nf(i, 3) + ".png");
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

    //Add all of ambient sounds
    world.ambience();
  }

  p.draw = () => {

    //Display background
    p.blendMode(p.BLEND);
    p.image(background1, 480, 270, 960, 540);
    p.image(background0, 480, 270, 960, 540);

    p.mode_otherOriented(600);


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

      //Which is normal condition
      if(isThinking == true){
        pRange0 = 70;
        pRange1 = 100;
      }else if(isTyping == true){
        pRange0 = 30;
        pRange1 = 100;
      }

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
    /*
    In this function, we calculate the probability of thenext agent state.
    May be I should've written this in the class Circumplex_model();
    More specifically, I convert the distance between current agent emotion's
    location and each emotion polar into probabilities.

    The argorithms is quite arbitrary.
    1: caculate distances between current emotion location and
      every emotion polar (but except neutral)  in each 6 frames.
    2: Divide a arbitrary number with the distance value.
      The number should be bigger than the dist.
    3: Add the divided value to correspond index in maxEvalue[];

    4: In every 20 seconds, store the values in every index of the
      maxEValue[] in the valiable Indivisually.
      4-1: divide 100 with sum of every index of the maxEValue[];
    5: Multiply the each valiable with the divided number.
        This process 4 to 5 shrink the values in every index of the
        maxEValue[] into 0 to 100.
        After the mapping, the sum should be 100 and that allow us
        to use the final values as probabilities.

        Hope you've made sense...
    */

    if (p.frameCount % 6 == 0) {

      //If the agent's emotion is positive and arosal
      if(model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] >= -p.PI/2 &&
      model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] < 0){

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

        if(happy * 100 >= 10){
          let addHappy = model.radius * p.sqrt(2) / p.max(1, dHappy);
          maxEValue[0] += addHappy;
        }else{}

        if(surprised * 100 >= 10){
          let addSurprised = model.radius * p.sqrt(2) / p.max(1, dSurprised);
          maxEValue[4] += addSurprised;
        }else{}

        //If the agent's emotion is negative and arosal
      }else if (model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] > -p.PI &&
      model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] < -p.PI/2) {

        let dAngry = p.dist(
          model.agentEmotionPosition.x,
          model.agentEmotionPosition.y,
          model.angryPolar.x,
          model.angryPolar.y
        );

        let dFearful = p.dist(
          model.agentEmotionPosition.x,
          model.agentEmotionPosition.y,
          model.fearfulPolar.x,
          model.fearfulPolar.y
        );

        let dDisgusted = p.dist(
          model.agentEmotionPosition.x,
          model.agentEmotionPosition.y,
          model.disgustedPolar.x,
          model.disgustedPolar.y
        );

        if(angry * 100 >= 10){
          let addAngry = model.radius * p.sqrt(2) / p.max(1, dAngry);
          maxEValue[1] += addAngry;
        }else{}

        if(fearful * 100 >= 10){
          let addFearful = model.radius * p.sqrt(2) / p.max(1, dFearful);
          maxEValue[5] += addFearful;
        }else{}

        if(disgusted * 100 >= 10){
          let addDisgusted = model.radius * p.sqrt(2) / p.max(1, dDisgusted);
          maxEValue[3] += addDisgusted;
        }else{}

      //If the agent's emotion is positive and unarosal
      }else if(model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] > 0 &&
      model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] < p.PI/2) {

      //If the agent's emotion is negative and unarosal
      }else if(model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] > p.PI/2 &&
      model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[1] < p.PI) {

        let dSad = p.dist(
          model.agentEmotionPosition.x,
          model.agentEmotionPosition.y,
          model.sadPolar.x,
          model.sadPolar.y
        );

        if(sad * 100 >= 10){
          let addSad = model.radius * p.sqrt(2) / p.max(1, dSad);
          maxEValue[2] += addSad;
        }
      }

      console.log(maxEValue);
    }


    if (p.frameCount % duration == 0){

      agent.index = 0;//Re initialize
      agent.emotionArrayIndex = 0;

      agent.epochCount = 0;//reinitialize for loopAnimation()

      agent.laughingFrame = 0;
      agent.caringFrame = 0;

      //Iniciating all booleans
      isDefaultState = false;
      isLaughing = false;
      isCaring = false;


      let pHappy = maxEValue[0];
      let pAngry = maxEValue[1];
      let pSad = maxEValue[2];
      let pDisgusted = maxEValue[3];
      let pSurprised = maxEValue[4];
      let pFearful = maxEValue[5];

      let sum = 0;
      for(let i=0; i<maxEValue.length; i++){
        sum += maxEValue[i];
      }

      if(sum == 0){
        isDefaultState = true;
        isLaughing = false;
        isCaring = false;


      }else if (sum > 0) {
        let multiRatio = 100 / (
          // pDefault +
          pHappy +
          pAngry +
          pSad +
          pDisgusted +
          pSurprised +
          pFearful
        );

        // pDefault = pDefault * multiRatio;
        pHappy = pHappy * multiRatio;
        pAngry = pAngry * multiRatio;
        pSad = pSad * multiRatio;
        pDisgusted = pDisgusted * multiRatio;
        pSurprised = pSurprised * multiRatio;
        pFearful = pFearful * multiRatio;

        console.log("-- probabilities ---");
        console.log("pHappy: "+pHappy);
        console.log("pAngry: "+pAngry);
        console.log("pSad: "+pSad);
        console.log("pDisgusted: "+pDisgusted);
        console.log("pSurprised: "+pSurprised);
        console.log("pFearful: "+pFearful);
        console.log("-- sum ---");
        console.log(pHappy+pAngry+pSad+pDisgusted+pSurprised+pFearful);

        let whichEmotion = p.int(p.random(0, 100));
        if(whichEmotion <= pHappy){
          isDefaultState = false;
          isLaughing = true;
          isCaring = false;
        }else if (whichEmotion > pHappy && whichEmotion <= pHappy + pAngry) {
          isDefaultState = false;
          isLaughing = false;
          isCaring = true;
        }else if (whichEmotion > pHappy + pAngry && whichEmotion <= pHappy + pAngry + pSad) {
          isDefaultState = false;
          isLaughing = false;
          isCaring = true;
        }else if (whichEmotion > pHappy + pAngry + pSad &&
        whichEmotion <= pHappy + pAngry + pSad + pDisgusted) {
          isDefaultState = false;
          isLaughing = false;
          isCaring = true;
        }else if (whichEmotion > pHappy + pAngry + pSad + pDisgusted &&
        whichEmotion <= pHappy + pAngry + pSad + pDisgusted + pSurprised) {
          isDefaultState = false;
          isLaughing = false;
          isCaring = true;
        }else if (whichEmotion > pHappy + pAngry + pSad + pDisgusted + pSurprised &&
        whichEmotion <= 100) {
          isDefaultState = false;
          isLaughing = false;
          isCaring = true;
        }
      }

      for(let i=0; i<maxEValue.length; i++){
        maxEValue[i] = 0;
      }
    }//p.frameCount % duration == 0 end

  }//emotionProbability end

  p.mode_otherOriented = (duration) => {
    p.emotionProbability(duration);

    if(isDefaultState == true){
      agent.thinking();
    }else if(isLaughing == true){
      agent.laughing(8);
    }else if(isCaring == true){
      agent.caring();
    }
  }


}//Canvas end



let myp5 = new p5(canvas);
