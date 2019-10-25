//--------------------------------------------------------
// 心拍センサーサンプル
// M5Stackに心拍センサーを接続して心拍数を測定するサンプルです。
//
// 使用センサー：Ear-clip Heart Rate Sensor
// http://wiki.seeedstudio.com/Grove-Ear-clip_Heart_Rate_Sensor/
//--------------------------------------------------------
 
#include <M5Stack.h>
#include <Wire.h>
#include <HDC1000.h>

HDC1000 mySensor;
//HDC1000 mySensor(0x41, 2) <-- DRDYn enabled and connected to Arduino pin 2 (allows for faster measurements).


#define MyRED 0xe8e4
#define MyGREEN 0x2589
#define MyBLUE 0x51d

#define PAHUB_ADDR 0X70

int pin = 22;
unsigned char counter;
unsigned long temp[21]; // 割り込みの発生した時間（鼓動）
unsigned long sub;

bool data_effect = true;
unsigned int heart_rate = 0;//the measurement result of heart rate
unsigned int prev_heart_rate = 0;

//float divide = 1000;

bool toggleFunc = false;
int t = 0;

 
const int max_heartpluse_duty = 2000;//you can change it follow your system's request.
                        //2000 meams 2 seconds. System return error 
                        //if the duty overtrip 2 second.

 void portselectall(uint8_t ports) {  
  Wire.beginTransmission(PAHUB_ADDR);
  Wire.write(ports&0x3f);
  Wire.endTransmission(); 
}


//Hub range is 0 to 5
void portselect(uint8_t i) {
  if (i > 7) return;
  
  Wire.beginTransmission(PAHUB_ADDR);
  Wire.write(1 << i);
  Wire.endTransmission(); 
}

void setup() {
  // put your setup code here, to run once:
  M5.begin();
  Wire.begin();
  
  Serial.begin(115200);
  Serial.println("Please ready your chest belt.");
  delay(5000);
  initTemp();
  Serial.println("Heart rate test begin.");
  attachInterrupt(pin, interrupt, RISING);

  LCD_Clear();
  M5.Lcd.printf("Measurements in heart rate...");
  
  Serial.begin(115200);
  mySensor.begin();
  attachInterrupt(pin, interrupt2, RISING);
}

void toggle(){
  if(t > 60){
      t = 0;
    }
    
  if(t > 30){
      Serial.begin(115200);
    }else{
      Serial.begin(9600);
      }
    t++;
}
 
void loop() {

  toggle();
//  // put your main code here, to run repeatedly:
  int error = 0;
  for(int i = 0; i < 6; i++){
     portselect(i);
//     M5.Lcd.setCursor(0, i * 40, 2);
//     M5.Lcd.print("TCA Port"); M5.Lcd.print(i);
     for(uint8_t address = 1; address < 127; address++){
       Wire.beginTransmission(address);
//       error = Wire.endTransmission();
//       if(error == 0){
//        if((address == 0x70) || (address == 0x75)) continue;
//          M5.Lcd.print(":  Found I2C 0x");M5.Lcd.print(address,HEX);break;
//       }else{
//          M5.Lcd.setCursor(100, i * 40);
//          M5.Lcd.fillRect(100, i * 40, 280, 40, BLACK);
//       }
      delay(3);
     }
  }
 
  if (heart_rate != prev_heart_rate) {
    prev_heart_rate = heart_rate;
    LCD_Clear();
    M5.Lcd.printf("Heart Rate:%3d", heart_rate);
 
    if (heart_rate > 80) {
      M5.Lcd.fillCircle(160, 120, 80, MyRED);
    } else if (heart_rate > 75) {
      M5.Lcd.fillCircle(160, 120, 80, MyGREEN);
    } else {
      M5.Lcd.fillCircle(160, 120, 80, MyBLUE);
    }
  }
  M5.update();
}
 
void LCD_Clear() {
  M5.Lcd.fillScreen(BLACK);
  M5.Lcd.setCursor(0, 0);
  M5.Lcd.setTextColor(WHITE);
  M5.Lcd.setTextSize(2);
}
 
/*Function: calculate the heart rate*/
void sum()
{
 if(data_effect) {
    heart_rate = 1200000/(temp[20] - temp[0]); //60*20*1000/20_total_time 
    // Serial.print("Heart_rate_is:\t");
    // Serial.println(heart_rate);
  }
  data_effect = 1;//sign bit
}
 
// 割り込み時に実行する関数
void interrupt() {
  Serial.println("Hello I'm measuring !!!!!");
  temp[counter]=millis();
  // Serial.print("Heart_beat_time:\t");
  // Serial.println(temp[counter]);
 
  if (counter == 0) {
    sub = (temp[counter]-temp[20]);
  } else {
    sub = (temp[counter]-temp[counter-1]);
  }
  Serial.print("Heart_beat_duration_time:\t");
  Serial.println(sub);
  
  if (sub > max_heartpluse_duty) { //set 2 seconds as max heart pluse duty
    data_effect = 0; //sign bit
    counter = 0;
    // Serial.println("Heart rate measure error,test will restart!" );
    initTemp();
  }
 
  if (data_effect) {
    if (counter == 20) {
      counter = 0;
      sum();
    } else {
      counter++;
    }
  } else {
    counter = 0;
    data_effect = 1;
  }
}
 
// tempの初期化
void initTemp() {
  for(int i = 0; i < 20; i++) {
    temp[i] = 0;
  }
  temp[20] = millis();
}

void interrupt2(){
  Serial.println("Dude I'm measuring !!!!!");
  
  Serial.print("Temperature: ");
  Serial.print(mySensor.getTemp()); 
  Serial.print("C, Humidity: ");     
  Serial.print(mySensor.getHumi());
  Serial.println("%");
  delay(1000);
  
}
