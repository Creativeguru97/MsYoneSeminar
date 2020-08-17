class Agent{
  constructor(){
    this.index = 0;
    this.frameIncliment = 0;
    this.typingProbability = 0;

    this.noiseOffset = 0.0;
    this.cNoiseOffset;
    this.pNoiseOffset;

    this.samplingTime = 0;

    this.currentFrame = 0;

    this.typing_L0 = false;
    this.typing_L1 = false;
    this.typing_R0 = false;
    this.isTypingSomething = false;

  }

  thinking(){
    this.index += this.frameIncliment;
    if(this.index > thinking.length - 2){
      this.frameIncliment = -1;
    }else if (this.index < 1) {
      this.frameIncliment = 1;
    }

    console.log(this.index);
    // return this.index;
    myp5.image(thinking[this.index], 480, 270, 960, 540);
  }

  typing(frameStep){
    //This is the default state which no types are happning
    // myp5.image(typing_L0[0], 480, 270, 960, 540);

    if(myp5.frameCount % 10 == 0){//Every 30 frames this happens
      this.index = 0; //Reinitialize the index
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
    }

    if(this.typing_L0 == true){
      myp5.image(typing_L0[this.index], 480, 270, 960, 540);
      console.log(this.index);
      if(this.index > typing_L0.length - 2){
        this.index = typing_L0.length - 1;
      }else{
        this.index++;
      }
    }else if(this.typing_L1 == true){
      myp5.image(typing_L1[this.index], 480, 270, 960, 540);
      console.log(this.index);
      if(this.index > typing_L1.length - 2){
        this.index = typing_L1.length - 1;
      }else{
        this.index++;
      }
    }else if(this.typing_R0 == true){
      myp5.image(typing_R0[this.index], 480, 270, 960, 540);
      console.log(this.index);
      if(this.index > typing_R0.length - 2){
        this.index = typing_R0.length - 1;
      }else{
        this.index++;
      }
    }

  }


}
