let canvas;
let agentCanvas;
let background0;
let background1;
let flares = [];


let agent;
let iPhone;//Class
let world;//Class

//Animations
let agentApperance = [];
let typing_L0 = [];
let typing_L1 = [];
let typing_R0 = [];
let thinking = [];
let texting = [];
let pullIPhone = [];
let thinking_texting = [];
let thinking_typing = [];
let laughing = [];
//Make the laughing 2D array!!!
for(let i=0; i<3; i++){
  laughing[i] = [];
}
let depressing = [];
let typingProbability;
let notification = [];
//Make the notification 2D array!!!
for(let i=0; i<4; i++){
  notification[i] = [];
}


let defaultIPhone;
let textingIPhone;
let pullediPhone = [];


//Sounds
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

let ambientSound;
let putPhoneSound;
let chairCreakingSound;

//Agent states
let isThinking = false;
let isTyping = false;
let isTexting = false;

let isDefaultState = false;
let isDepressing = false;
let isLaughing = false;


//To impliment transittion animation between action to action
//I need to store current action for later.
let previousAction = "";

let intervalCount = 0;
let randomNum = Math.random(450, 1800);

//Non interest version
let pRange0;
let pRange1;
let pRange2;
let pRange3;

//otherOriented version
let model;
let c_Mdl_Width;
let c_Mdl_Height;

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

    for(let i=0; i<90; i++){
      thinking_texting[i] = p.loadImage("animations/thinking_texting/" + p.nf(i, 3) + ".png");
    }

    for(let i=0; i<21; i++){
      thinking_typing[i] = p.loadImage("animations/thinking_typing/" + p.nf(i, 3) + ".png");
    }

    for(let i=0; i<3; i++){
      for(let j=0; j<7; j++){
        if(i == 0){
          laughing[i][j] = p.loadImage("animations/agent_laughing/duringThinking/"+ p.nf(j, 2) + ".png");
        }else if(i == 1){
          laughing[i][j] = p.loadImage("animations/agent_laughing/duringTyping/"+ p.nf(j, 2) + ".png");
        }else if(i == 2){
          laughing[i][j] = p.loadImage("animations/agent_laughing/duringTexting/"+ p.nf(j, 2) + ".png");
        }
      }
    }

    for(let i=0; i<61; i++){
      depressing[i] = p.loadImage("animations/agent_depressing/" + p.nf(i, 3) + ".png");
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

    putPhoneSound = p.loadSound("/soundEffects/putPhone.mp3");

    chairCreakingSound = p.loadSound("/soundEffects/chairCreaking.mp3");

    //notification sound for notification()
    notificationSound = p.loadSound("/soundEffects/notification.mp3");

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

    let firstAction = p.int(p.random(0, 3));
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
    }else{
      isTexting = true;
      previousAction = "texting";
      console.log("Agent is texing");
      console.log("----------");
    }

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
    p.nonEmpathy(900);
    // p.otherOriented(900);

    iPhone.display();
    iPhone.notification(9000, 8999, "sustain", 0, 0.5);

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

    model.show();
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



  p.nonEmpathy = (duration) => {
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
        pRange0 = 70 - instantGratification;
        pRange1 = 100 - instantGratification * 1.5;
      }else if(isTyping == true){
        pRange0 = 30 - instantGratification * 0.5;
        pRange1 = 100 - instantGratification * 1.5;
      }else if(isTexting == true){
        pRange0 = 40;
        pRange1 = 80;

        //Agent has already checked social media.
        //So temporary no need for scratching the smartphone.
        iPhone.UnreadMessagesNum = 0;
      }

      console.log("instantGratification: "+instantGratification);
      console.log("Next action probability: ");
      console.log("thinking: " + pRange0 + "%");
      console.log("typing: " + p.str(pRange1 - pRange0) + "%");
      console.log("texting: " + p.str(100 - pRange1) + "%");
      console.log("↓");

      if(whichAction < pRange0){
        isThinking = true;
        isTyping = false;
        isTexting = false;
        console.log("Agent is thinking");
        console.log("----------");

        agent.thinkingFrame = 0;
      }else if(whichAction >= pRange0 && whichAction < pRange1){
        isThinking = false;
        isTyping = true;
        isTexting = false;
        console.log("Agent is typing");
        console.log("----------");

        agent.typingFrame = 0;
      }else{
        isThinking = false;
        isTyping = false;
        isTexting = true;
        console.log("Agent is texting");
        console.log("----------");

        //I imprimented an other action -> texting animation.
        //So I need to reset the index to display images every time.
        agent.textingFrame = 0;
      }
    }
  }

  p.motorMimicry = () => {

  }

  p.otherOriented = (duration) => {
    if (p.frameCount % duration == 0) {

      agent.index = 0;//Re initialize
      console.log("previousAction: " + previousAction);

      let prbDefaultState = p.map(
        model.CtoP(model.agentEmotionPosition.x, model.agentEmotionPosition.y)[0],
        0,
        model.radius,
        100,
        0
      );
      let prbPositiveState = p.map(model.agentEmotionPosition.x, 0, model.radius, 0, 100);
      if(prbPositiveState < 0){
        prbPositiveState = 0;
      }
      let prbNegativcState = p.map(model.agentEmotionPosition.x, -model.radius, 0, 100, 0);
      if(prbNegativcState < 0){
        prbNegativcState = 0;
      }
      let multiRatio = 100 / (prbDefaultState + prbPositiveState + prbNegativcState);

      prbDefaultState = prbDefaultState * multiRatio;
      prbPositiveState = prbPositiveState * multiRatio;
      prbNegativcState = prbNegativcState * multiRatio;

      // console.log("prbDefaultState: " + prbDefaultState);
      // console.log("prbPositiveState: " + prbPositiveState);
      // console.log("prbNegativcState: " + prbNegativcState);
      // console.log("---------------------------------------");

      let whichAction = p.random(0, 100);


      if(whichAction < prbDefaultState){
        isThinking = true;
        isTyping = false;
        isTexting = false;
        console.log("Agent is thinking");
        console.log("----------");

        agent.thinkingFrame = 0;
      }else if(whichAction >= pRange0 && whichAction < pRange1){
        isThinking = false;
        isTyping = true;
        isTexting = false;
        console.log("Agent is typing");
        console.log("----------");

        agent.typingFrame = 0;
      }else{
        isThinking = false;
        isTyping = false;
        isTexting = true;
        console.log("Agent is texting");
        console.log("----------");

        //I imprimented an other action -> texting animation.
        //So I need to reset the index to display images every time.
        agent.textingFrame = 0;
      }
    }
  }


}//Canvas end



let myp5 = new p5(canvas);
