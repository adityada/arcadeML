const TOTAL_POPULATION = 350;

let birds = []
let savedBirds = []
var pipes = []
var data = []
let counter = 0;
let slider;



function setup() {
  var canvas = createCanvas(400, 600);
  canvas.parent('sketch-holder')
  slider = createSlider(1, 100, 1)
  var images = ["../../images/eaglePlayer.png","../../images/eagleGreen.png","../../images/eaglePurple.png"]
  slider.parent('slider-holder')
  var brainDownloadButton = createButton('Download')
  brainDownloadButton.mouseReleased(saveBrain)
  brainDownloadButton.parent('brainDownload-holder')
  for(let i = 0; i < TOTAL_POPULATION; i++) {
    let sprite = loadImage(images[Math.floor(Math.random * images.length)];
    birds[i] = new Bird("null", sprite);
  }
}
function saveBrain() {
  let b = birds[0];
  saveJSON(b.brain, 'bestBird.json');
}
function draw() {
  for(let n = 0; n < slider.value(); n++) {
    if(counter % 80 == 0) {
      pipes.push(new Pipe())
    }
    counter++;
    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();
      for(let j = birds.length - 1; j >= 0; j--) {
        if(pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0])
        }
    
      }
      if(pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    for(let j = birds.length - 1; j >= 0; j--) {
      if(birds[j].offScreen()) {
        savedBirds.push(birds.splice(j, 1)[0])
      }
  
    }
    
    for(let bird of birds) {
      bird.think(pipes);
      bird.update();
    }
  
    if(birds.length == 0) {
      nextGeneration()
      pipes = []
      counter = 0;
    }
  
  }

  background(0);

  for(let bird of birds) {
    bird.show();
  }

  for(let pipe of pipes) {
    pipe.show();
  }


}
