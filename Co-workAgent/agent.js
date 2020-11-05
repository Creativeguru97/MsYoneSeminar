class Agent{
  constructor(){
    this.index = 0;
    this.typingProbability = 0;

    this.noiseOffset = 0.0;
    this.cNoiseOffset;
    this.pNoiseOffset;

    this.samplingTime = 0;

    //To store elapsed time of each action state
    this.thinkingFrame = 0;
    this.typingFrame = 0;
    this.textingFrame = 0;
    //To store elapsed time of each emotion state
    this.laughingFrame = 0;
    this.depressingTime = 0;


    this.typing_L0 = false;
    this.typing_L1 = false;
    this.typing_R0 = false;

    this.epochCount = 0;

    this.isTypingSomething = false;
    this.isScrolling = false;
    this.isTappingSomething = false;

    this.intervalCount = 0;
    this.randomNum = 10;
  }

  interval(min, max){
    if(this.intervalCount == 0){
      this.randomNum = myp5.random(min, max);
      // console.log("new interval emerged")
    }else{}

    if(this.intervalCount > this.randomNum){
      this.intervalCount = 0;
    }else{
      this.intervalCount++;
    }

    // console.log(this.randomNum);
    return myp5.int(this.randomNum);
  }

  existanceStrength(soundFile, index, min, max){
    let volume = myp5.map(
      myp5.nf(userState.happyAvg*100+userState.displacementAvg, 2, 2), 0, 20.0, max, min);
      // console.log(p.nf(userState.happyAvg*100+userState.displacementAvg, 2, 2));
    // console.log(volume);
    if(index == null){
      soundFile.setVolume(volume);
    }else{
      soundFile[index].setVolume(volume);
    }
  }


  animation(animationArray, boolean){
    // console.log(this.index);
    myp5.image(animationArray[this.index], 480, 270, 960, 540);

    if(this.index > animationArray.length - 2){
      this.index = animationArray.length - 1;

      if(boolean == "null"){
      }else if(boolean === this.isTappingSomething){
        this.isTappingSomething = false;
      }else if(boolean === this.isScrolling){
        this.isScrolling = false;
      }

    }else{
      this.index++;
    }
  }

  loopAnimation(animationArray, epoch){
    myp5.image(animationArray[this.index], 480, 270, 960, 540);

    //epochCount is reseted everytime in emotionProbability() in sketch.js!
    if(this.epochCount <= epoch){
      if(this.index == animationArray.length - 1){
        this.index = 0;
        this.epochCount++;
      }else{
        this.index++;
      }
    }
  }


  thinking(){
    if(previousAction == "typing" && this.thinkingFrame < 21){
      myp5.image(thinking_typing[(thinking_typing.length - 1) - this.thinkingFrame], 480, 270, 960, 540);
      if(this.thinkingFrame > thinking_typing.length - 2){
        this.thinkingFrame = thinking_typing.length - 1;
        previousAction = "thinking";
      }
    }else if(previousAction == "texting" && this.thinkingFrame < 91){
      myp5.image(thinking_texting[(thinking_texting.length - 1) - this.thinkingFrame], 480, 270, 960, 540);
      if(this.thinkingFrame > thinking_texting.length - 2){
        this.thinkingFrame = thinking_texting.length - 1;
        previousAction = "thinking";
      }

      if(this.thinkingFrame == 60){
        world.putPhoneOnTableSound();
      }
    }else{
      let scrollFreqency = this.interval(40, 200);

      if(myp5.frameCount % scrollFreqency == 0 && this.isScrolling == false){//Every typeFreqency frames this happens
        this.index = 0; //Reset the index
        this.isScrolling = true;

        //Sound effects
        let whichSound = myp5.int(myp5.random(0, 2));
        if(whichSound == 0){
          scrollingSound[0].setVolume(0.2);
          scrollingSound[0].play();
        }else if(whichSound == 1){
          scrollingSound[1].setVolume(0.2);
          scrollingSound[1].play();
        }else if(whichSound == 2){
          scrollingSound[2].setVolume(0.2);
          scrollingSound[2].play();
        }
      }

      //Animate one of them just once at each time
      if(this.isScrolling == true){
        this.animation(thinking, this.isScrolling);
      }else{
        myp5.image(thinking[0], 480, 270, 960, 540);
      }
    }
    this.thinkingFrame++;
  }

  typing(frameStep, mode, min, max){
    if(previousAction == "thinking" && this.typingFrame < 21){
      myp5.image(thinking_typing[this.typingFrame], 480, 270, 960, 540);
      if(this.typingFrame > thinking_typing.length - 2){
        this.typingFrame = thinking_typing.length - 1;
        previousAction = "typing";
        // console.log(this.isScrolling);
      }
    }else if(previousAction == "texting" && this.typingFrame < 91){
      myp5.image(pullIPhone[(pullIPhone.length - 1) - this.typingFrame], 480, 270, 960, 540);
      if(this.typingFrame > pullIPhone.length - 2){
        this.typingFrame = pullIPhone.length - 1;
        previousAction = "typing";
      }

      if(this.typingFrame == 60){
        world.putPhoneOnTableSound();
      }
    }else{

      //For even randomize the duration of the cycle
      let typeFreqency = this.interval(4, 20);

      if(myp5.frameCount % typeFreqency == 0){//Every typeFreqency frames this happens

        this.noiseOffset = this.noiseOffset + 0.1;
        let n = myp5.noise(this.noiseOffset);

        this.cNoiseOffset = n;
        if(this.samplingTIme == 0){
          this.pNoiseOffset = n;
        }else{}

        //if only current noise value is greater than previous one
        //The typing souund happen
        // if(this.cNoiseOffset > this.pNoiseOffset){
          this.index = 0; //Reset the index
          let whichType = myp5.random(0, 10);

          if(whichType < 5){
            this.typing_L0 = true;
            this.typing_L1 = false;
            this.typing_R0 = false;
          }else if(whichType >= 5 && whichType < 9){
            this.typing_L0 = false;
            this.typing_L1 = false;
            this.typing_R0 = true;
          }else if(whichType >= 9){
            this.typing_L0 = false;
            this.typing_L1 = true;
            this.typing_R0 = false;
          }

          let whichSound = myp5.random(0, 100);
          if(whichSound < 90){
            let index = myp5.int(myp5.random(0, keySound.length));
            keySound[index].playMode(mode);
            // this.existanceStrength(keySound, index, min, max);
            keySound[index].setVolume(0.1);
            keySound[index].play();
            // console.log("key is clacked!!!");
          }else if (whichSound >= 90 && whichSound < 95) {
            // this.existanceStrength(spacebarSound, null, min, max);
            spacebarSound.setVolume(0.1);
            spacebarSound.play();
            // console.log("space bar is clacked!!!");
          }else if (whichSound >= 95 && whichSound < 98) {
            // this.existanceStrength(deleteKeySound, null, min, max);
            deleteKeySound.setVolume(0.1);
            deleteKeySound.play();
            // console.log("delete key is clacked!!!");
          }else{
            // this.existanceStrength(enterKeySound, null, min, max);
            enterKeySound.setVolume(0.1);
            enterKeySound.play();
            // console.log("enter key is clacked!!!");
          }
        // }
      }

      //Animate one of them just once at each time
      if(this.typing_L0 == true){
        this.animation(typing_L0, "null");
      }else if(this.typing_L1 == true){
        this.animation(typing_L1, "null");
      }else if(this.typing_R0 == true){
        this.animation(typing_R0, "null");
      }else{
        //This is the default state which no types are happning
        myp5.image(typing_L0[0], 480, 270, 960, 540);
      }

      this.pNoiseOffset = this.cNoiseOffset;
      this.samplingTime++;
    }
    this.typingFrame++;
  }


  texting(){
    if(previousAction == "typing" && this.textingFrame < 91){
      myp5.image(pullIPhone[this.textingFrame], 480, 270, 960, 540);
      if(this.textingFrame > pullIPhone.length - 2){
        this.textingFrame = pullIPhone.length - 1;
        previousAction = "texting";
      }

      if(this.textingFrame == 60){
        world.chairCreaking();
      }
    }else if(previousAction == "thinking" && this.textingFrame < 91){
      myp5.image(thinking_texting[this.textingFrame], 480, 270, 960, 540);
      if(this.textingFrame > thinking_texting.length - 2){
        this.textingFrame = thinking_texting.length - 1;
        previousAction = "texting";
      }

      if(this.textingFrame == 70){
        world.chairCreaking();
      }
    }else{
      let tappingFrequency = this.interval(4, 30);
      if(myp5.frameCount % tappingFrequency == 0 && this.isTappingSomething == false){
        this.index = 0;
        this.isTappingSomething = true;

        let whichSound = myp5.random(0, 100);
        if(whichSound < 90){
          iKeySound.setVolume(0.2);
          iKeySound.play();
        }else if(whichSound >= 90 && whichSound < 97){
          let index = myp5.int(myp5.random(0, iEnterKeySound.length));
          iEnterKeySound[0].setVolume(0.2);
          iEnterKeySound[0].play();
        }else if(whichSound == 2){
          let index = myp5.int(myp5.random(0, iDeleteKeySound.length));
          iDeleteKeySound[0].setVolume(0.2);
          iDeleteKeySound[0].play();
        }
      }

      if(this.isTappingSomething == true){
        this.animation(texting, this.isTappingSomething);
      }else{
        myp5.image(texting[0], 480, 270, 960, 540);
      }
    }
    this.textingFrame++;
  }


  laughing(currentAction, epoch){
    if(currentAction == "thinking"){
      if(previousAction == "thinking"){

        if(this.laughingFrame < laughing[0].length * epoch){
          this.loopAnimation(laughing[0], epoch);
        }else{
          this.thinking();
        }

      }else if(previousAction == "typing"){

        if(this.thinkingFrame < 21){
          this.thinking();
        }else if (this.thinkingFrame >= 21 && this.thinkingFrame < laughing[0].length * epoch + 21) {
          this.loopAnimation(laughing[0], epoch);
        }else if (this.thinkingFrame >= laughing[0].length * epoch + 21) {
          this.thinking();
        }

      }else if(previousAction == "texting"){
        if(this.thinkingFrame < 91){
          this.thinking();
        }else if (this.thinkingFrame >= 91 && this.thinkingFrame < laughing[0].length * epoch + 91) {
          this.loopAnimation(laughing[0], epoch);
        }else if (this.thinkingFrame >= laughing[0].length * epoch + 91) {
          this.thinking();
        }
      }
    }else if (currentAction == "typing") {
      if(previousAction == "thinking"){

        if(this.typingFrame < 21){
          this.typing();
        }else if (this.typingFrame >= 21 && this.typingFrame < laughing[1].length * epoch + 21) {
          this.loopAnimation(laughing[1], epoch);
        }else if (this.typingFrame >= laughing[0].length * epoch + 21) {
          this.typing();
        }

      }else if(previousAction == "typing"){

        if(this.laughingFrame < laughing[1].length * epoch){
          this.loopAnimation(laughing[1], epoch);
        }else{
          this.typing();
        }

      }else if(previousAction == "texting"){
        if(this.typingFrame < 91){
          this.typing();
        }else if (this.typingFrame >= 91 && this.typingFrame < laughing[1].length * epoch + 91) {
          this.loopAnimation(laughing[1], epoch);
        }else if (this.typingFrame >= laughing[0].length * epoch + 91) {
          this.typing();
        }
      }//previousAction == "texting"...end
    }//currentAction == "typing"...end
  }

  depressing(currentAction){
    if(currentAction == "thinking"){
      if(previousAction == "thinking"){
        
      }else if(previousAction == "typing"){

      }else if(previousAction == "texting"){

      }
    }else if (currentAction == "typing"){
      if(previousAction == "thinking"){

      }else if(previousAction == "typing"){

      }else if(previousAction == "texting"){

      }
    }else if(currentAction == "texting"){
      if(previousAction == "thinking"){

      }else if(previousAction == "typing"){

      }else if(previousAction == "texting"){

      }
    }
  }

  irritating(currentAction){

  }

  disgusting(currentAction){

  }

  surprising(currentAction){

  }

}
