PFont f;

boolean isTalkMode = true;//nói chuyện
boolean isLearningMode = false;//học 

boolean isGreetingMode = false;//chào
boolean isGuideMode = false; //dẫn
boolean isTalkExMode = false;//nói chuyện vui vẻ

int buttonW = 120;
int buttonH = 40;


void setup(){
  printArray(PFont.list());
  size(600, 450);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
}

void draw(){
   background(255);
   f = createFont("SFProDisplay-Light", 24);
   textFont(f);
 
   if(isGreetingMode){
     GreetingMode();
   }else if(isGuideMode){
     guideMode();
   }else if(isTalkExMode){
     talkExMode();
   }else if(!isGreetingMode && !isGuideMode && !isTalkExMode){
     selectScreen();
   }
   
   toggleButton();
}

void mousePressed(){
  if(!isGreetingMode && !isGuideMode && !isTalkExMode){
    if(mouseX > width/4 - buttonW/2 && mouseX < width/4 + buttonW/2 && 
     mouseY > height/2 - buttonH/2 && mouseY < height/2 + buttonH/2){
       //button Chào mode
       isGreetingMode = true;
    }else if(mouseX > width/2 - buttonW/2 && mouseX < width/2 + buttonW/2 && 
     mouseY > height/2 - buttonH/2 && mouseY < height/2 + buttonH/2){
       //button dẫn mode
       isGuideMode = true;
    }else if(mouseX > width*3/4 - buttonW/2 && mouseX < width*3/4 + buttonW/2 && 
     mouseY > height/2 - buttonH/2 && mouseY < height/2 + buttonH/2){
       //button nói chuyện vui vẻ mode
       isTalkExMode = true;
    }
  }
  
  if(mouseX > 160 - 150 && mouseX < 160 + 150 && 
     mouseY > 30 - buttonH/2 && mouseY < 30 + buttonH/2){
       isTalkMode = !isTalkMode;
       isLearningMode = !isLearningMode;
  }
}

void selectScreen(){
  noFill();
  rect(width/4, height/2, buttonW, buttonH);
  rect(width/2, height/2, buttonW, buttonH);
  rect(width*3/4, height/2, 120, 40);
  
  fill(0);
  text("あいさつ", width/4, height/2);
  text("案内", width/2, height/2);
  text("会話促進", width*3/4, height/2);
}

void toggleButton(){
  noFill();
  rect(160, 30, 300, buttonH);
  
  fill(0);
  if(isTalkMode){
    text("学習モードに切替", 160, 30);
  }else if(isLearningMode){
    text("会話モードに切替", 160, 30);
  }
}


void GreetingMode(){
  if(isTalkMode){
    text("会話", width/2, height/2-20);//Kaiwa
    text("あいさつ", width/2, height/2+20);//Chào
  }else if(isLearningMode){
    text("学習", width/2, height/2-20);//học
    text("あいさつ", width/2, height/2+20);//Chào
  }
}

void guideMode(){
  if(isTalkMode){
    text("会話", width/2, height/2-20);//Kaiwa
    text("案内", width/2, height/2+20);//dẫn
  }else if(isLearningMode){
    text("学習", width/2, height/2-20);//học
    text("案内", width/2, height/2+20);//dẫn
  }
}

void talkExMode(){
  if(isTalkMode){
    text("会話", width/2, height/2-20);//Kaiwa
    text("会話促進", width/2, height/2+20);//nói chuyện vui vẻ
  }else if(isLearningMode){
    text("学習", width/2, height/2-20);//học
    text("会話促進", width/2, height/2+20);//nói chuyện vui vẻ
  }
}
