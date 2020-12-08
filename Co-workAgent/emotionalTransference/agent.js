class Agent{
  constructor(){
    this.index = 0;
    this.emotionArrayIndex = 0;

    this.typingProbability = 0;

    this.noiseOffset = 0.0;
    this.cNoiseOffset;
    this.pNoiseOffset;

    this.samplingTime = 0;

    this.isTypingSomething = false;
    this.isScrolling = false;
    this.isTappingSomething = false;

    this.intervalCount = 0;
    this.randomNum = 10;

    //To store elapsed time of each action state
    this.thinkingFrame = 0;
    this.typingFrame = 0;
    this.textingFrame = 0;


    this.typing_L0 = false;
    this.typing_L1 = false;
    this.typing_R0 = false;

    //To store elapsed time of each emotion state
    this.laughingFrame = 0;
    this.depressingFrame = 0;
    this.irritatingFrame = 0;
    this.disgustingFrame = 0;
    this.surprisedFrame = 0;

    this.epochCount = 0;
    this.soundEpochCount = 0;
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

  emotionAnimation(animationArray, epoch){
    myp5.image(animationArray[this.emotionArrayIndex], 480, 270, 960, 540);

    //epochCount is reseted everytime in emotionProbability() in sketch.js!
    if(this.epochCount < epoch){
      if(this.emotionArrayIndex == animationArray.length - 1){
        this.emotionArrayIndex = 0;
        this.epochCount++;
      }else{
        this.emotionArrayIndex++;
      }
    }
  }

  emotionSound(soundArray, index, epoch, freqency, volume, mode){
    if(myp5.frameCount % freqency == 0){
      if(this.soundEpochCount < epoch){
        let index_;

        if(index = "random"){
          index_ = myp5.int(myp5.random(0, soundArray.length));
        }else{
          index_ = index;
        }

        console.log("soundArray: "+soundArray);
        console.log("soundArray.length: "+soundArray.length);
        console.log("index_"+index_);

        soundArray[index_].playMode(mode);
        soundArray[index_].setVolume(volume);
        soundArray[index_].play();

        this.soundEpochCount++;
      }
    }
  }


  thinking(){
    if(previousAction == "typing"){
      if(this.thinkingFrame < 21){
        myp5.image(thinking_typing[(thinking_typing.length - 1) - this.thinkingFrame], 480, 270, 960, 540);
      }else if (this.thinkingFrame >= 21) {

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

        if(this.thinkingFrame == 100){
          console.log(actionDuration);
        }

        // if(this.thinkingFrame == actionDuration / 2){
          // console.log("------------------------");
          // console.log("isDefaultState: " + isDefaultState);
          // console.log("isLaughing: " + isLaughing);
          // console.log("isDepressing: " + isDepressing);
          // console.log("isIrritating: " + isIrritating);
          // console.log("isDisgusted: " + isDisgusted);
          // console.log("isSurprised: " + isSurprised);
          // console.log("------------------------");
        // }

        //In this mode_emotionalTransference, it's important the
        if(isDefaultState == true){
          if(this.thinkingFrame == actionDuration - 10){
            previousAction = "thinking";
            console.log("previousAction is changed to thinking.");
          }
        }else if (isLaughing == true) {
          if(this.thinkingFrame == actionDuration - laughing[0].length*10){
            previousAction = "thinking";
            console.log("previousAction is changed to thinking.");
          }
        }else if (isDepressing == true) {
          if(this.thinkingFrame == actionDuration - depressing[0].length+10){
            previousAction = "thinking";
            console.log("previousAction is changed to thinking.");
          }
        }else if (isIrritating == true) {
          if(this.thinkingFrame == actionDuration - irritating[0].length*6){
            previousAction = "thinking";
            console.log("previousAction is changed to thinking.");
          }
        }else if (isDisgusted == true) {
          if(this.thinkingFrame == actionDuration - disgusting[0].length){
            previousAction = "thinking";
            console.log("previousAction is changed to thinking.");
          }
        }else if (isSurprised == true) {
          if(this.thinkingFrame == actionDuration - surprising[0].length){
            previousAction = "thinking";
            console.log("previousAction is changed to thinking.");
          }
        }
      }
    }else if(previousAction == "thinking"){
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
    console.log(this.thinkingFrame);
    this.thinkingFrame++;
  }

  typing(frameStep, mode, min, max){
    if(previousAction == "thinking"){
      if(this.typingFrame < 21){
        myp5.image(thinking_typing[this.typingFrame], 480, 270, 960, 540);
      }else if (this.typingFrame >= 21) {
        //For even randomize the duration of the cycle
        let typeFreqency = this.interval(4, 20);

        if(myp5.frameCount % typeFreqency == 0){//Every typeFreqency frames this happens

          this.noiseOffset = this.noiseOffset + 0.1;
          let n = myp5.noise(this.noiseOffset);

          this.cNoiseOffset = n;
          if(this.samplingTIme == 0){
            this.pNoiseOffset = n;
          }else{}
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

      if(this.thinkingFrame == 100){
        console.log(actionDuration);
      }

      // if(this.typingFrame == actionDuration / 2){
        // console.log("------------------------");
        // console.log("isDefaultState: " + isDefaultState);
        // console.log("isLaughing: " + isLaughing);
        // console.log("isDepressing: " + isDepressing);
        // console.log("isIrritating: " + isIrritating);
        // console.log("isDisgusted: " + isDisgusted);
        // console.log("isSurprised: " + isSurprised);
        // console.log("------------------------");
      // }

      //In this mode_emotionalTransference, it's important the
      if(isDefaultState == true){
        if(this.typingFrame == actionDuration - 10){
          previousAction = "typing";
          console.log("previousAction is changed to typing.");
        }
      }else if (isLaughing == true) {
        if(this.typingFrame == actionDuration - laughing[0].length*10){
          previousAction = "typing";
          console.log("previousAction is changed to typing.");
        }
      }else if (isDepressing == true) {
        if(this.typingFrame == actionDuration - depressing[0].length){
          previousAction = "typing";
          console.log("previousAction is changed to typing.");
        }
      }else if (isIrritating == true) {
        if(this.typingFrame == actionDuration - irritating[0].length*6){
          previousAction = "typing";
          console.log("previousAction is changed to typing.");
        }
      }else if (isDisgusted == true) {
        if(this.typingFrame == actionDuration - disgusting[0].length){
          previousAction = "typing";
          console.log("previousAction is changed to typing.");
        }
      }else if (isSurprised == true) {
        if(this.typingFrame == actionDuration - surprising[0].length){
          previousAction = "typing";
          console.log("previousAction is changed to typing.");
        }
      }
    }else if(previousAction == "typing"){

      //For even randomize the duration of the cycle
      let typeFreqency = this.interval(4, 20);

      if(myp5.frameCount % typeFreqency == 0){//Every typeFreqency frames this happens

        this.noiseOffset = this.noiseOffset + 0.1;
        let n = myp5.noise(this.noiseOffset);

        this.cNoiseOffset = n;
        if(this.samplingTIme == 0){
          this.pNoiseOffset = n;
        }else{}
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
    console.log(this.typingFrame);
    this.typingFrame++;
  }


  laughing(currentAction, epoch){

    if(currentAction == "thinking"){
      if(previousAction == "thinking"){

        if(this.laughingFrame < laughing[0].length * epoch){
          this.emotionAnimation(laughing[0], epoch);

          if(this.laughingFrame == 3){
            this.emotionSound(laughingVoice, "random", 1, 1, 0.1, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }

        }else{
          this.thinking();
        }

      }else if(previousAction == "typing"){

        if(this.laughingFrame < thinking_typing.length){
          this.thinking();
        }else if (this.laughingFrame >= thinking_typing.length &&
        this.laughingFrame < laughing[0].length * epoch + thinking_typing.length) {

          this.emotionAnimation(laughing[0], epoch);

          if(this.laughingFrame == 24){
            this.emotionSound(laughingVoice, "random", 1, 1, 0.1, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if (this.laughingFrame >= laughing[0].length * epoch + thinking_typing.length) {
          this.thinking();
        }

      }
    }else if (currentAction == "typing") {
      if(previousAction == "thinking"){

        if(this.laughingFrame < thinking_typing.length){
          this.typing(8, "sustain", 0, 0.5);
        }else if (this.laughingFrame >= thinking_typing.length &&
        this.laughingFrame < laughing[1].length * epoch + thinking_typing.length) {

          this.emotionAnimation(laughing[1], epoch);

          if(this.laughingFrame == 24){
            this.emotionSound(laughingVoice, "random", 1, 1, 0.1, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if (this.laughingFrame >= laughing[1].length * epoch + thinking_typing.length) {
          this.typing(8, "sustain", 0, 0.5);
        }

      }else if(previousAction == "typing"){

        if(this.laughingFrame < laughing[1].length * epoch){
          this.emotionAnimation(laughing[1], epoch);

          if(this.laughingFrame == 3){
            this.emotionSound(laughingVoice, "random", 1, 1, 0.1, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }

        }else if(this.laughingFrame >= laughing[1].length * epoch){
          this.typing(8, "sustain", 0, 0.5);
        }

      }//previousAction == "typing"...end
    }//currentAction == "typing"...end

    this.laughingFrame++;
  }


  depressing(currentAction, epoch){
    if(currentAction == "thinking"){
      if(previousAction == "thinking"){

        if(this.depressingFrame < depressing[0].length * epoch){
          //Depressing move
          this.emotionAnimation(depressing[0], epoch);
          if(this.depressingFrame == 5){
            this.emotionSound(depressingVoice, "random", 1, 1, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if (this.depressingFrame >= depressing[0].length * epoch) {
          this.thinking();
        }

      }else if (previousAction == "typing") {

        if(this.depressingFrame < thinking_typing.length){
          this.thinking();
        }else if (this.depressingFrame >= thinking_typing.length && this.depressingFrame < depressing[0].length * epoch + thinking_typing.length) {
          this.emotionAnimation(depressing[0], epoch);

          if(this.depressingFrame == thinking_typing.length + 5){
            this.emotionSound(depressingVoice, "random", 1, 1, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }

        }else if (this.depressingFrame >= depressing[0].length * epoch + thinking_typing.length) {
          this.thinking();
        }

      }
    }else if (currentAction == "typing") {
      if(previousAction == "thinking"){

        if(this.depressingFrame < thinking_typing.length){
          this.typing(8, "sustain", 0, 0.5);
        }else if (this.depressingFrame >= thinking_typing.length && this.depressingFrame < depressing[1].length * epoch + thinking_typing.length) {
          this.emotionAnimation(depressing[1], epoch);

          if(this.depressingFrame == thinking_typing.length + 5){
            this.emotionSound(depressingVoice, "random", 1, 1, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }

        }else if (this.depressingFrame >= depressing[1].length * epoch + thinking_typing.length) {
          this.typing(8, "sustain", 0, 0.5);
        }

      }else if (previousAction == "typing") {

        if(this.depressingFrame < depressing[1].length * epoch){
          this.emotionAnimation(depressing[1], epoch);
          if(this.depressingFrame == 5){
            this.emotionSound(depressingVoice, "random", 1, 1, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if(this.depressingFrame >= depressing[1].length * epoch){
          this.typing(8, "sustain", 0, 0.5);
        }

      }//previousAction == "typing"...end
    }//currentAction == "typing"...end

    this.depressingFrame++;
  }

  irritating(currentAction, epoch){
    if(currentAction == "thinking"){
      if(previousAction == "thinking"){
        if(this.irritatingFrame < irritating[0].length * epoch){
          this.emotionAnimation(irritating[0], epoch);

          if(this.irritatingFrame == irritating[0].length){
            this.emotionSound(irritatingVoice, "random", epoch, irritating[0].length, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if(this.irritatingFrame >= irritating[0].length * epoch){
          this.thinking();
        }

      }else if(previousAction == "typing"){
        if(this.irritatingFrame < thinking_typing.length){
          this.thinking();
        }else if (this.irritatingFrame >= thinking_typing.length && this.irritatingFrame < irritating[0].length * epoch + thinking_typing.length) {
          this.emotionAnimation(irritating[0], epoch);

          if(this.irritatingFrame == thinking_typing.length + irritating[0].length){
            this.emotionSound(irritatingVoice, "random", epoch, irritating[0].length, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if (this.irritatingFrame >= irritating[0].length * epoch + thinking_typing.length) {
          this.thinking();
        }

      }
    }else if (currentAction == "typing") {
      if(previousAction == "thinking"){
        if(this.irritatingFrame < thinking_typing.length){
          this.typing(8, "sustain", 0, 0.5);
        }else if (this.irritatingFrame >= thinking_typing.length && this.irritatingFrame < irritating[1].length * epoch + thinking_typing.length) {
          this.emotionAnimation(irritating[1], epoch);

          if(this.irritatingFrame == thinking_typing.length + irritating[1].length){
            this.emotionSound(irritatingVoice, "random", epoch, irritating[1].length, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if (this.typingirritatingFrame >= irritating[1].length * epoch + thinking_typing.length) {
          this.typing(8, "sustain", 0, 0.5);
        }

      }else if(previousAction == "typing"){
        if(this.irritatingFrame < irritating[1].length * epoch){
          this.emotionAnimation(irritating[1], epoch);

          if(this.irritatingFrame == thinking_typing.length + irritating[1].length){
            this.emotionSound(irritatingVoice, "random", epoch, irritating[1].length, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if(this.irritatingFrame >= irritating[1].length * epoch){
          this.typing(8, "sustain", 0, 0.5);
        }

      }//previousAction == "typing"...end
    }//currentAction == "typing"...end

    this.irritatingFrame++;
  }

  disgusting(currentAction, epoch){
    if(currentAction == "thinking"){
      if(previousAction == "thinking"){

        if(this.disgustingFrame < disgusting[0].length * epoch){
          //Depressing move
          this.emotionAnimation(disgusting[0], epoch);

          if(this.disgustingFrame == 5){
            this.emotionSound(disgustedVoice, 0, 1, 1, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if (this.disgustingFrame >= disgusting[0].length) {
          this.thinking();
        }

      }else if (previousAction == "typing") {

        if(this.disgustingFrame < thinking_typing.length){
          this.thinking();
        }else if (this.disgustingFrame >= thinking_typing.length && this.disgustingFrame < disgusting[0].length * epoch + thinking_typing.length) {
          this.emotionAnimation(disgusting[0], epoch);

          if(this.disgustingFrame == thinking_typing.length + 5){
            this.emotionSound(disgustedVoice, 0, 1, 1, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if (this.disgustingFrame >= disgusting[0].length * epoch + thinking_typing.length) {
          this.thinking();
        }

      }
    }else if (currentAction == "typing") {
      if(previousAction == "thinking"){

        if(this.disgustingFrame < thinking_typing.length){
          this.typing(8, "sustain", 0, 0.5);
        }else if (this.disgustingFrame >= thinking_typing.length && this.disgustingFrame < disgusting[1].length * epoch + thinking_typing.length) {
          this.emotionAnimation(disgusting[1], epoch);

          if(this.disgustingFrame == thinking_typing.length + 5){
            this.emotionSound(disgustedVoice, 0, 1, 1, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if (this.disgustingFrame >= disgusting[1].length * epoch + thinking_typing.length) {
          this.typing(8, "sustain", 0, 0.5);
        }

      }else if (previousAction == "typing") {

        if(this.disgustingFrame < disgusting[1].length * epoch){
          this.emotionAnimation(disgusting[1], epoch);

          if(this.disgustingFrame == 5){
            this.emotionSound(disgustedVoice, 0, 1, 1, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if(this.disgustingFrame >= disgusting[1].length * epoch){
          this.typing(8, "sustain", 0, 0.5);
        }

      }//previousAction == "typing"...end
    }//currentAction == "typing"...end

    this.disgustingFrame++;
  }

  surprised(currentAction, epoch){
    if(currentAction == "thinking"){
      if(previousAction == "thinking"){

        if(this.surprisedFrame < surprising[0].length * epoch){
          //Depressing move
          this.emotionAnimation(surprising[0], epoch);

          if(this.surprisedFrame == 5){
            this.emotionSound(suprisedVoice, "random", 1, 1, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if (this.surprisedFrame >= surprising[0].length) {
          this.thinking();
        }

      }else if (previousAction == "typing") {

        if(this.surprisedFrame < thinking_typing.length){
          this.thinking();
        }else if (this.surprisedFrame >= thinking_typing.length && this.surprisedFrame < surprising[0].length * epoch + thinking_typing.length) {
          this.emotionAnimation(surprising[0], epoch);

          if(this.surprisedFrame == thinking_typing.length + 5){
            this.emotionSound(suprisedVoice, "random", 1, 1, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if (this.surprisedFrame >= surprising[0].length * epoch + thinking_typing.length) {
          this.thinking();
        }

      }
    }else if (currentAction == "typing") {
      if(previousAction == "thinking"){

        if(this.surprisedFrame < thinking_typing.length){
          this.typing(8, "sustain", 0, 0.5);
        }else if (this.surprisedFrame >= thinking_typing.length && this.surprisedFrame < surprising[1].length * epoch + thinking_typing.length) {
          this.emotionAnimation(surprising[1], epoch);

          if(this.surprisedFrame == thinking_typing.length + 5){
            this.emotionSound(suprisedVoice, "random", 1, 1, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if (this.surprisedFrame >= surprising[1].length * epoch + thinking_typing.length) {
          this.typing(8, "sustain", 0, 0.5);
        }

      }else if (previousAction == "typing") {

        if(this.surprisedFrame < surprising[1].length * epoch){
          this.emotionAnimation(surprising[1], epoch);

          if(this.surprisedFrame == 5){
            this.emotionSound(suprisedVoice, "random", 1, 1, 0.5, "sustain"); //(soundArray, index, epoch, freqency, volume, mode)
          }
        }else if(this.surprisedFrame >= surprising[1].length * epoch){
          this.typing(8, "sustain", 0, 0.5);
        }

      }//previousAction == "typing"...end
    }//currentAction == "typing"...end

    this.surprisedFrame++;
  }

}
