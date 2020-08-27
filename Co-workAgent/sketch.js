

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
let texting = [];
let pullIPhone = [];
let typingProbability;
let notification = [];

//Make the notification 2D array!!!
for(let i=0; i<4; i++){
  notification[i] = [];
}

//Typing sounds
let keySound = [];
let enterKeySound;
let spacebarSound;
let deleteKeySound;

let scrollingSound = [];
let notificationSound;

//iPhone tapping sounds
let iKeySound;
let iEnterKeySound = [];
let iDeleteKeySound = [];

let iPhone;//Class
let defaultIPhone;
let textingIPhone;
let pullediPhone = [];

let isThinking = false;
let isTyping = false;
let isTexting = false;

let intervalCount = 0;
let randomNum = 10;

let pRange0;
let pRange1;

canvas = p => {

  p.preload = () => {

    //Load component images
    background0 = p.loadImage("animations/background/background0.png");
    background1 = p.loadImage("animations/background/background1.png");

    //iPhone images
    defaultIPhone = p.loadImage("animations/iPhone/default.png");
    textingIPhone = p.loadImage("animations/iPhone/texting.png");

    for(let i=0; i<90; i++){
      pullediPhone[i] = p.loadImage("animations/iPhone/pulledUp/"+ p.nf(i, 3) +".png");
    }

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

    for(let i=0; i<5; i++){
      texting[i] = p.loadImage("animations/agent_texting/" + p.nf(i, 2) + ".png");
    }

    for(let i=0; i<90; i++){
      pullIPhone[i] = p.loadImage("animations/typing_texting/" + p.nf(i, 3) + ".png");
    }

    for(let i=0; i<4; i++){
      for(let j=0; j<181; j++){
        notification[i][j] = p.loadImage("animations/notifications/"+i+"/"+ p.nf(j, 4) + ".png");
      }
    }

    // console.log(notification);

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

    //Load tapping sound for texting()
    iKeySound = p.loadSound("/soundEffects/texting/iKey0.mp3");

    for(let i=0; i < 3; i++){
      iEnterKeySound[i] = p.loadSound("/soundEffects/texting/iEnter"+i+".mp3");
    }

    for(let i=0; i < 5; i++){
      iDeleteKeySound[i] = p.loadSound("/soundEffects/texting/iDelete"+i+".mp3");
    }

    //notification sound for notification()
    notificationSound = p.loadSound("/soundEffects/notification.mp3");
  }


  p.setup = () => {
    p.createCanvas(960, 540);
    p.frameRate(30);
    p.imageMode(p.CENTER);

    agent = new Agent();
    iPhone  = new Phone();

    let firstAction = p.int(p.random(0, 3));
    if(firstAction == 0){
      isThinking = true;
    }else if(firstAction == 1){
      isTyping = true;
    }else{
      isTexting = true;
    }

    console.log("----------");
    console.log(isThinking);
    console.log(isTyping);
    console.log(isTexting);
    console.log("----------");
  }

  p.draw = () => {

    //Display background
    p.blendMode(p.BLEND);
    p.image(background1, 480, 270, 960, 540);
    p.image(background0, 480, 270, 960, 540);

    //In this project 30fps.
    let duration = p.actionDuration(150, 300);

    if (p.frameCount % duration == 0) {
      agent.index = 0;

      let whichAction = myp5.int(myp5.random(0, 100));

      //This value represent a need for checking social media.
      //The more unread messsage, more become want to check it.
      let instantGratification = iPhone.UnreadMessagesNum * 2.5;

      if(isThinking == true){
        if(instantGratification < 60){
          pRange0 = 70 - instantGratification;
          pRange1 = 100 - instantGratification * 1.5;
        }
      }else if(isTyping == true){
        if(instantGratification < 60){
          pRange0 = 30 - instantGratification * 0.5;
          pRange1 = 100 - instantGratification * 1.5;
        }
      }else if(isTexting == true){
        pRange0 = 40;
        pRange1 = 80;

        //Agent has already checked social media.
        //So temporary no need for scratching the smartphone.
        iPhone.UnreadMessagesNum = 0;
      }

      console.log("instantGratification: "+instantGratification);
      console.log("pRange0: "+pRange0);
      console.log("pRange1: "+pRange1);

      if(whichAction < pRange0){
        isThinking = true;
        isTyping = false;
        isTexting = false;
        console.log("Agent is thinking");
        console.log(isThinking);
        console.log(isTyping);
        console.log(isTexting);
        console.log("----------");
      }else if(whichAction >= pRange0 && whichAction < pRange1){
        isThinking = false;
        isTyping = true;
        isTexting = false;
        console.log("Agent is typing");
        console.log(isThinking);
        console.log(isTyping);
        console.log(isTexting);
        console.log("----------");
      }else{
        isThinking = false;
        isTyping = false;
        isTexting = true;
        console.log("Agent is texting");
        console.log(isThinking);
        console.log(isTyping);
        console.log(isTexting);
        console.log("----------");

        //I imprimented an other action -> texting animation.
        //So I need to reset the index to display images every time.
        agent.textingFrame = 0;
      }
    }

    iPhone.display();
    iPhone.notification(600, 599, "sustain", 0, 0.5);

    if(isThinking == true){
      agent.thinking();
    }else if(isTyping == true){
      agent.typing(8, "sustain", 0, 0.5);
    }else if(isTexting == true){
      agent.texting();
    }
    // agent.put_iPhone();


    //Add some optical flare effects!
    p.blendMode(p.SCREEN);
    p.image(flares[0], 1118, 102, 1600 * 1.5, 889 * 1.5);
    p.image(flares[1], 497, 285, 1600 * 0.2, 1333 * 0.2);
    p.image(flares[2], 932, 280, 1600 * 0.2, 1333 * 0.2);

  }

  p.actionDuration = (min, max) => {
    // console.log("new action interval emerged");
    if(intervalCount == 0){
      randomNum = myp5.random(min, max);
      console.log("----------");
      console.log("new action begins");
    }else{}

    if(intervalCount > randomNum){
      intervalCount = 0;
    }else{
      intervalCount++;
    }

    // console.log(this.randomNum);
    return myp5.int(randomNum);
  }
}//Canvas end



let myp5 = new p5(canvas, 'canvas');
