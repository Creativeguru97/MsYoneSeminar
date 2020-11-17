class Phone{
  constructor(){
    //This gonna be indicies of images in the 2D array "notification" to display
    this.i = 0;
    this.j = 0;

    this.isGotNotification = false;

    //everytime they get notification, number of unread messages increase.
    //Let's store those amount and reflect to notification screen.
    this.UnreadMessagesNum = 0;
  }


  display(){
    if(isMotorMimicking == true){
      myp5.image(defaultIPhone, 480, 270, 960, 540);
    }else{
      if(isTexting == true){
        if(previousAction == "typing" && agent.textingFrame < 90){
          myp5.image(pullediPhone[agent.textingFrame], 480, 270, 960, 540);
        }else if(previousAction == "thinking" && agent.textingFrame < 90){
          myp5.image(pullediPhone[agent.textingFrame], 480, 270, 960, 540);
        }else{
          myp5.image(textingIPhone, 480, 270, 960, 540);
        }
      }else if(isThinking == true){
        if(previousAction == "texting" && agent.thinkingFrame < 90){
          myp5.image(pullediPhone[(pullediPhone.length - 1) - agent.thinkingFrame], 480, 270, 960, 540);
        }else{
          myp5.image(defaultIPhone, 480, 270, 960, 540);
        }
      }else if(isTyping == true){
        if(previousAction == "texting" && agent.typingFrame < 90){
          myp5.image(pullediPhone[(pullediPhone.length - 1) - agent.typingFrame], 480, 270, 960, 540);
        }else{
          myp5.image(defaultIPhone, 480, 270, 960, 540);
        }
      }else{
        myp5.image(defaultIPhone, 480, 270, 960, 540);
      }
    }
  }


  notification(possibilityRange, border, mode, min, max){
    let num = myp5.random(0, possibilityRange);
    if(num > border){
      //Animation relevant
      if(this.UnreadMessagesNum < 4){
        this.i = this.UnreadMessagesNum;
      }else{
        this.i = 3;
      }
      this.j = 0;
      this.isGotNotification = true;

      //Sound relevant
      // this.existanceStrength(notificationSound, null, min, max);
      notificationSound.setVolume(0.1);
      notificationSound.play();
      console.log("");
      console.log("----- Got notification!!! -----");
      console.log("");
      // GotNotified = true;
    }

    if(this.isGotNotification == true){

      if(isTexting == false){//When the agent is not texting
        if (previousAction == "texting") {
          if(this.typingFrame >= 90 || this.thinkingFrame >= 90){

            myp5.image(notification[this.i][this.j], 480, 270, 960, 540);
            if(this.j > notification[this.i].length - 2){
              this.j = notification[this.i].length - 1;
              this.isGotNotification = false;

              //Even unread mesaages are more than 4, the notification screen
              //doesn't look different.
              this.UnreadMessagesNum++;
            }else{
              this.j++;
            }

          }else{}
        }else if (previousAction == "typing" || previousAction == "thinking") {

          myp5.image(notification[this.i][this.j], 480, 270, 960, 540);
          if(this.j > notification[this.i].length - 2){
            this.j = notification[this.i].length - 1;
            this.isGotNotification = false;

            //Even unread mesaages are more than 4, the notification screen
            //doesn't look different.
            this.UnreadMessagesNum++;
          }else{
            this.j++;
          }

        }
      }

    }
  }


}
