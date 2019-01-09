const TOTAL_POPULATION = 350;

var pipes = []
var data = []
let counter = 0;

let input = [];
let hidden = [];

let bird;
let playerBird;

let brainJSON;
let network;

let font, 
  fontSize = 12;

function preload() {
  brainJSON = loadJSON("bestBird.json");
  font = loadFont('DejaVuSans.ttf')
}



function setup() {
  var canvas = createCanvas(400, 600);
  canvas.parent('sketch-holder');

  let birdBrain = NeuralNetwork.deserialize(brainJSON);
  bird = new Bird(birdBrain);
  playerBird = new PlayerBird();
  network = new Network(width/2, 0)

  textFont(font)
  textSize(fontSize)
  textAlign(LEFT, CENTER)


  // Input Layer
  let gapY = height/25
  let gapX = width/20
  for(var i = 1; i <= 5; i++) {
    let x = new Neuron(gapX, gapY*i);
    input.push(x);
    network.addNeuron(x)
  }
  // Hidden Layers
  gapY = height/35;
  gapX = width/4;
  for(var i = 1; i <= 8; i++) {
    let x = new Neuron(gapX, gapY*i);
    hidden.push(x);
    network.addNeuron(x);
  }
  // Output Layer
  gapY = height/8;
  gapX = width/2 - width/20;
  let output = []
  a = new Neuron(gapX, gapY);
  output.push(a)
  network.addNeuron(a);

  console.log("Hidden length: " + hidden.length)


  for(var i = 0; i < input.length; i++) {
    for(var j = 0; j < hidden.length; j++) {
      network.connect(input[i], hidden[j])
      network.connect(hidden[j], output[0]);
    }
    console.log("n of connections: " + input[i].connections)
  }
  

}

function draw() {
    if(counter % 80 == 0) {
      pipes.push(new Pipe())
    }
    counter++;
    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();
      if(pipes[i].hits(bird)) {
          console.log("OOF!"); 
        }
      if(pipes[i].hits(playerBird)) {
        playerBird.dead = true;
      }
      if(pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
    
    bird.think(pipes);
    bird.update();
    playerBird.update();
  
  

  background(0);

  bird.show();
  playerBird.show();

  for(let pipe of pipes) {
    pipe.show();
  }
    // Neural Network Visualization
    fill(255, 255, 255, 100);
    fill(255)
    let textOffsetX = width/2.7;
    text('y-pos', textOffsetX, height/25)
    text('pipe-top', textOffsetX, height/13)
    text('pipe-down', textOffsetX, height/8.5)
    text('pipe-xPos', textOffsetX, height/6.3)
    text('velocity', textOffsetX, height/5.1)

    let inputTextOffsetX = width/3.5;
    text((bird.inputs[0] * height).toFixed(0), inputTextOffsetX, height/25)
    text((bird.inputs[1] * height).toFixed(0), inputTextOffsetX, height/13)
    text((bird.inputs[2] * height).toFixed(0), inputTextOffsetX, height/8.5)
    text((bird.inputs[3] * width).toFixed(0), inputTextOffsetX, height/6.3)
    text((bird.inputs[4]).toFixed(0), inputTextOffsetX, height/5.1)

    network.display()

    if(frameCount % 15 == 0) {
      input.forEach((i) => {
     i.feedForward();
   })
 
    }
  
}

function keyPressed() {
  if(keyCode == 32) {
    playerBird.up();
  }
  if(keyCode == 82) {
    location.reload();
  }
}