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

    //For motor mimic mode.
    this.left_right_index = [30, 30, 30, 30, 30, 30];
    //I set 30 as default sinse agent sit exactly vertical.
    this.l_r_avg_index = 30;

    //To store elapsed time of each action state
    this.thinkingFrame = 0;
    this.typingFrame = 0;
    this.textingFrame = 0;


    this.typing_L0 = false;
    this.typing_L1 = false;
    this.typing_R0 = false;

    //To store elapsed time of each emotion state
    this.laughingFrame = 0;
    this.caringFrame = 0;
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

  emotionAnimation(animationArray, epoch, timeDirection){

    if(timeDirection == "forward"){
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
    }else if(timeDirection == "inverted"){

      console.log("emotionArrayIndex: " + this.emotionArrayIndex);
      myp5.image(animationArray[this.emotionArrayIndex], 480, 270, 960, 540);
      //epochCount is reseted everytime in emotionProbability() in sketch.js!
      if(this.epochCount < epoch){
        if(this.emotionArrayIndex == 0){
          this.emotionArrayIndex = animationArray.length - 1;
          this.epochCount++;
        }else{
          this.emotionArrayIndex--;
        }
      }
    }else{
      console.error("Wow, where your time direction toward? Check out the entropy:)");
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

  laughing(loop){
    if(this.laughingFrame < laughingTransition.length){
      console.log("transition move");
      this.emotionAnimation(laughingTransition, 1, "forward");

    }else if(this.laughingFrame >= laughingTransition.length &&
    this.laughingFrame < laughingTransition.length + (laughing.length - 1) * loop) {

      console.log("laugh");

      if(this.laughingFrame == laughingTransition.length){
        this.emotionArrayIndex = 0;
      }

      this.emotionAnimation(laughing, loop, "forward");

    }else if(this.laughingFrame >= laughingTransition.length + (laughing.length - 1) * loop &&
    this.laughingFrame < (laughingTransition.length - 1) * 2 + (laughing.length - 1) * loop) {

      if(this.laughingFrame == laughingTransition.length + (laughing.length - 1) * loop){
        console.log("index adjusted");
        this.emotionArrayIndex = laughingTransition.length - 1;
        this.epochCount = 0;//Reset because in this moment the value is same as "loop"
      }

      // console.log("Inverted transition move");

      this.emotionAnimation(laughingTransition, 1, "inverted");

    }else if (this.laughingFrame >= (laughingTransition.length - 1) * 2 + (laughing.length - 1) * loop) {
      this.thinking();
    }
    this.laughingFrame++;
  }

  caring(){
    if(this.caringFrame < caring.length){
      this.emotionAnimation(caring, 1, "forward");
    }else if(this.caringFrame >= caring.length && this.caringFrame < caring.length + 90) {
      myp5.image(caring[caring.length-1], 480, 270, 960, 540);
    }else if (this.caringFrame >= caring.length+90 && this.caringFrame < caring.length * 2 + 90) {

      if(this.caringFrame == caring.length+90){
        this.emotionArrayIndex = caring.length - 1;
        this.epochCount = 0;//Reset because in this moment the value is 1
      }

      this.emotionAnimation(caring, 1, "inverted");
    }else if(this.caringFrame >= caring.length * 2 + 90){
      this.thinking(this.caringFrame < caring.length * 2 + 90);
    }
    this.caringFrame++;
  }

}
