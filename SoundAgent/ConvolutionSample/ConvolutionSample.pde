float mouseValue;
float[] valueBox = {};
float[] convolutedValueBox = {};
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
    convolutedValueBox = append(convolutedValueBox, 0);
    
    if(convolutedValueBox.length > displayLength){
      
      for(int i=0; i < displayLength; i++){
        //convolutedValueBox[convolutedValueBox.length-(1+i)] = QuadraticFunction(valueBox[valueBox.length-(1+i)], 0.97, i);
        convolutedValueBox[convolutedValueBox.length-(1+i)] = CubicFunction(valueBox[valueBox.length-(1+i)], i);
      }
      for(int i = 0; i < displayLength; i++){
        valueSum += convolutedValueBox[convolutedValueBox.length-(1+i)];
      }
      valueAvg = valueSum/displayLength;
      
    }else{
      for(int i=0; i < valueBox.length; i++){
        //convolutedValueBox[i] = QuadraticFunction(valueBox[i], 0.97, valueBox.length-(1+i));
        convolutedValueBox[i] = CubicFunction(valueBox[i], valueBox.length-(1+i));
      }
      for(int i = 0; i < valueBox.length; i++){
        valueSum += convolutedValueBox[convolutedValueBox.length-(1+i)];
      }
      valueAvg = valueSum/convolutedValueBox.length;
    }
   
  }
  
  stroke(255);
  strokeWeight(1);
  line(50, 20, 50, height-20);
  line(20, height - 50, width - 20, height - 50);
  
  if(convolutedValueBox.length > displayLength){
    for(int i = 0; i < displayLength; i++){
      float rectHeight = map(convolutedValueBox[convolutedValueBox.length-1-i], 0, 1, 0, height-100);
      fill(i/2+130, 255, 255);
      noStroke();
      rect(10*i+55, (height - 50) - rectHeight, 9, rectHeight, 3, 3, 3, 3);
      //rect(10*i+55, (height - 50) - rectHeight, 9, 2, 3, 3, 3, 3);
    }
  }else{
    for(int i = 0; i < convolutedValueBox.length-1; i++){
      float rectHeight = map(convolutedValueBox[convolutedValueBox.length-1-i], 0, 1, 0, height-100);
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

float QuadraticFunction(float val, float n, int x){
    return val * pow(n, x);
}

float CubicFunction(float val, int x){
  return val * -( pow(0.029*x-2, 3) + pow(0.045*x-3, 2) + pow(0.018*x-2, 1));
}
