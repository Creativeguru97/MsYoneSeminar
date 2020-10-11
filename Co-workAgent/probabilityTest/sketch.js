let depressive;
let funny;
let instantGratification = 20;
let pRange0;
let pRange1;
let pRange2;
let pRange3;

let probabilities = [];

let mode = 1;


function setup() {
  createCanvas(400,400);
  colorMode(HSB, 100, 100, 100);
}

function draw() {
  background(0);

  depressive = int(map(mouseX, 0, 400, 0, 100));
  funny = int(map(mouseY, 0, 400, 0, 100));

  fill(100, 0, 100);
  textFont('Helvetica Neue');
  textAlign(LEFT, TOP);
  textSize(14);
  text("user negative"+ depressive, 7, 7);
  text("user positive"+ funny, 7, 25);

  if(depressive > 100){
    depressive = 100;
  }
  if(funny > 100){
    funny = 100;
  }

  if(mode == 1){
    let mappedDepressive = int(map(depressive, 0, 100, 0, 70 - instantGratification));
    let mappedFunny = int(map(funny, 0, 100, 0, 70 - instantGratification - mappedDepressive));
    pRange0 = 70 - instantGratification - mappedDepressive - mappedFunny;

    mappedDepressive = int(map(depressive, 0, 100, 0, 100 - instantGratification*1.5));
    mappedFunny = int(map(funny, 0, 100, 0, 100 - instantGratification * 1.5 - mappedDepressive));
    pRange1 = 100 - instantGratification * 1.5 - mappedDepressive - mappedFunny;

    mappedDepressive = int(map(depressive, 0, 100, 0, instantGratification));
    mappedFunny = int(map(funny, 0, 100, 0, instantGratification));
    pRange2 = pRange1 + instantGratification * 1.5 - mappedDepressive - mappedFunny;

    mappedFunny = int(map(funny, 0, 100, 0, 100 - pRange2));
    pRange3 = 100 - mappedFunny;
  }else if (mode == 2) {
    let mappedDepressive = int(map(depressive, 0, 100, 0, 30 - instantGratification * 0.5));
    let mappedFunny = int(map(funny, 0, 100, 0, 30 - instantGratification * 0.5 - mappedDepressive));
    pRange0 = 30 - instantGratification * 0.5 - mappedDepressive - mappedFunny;

    mappedDepressive = int(map(depressive, 0, 100, 0, 100 - instantGratification * 1.5));
    mappedFunny = int(map(funny, 0, 100, 0, 100 - instantGratification * 1.5 - mappedDepressive));
    pRange1 = 100 - instantGratification * 1.5 - mappedDepressive - mappedFunny;

    mappedDepressive = int(map(depressive, 0, 100, 0, instantGratification));
    mappedFunny = int(map(funny, 0, 100, 0, instantGratification));
    pRange2 = pRange1 + instantGratification * 1.5 - mappedDepressive - mappedFunny;

    mappedDepressive = int(map(funny, 0, 100, 0, 100 - pRange2));
    mappedFunny = int(map(funny, 0, 100, 0, 100 - pRange2));
    pRange3 = 100 - mappedFunny;
  }else if (mode == 3) {
    let mappedDepressive = int(map(depressive, 0, 100, 0, 40 - instantGratification));
    let mappedFunny = int(map(funny, 0, 100, 0, 40 - instantGratification - mappedDepressive));
    pRange0 = 40 - instantGratification - mappedDepressive - mappedFunny;

    mappedDepressive = int(map(depressive, 0, 100, 0, 80 - instantGratification));
    mappedFunny = int(map(funny, 0, 100, 0, 80 - instantGratification - mappedDepressive));
    pRange1 = 80 - instantGratification - mappedDepressive - mappedFunny;

    mappedDepressive = int(map(depressive, 0, 100, 0, instantGratification));
    mappedFunny = int(map(funny, 0, 100, 0, instantGratification));
    pRange2 = pRange1 + instantGratification * 1.5 - mappedDepressive - mappedFunny;

    mappedFunny = int(map(funny, 0, 100, 0, 100 - pRange2));
    pRange3 = 100 - mappedFunny;
  }

  probabilities[0] = pRange0;
  probabilities[1] = pRange1 - pRange0;
  probabilities[2] = pRange2 - pRange1;
  probabilities[3] = pRange3 - pRange2;
  probabilities[4] = 100 - pRange3;


  if(frameCount % 30 == 0){
    console.log(probabilities);
    console.log("-------------------");
  }
  // console.log("pRange0: "+str(pRange0));
  // console.log("pRange1: "+str(pRange1));
  // console.log("pRange2: "+str(pRange2));

  // console.log(probabilities);




  fill(0, 50, 100);
  rect(
    width/2-20,
    0,
    40,
    height * probabilities[0]/100
  );

  fill(80, 50, 100);
  rect(
    width/2-20,
    height * probabilities[0]/100,
    40,
    height * probabilities[1]/100
  );

  fill(40, 50, 100);
  rect(
    width/2-20,
    height * (probabilities[0] + probabilities[1]) /100,
    40,
    height * probabilities[2]/100
  );

  fill(65, 50, 100);
  rect(
    width/2-20,
    height * (probabilities[0] + probabilities[1] + probabilities[2]) /100,
    40,
    height * probabilities[3]/100
  );

  fill(10, 50, 100);
  rect(
    width/2-20,
    height * (probabilities[0] + probabilities[1] + probabilities[2] + probabilities[3]) /100,
    40,
    height * probabilities[4]/100
  );

  let rect1Height = (height * probabilities[0]/100)/2;
  let rect2Height = (height * probabilities[0]/100) + (height * probabilities[1]/100)/2;
  let rect3Height = (height * (probabilities[0] + probabilities[1]) /100) + (height * probabilities[2]/100)/2;
  let rect4Height = (height * (probabilities[0] + probabilities[1] + probabilities[2]) /100) + (height * probabilities[3]/100)/2;
  let rect5Height = (height * (probabilities[0] + probabilities[1] + probabilities[2] + probabilities[3]) /100) + (height * probabilities[4]/100)/2;

  fill(100, 0, 100);
  text("thinking: "+ probabilities[0] + "%", width/2 + 25, rect1Height);
  text("typing: "+ probabilities[1] + "%", width/2 + 25, rect2Height);
  text("texting: "+ probabilities[2] + "%", width/2 + 25, rect3Height);
  text("negative empathy: "+ probabilities[3] + "%", width/2 + 25, rect4Height);
  text("positive empathy: "+ probabilities[4] + "%", width/2 + 25, rect5Height);

}
