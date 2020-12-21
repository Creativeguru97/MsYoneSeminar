PFont f;
PFont sf;

boolean isTalkMode = true;//nói chuyện
boolean isLearningMode = false;//học 

boolean isGreetingMode = false;//chào
boolean isGuideMode = false; //dẫn
boolean isTalkExMode = false;//nói chuyện vui vẻ

int buttonW = 120;
int buttonH = 40;

int sButtonW = 80;
int sButtonH = 30;


JSONArray study_words;


void setup(){
  printArray(PFont.list());
  size(600, 450);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  
  f = createFont("SFProDisplay-Ultralight", 24);
  sf = createFont("SFProDisplay-Ultralight", 18);
  
  study_words = loadJSONArray("studyWords.json");
}

void draw(){
   background(255);
   textFont(f);
 
   if(isGreetingMode){
     study("あいさつ");
   }else if(isGuideMode){
     study("案内");
   }else if(isTalkExMode){
     study("会話促進");
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
       isGuideMode = false;
       isTalkExMode = false;
    }else if(mouseX > width/2 - buttonW/2 && mouseX < width/2 + buttonW/2 && 
     mouseY > height/2 - buttonH/2 && mouseY < height/2 + buttonH/2){
       //button dẫn mode
       isGreetingMode = false;
       isGuideMode = true;
       isTalkExMode = false;
    }else if(mouseX > width*3/4 - buttonW/2 && mouseX < width*3/4 + buttonW/2 && 
     mouseY > height/2 - buttonH/2 && mouseY < height/2 + buttonH/2){
       //button nói chuyện vui vẻ mode
       isGreetingMode = false;
       isGuideMode = false;
       isTalkExMode = true;
    }
  }
  
  if(isGreetingMode || isGuideMode || isTalkExMode){
    if(mouseX > 75 - sButtonW/2 && mouseX < 75 + sButtonW/2 && 
     mouseY > 70 - sButtonH/2 && mouseY < 70 + sButtonH/2){
       //button Chào mode
       isGreetingMode = true;
       isGuideMode = false;
       isTalkExMode = false;
    }else if(mouseX > 160 - sButtonW/2 && mouseX < 160 + sButtonW/2 && 
     mouseY > 70 - sButtonH/2 && mouseY < 70 + sButtonH/2){
       //button dẫn mode
       isGreetingMode = false;
       isGuideMode = true;
       isTalkExMode = false;
    }else if(mouseX > 245 - sButtonW/2 && mouseX < 245 + sButtonW/2 && 
     mouseY > 70 - sButtonH/2 && mouseY < 70 + sButtonH/2){
       //button nói chuyện vui vẻ mode
       isGreetingMode = false;
       isGuideMode = false;
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
  
  if(isGreetingMode || isGuideMode || isTalkExMode){
    noFill();
    rect(75, 70, sButtonW, sButtonH);
    rect(160, 70, sButtonW, sButtonH);
    rect(245, 70, sButtonW, sButtonH);
    
    textFont(sf);
    text("あいさつ", 75, 70);
    text("案内", 160, 70);
    text("会話促進", 245, 70);
  }
}

void study(String contentMode){
  if(isTalkMode){
    text("会話", width/2, height/2-20);//Kaiwa
    text(contentMode, width/2, height/2+20);//chào, dẫn hoặc thúc đẩy hội thoại 
  }else if(isLearningMode){
    text("学習", width/2, height/2-20);//học
    text(contentMode, width/2, height/2+20);////chào, dẫn hoặc thúc đẩy hội thoại
  }
}
