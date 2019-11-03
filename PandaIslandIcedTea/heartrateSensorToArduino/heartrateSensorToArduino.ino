int analogPin = A0;
unsigned char counter;
unsigned long beatTimes[21];
unsigned long sub;
unsigned int = heart_rate = 0;
bool data_isValid = true;
const int max_heartpulse_duty = 2500;

void setup() {
  pinMode(data, INPUT);
  pinMode(start,INPUT_PULLUP);
  Serial.begin(115200);
  attachInterrupt(analogPin, interrupt, RISING);
}

void loop() {
  
}

void sum(){
  if(data_isValid){
    heart_rate = 1200000/(temp[20] - temp[0]);
    // Serial.print("Heart_rate_is:\t");
    // Serial.println(heart_rate);
  }
  data_isValid = true;
}

void interrupt(){
  beatTimes[counter] = millis();
  // Serial.print("Heart_beat_time:\t");
  // Serial.println(temp[counter]);

  if(counter == 0){
    sub = beatTimes[counter] - beatTimes[20];
  }else{
    sub = beatTimes[counter] - beatTimes[counter - 1];
  }
  Serial.print("Heart_beat_duration_time:\t");
  Serial.println(sub);

  //If the pulse hasn't came in more than 2 secounds, initialize
  //the beatTimes and start measure again.
  if (sub > max_heartpulse_duty) {
    data_isValid = false; //sign bit
    counter = 0;
    Serial.println("Heart rate measure error,test will restart!" );
    initTemp();
  }

  if(data_isValid){
    
    if(counter == 20){
      counter = 0;
      sum();
    }else{
      counter++;
    }
    
  }else{
    counter = 0;
    data_isValid = 1;
  }
  
}

void initializeBeats(){
  for(int i = 0; i < 20; i++) {
    beatTimes[i] = 0;
  }
  beatTimes[20] = millis();
}
