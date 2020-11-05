int screen_index = 1;

void setup(){
  
  size(400, 300);
}

void draw(){
   background(255);
   
   if(screen_index == 1){
     screen1();
   }else if(screen_index == 2){
    screen2();
   } 
}

void mousePressed(){
 if(mouseX > width/2-20 && mouseX < width/2+20 && 
   mouseY > height/2-20 && mouseY < height/2+20){
    screen_index++;
 }
}

void screen1(){
  rect(width/2-20, height/2-20, 40, 40);
}

void screen2(){
  rect(width/4-20, height/2-20, 40, 40);
  rect(width*3/4-20, height/2-20, 40, 40);
}
