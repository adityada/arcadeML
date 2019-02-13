function nextGeneration() {

    calculateFitness();


    for(let i = 0; i < TOTAL_POPULATION; i++) {
        birds[i] = getBirdByHighestFitness();
    }
    savedBirds = []

}

function getBirdByHighestFitness() {

    var largest = null;
    for(var i = 0; i < savedBirds.length; i++) {
        if(largest == null) {
            largest = savedBirds[i];
        } else if(savedBirds[i].fitness > largest.fitness) {
            largest = savedBirds[i];
        }
    }
    let images = ["../../images/eaglePlayer.png","../../images/eagleGreen.png","../../images/eaglePurple.png"]
    let sprite = loadImage(images[Math.floor(Math.random() * images.length)]);
    let child = new Bird(largest.brain);
    return child;
}

function calculateFitness() {
     let sum = 0;

    for(let bird of savedBirds) {
        sum += bird.score;
    }

    for(let bird of savedBirds) {
        bird.fitness = bird.score / sum;
    }
}
