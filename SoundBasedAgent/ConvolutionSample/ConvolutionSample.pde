float mouseValue;
float[] valueBox = {};
int displayLength = 80;
float valueSum;
float valueAvg;

void setup(){
  size(960, 540);
  colorMode(HSB);
}

void draw(){
  background(0);
  if(frameCount % 12 == 0){
    mouseValue = map(mouseY, 0, height, 1.0, 0);
    valueBox = append(valueBox, mouseValue);
    
    if(valueBox.length > displayLength){
      
      for(int i=0; i < displayLength; i++){
        valueBox[valueBox.length-(1+i)] = convolution(valueBox[valueBox.length-(1+i)], 0.999, i);
      }
      for(int i = 0; i < displayLength; i++){
        valueSum += valueBox[valueBox.length-(1+i)];
      }
      valueAvg = valueSum/displayLength;
      
    }else{
      
      for(int i=0; i < valueBox.length-1; i++){
        valueBox[i] = convolution(valueBox[i], 0.999, valueBox.length-(1+i));
      }
      for(int i = 0; i < valueBox.length-1; i++){
        valueSum += valueBox[valueBox.length-(1+i)];
      }
      valueAvg = valueSum/valueBox.length;
      
    }
   
  }
  
  stroke(255);
  strokeWeight(1);
  line(50, 20, 50, height-20);
  line(20, height - 50, width - 20, height - 50);
  
  if(valueBox.length > displayLength){
    for(int i = 0; i < displayLength; i++){
      float rectHeight = map(valueBox[valueBox.length-1-i], 0, 1, 0, height-100);
      fill(i/2+130, 255, 255);
      noStroke();
      rect(10*i+55, (height - 50) - rectHeight, 9, rectHeight, 3, 3, 3, 3);
      //rect(10*i+55, (height - 50) - rectHeight, 9, 2, 3, 3, 3, 3);
    }
  }else{
    for(int i = 0; i < valueBox.length-1; i++){
      float rectHeight = map(valueBox[valueBox.length-1-i], 0, 1, 0, height-100);
      fill(i/2+130, 255, 255);
      noStroke();
      rect(10*i+55, (height - 50) - rectHeight, 9, rectHeight, 3, 3, 3, 3);
      //rect(10*i+55, (height - 50) - rectHeight, 9, 2, 3, 3, 3, 3);
    }
  }
  
  fill(255);
  textSize(12);
  text("Average: "+valueAvg, width - 160, 50);
  textSize(20);
  text("1", 30, 60);
  text("0", 30, height-27);
  
  valueSum = 0;
}

float convolution(float val, float n, int x){
  return val * pow(n, x);
}
