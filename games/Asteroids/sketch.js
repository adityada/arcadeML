p5.disableFriendlyErrors = true; // disables FES


function mutate(x) {
    if ( random(1) < 0.1 ) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}

class Ship {
    constructor(brain) {
        this.loc = createVector(width/2, height/2);
        this.radius = 15;
        this.angle = 0;
        this.velocity = createVector(0, 0);
        this.inputs;
        this.environment = [];
        this.action = [];
        this.totalEnvironment = [];
        this.totalAction = [];
        this.scores = [];
        this.score = 0;
        this.dead = false;
        this.lives = 10;
        this.resetting = false;

        if(brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
            this.brain.mutate(mutate)        
        } else {
            loadPixels();
            this.brain = new NeuralNetwork(int(pixels.length/8), 10, 4)
        }
    }

    think() {
        loadPixels();

        let inputs = [];

        for(var i = 0; i < pixels.length; i+=4) {
            if(i%8!=0) {
                let r = pixels[i]/255;
                let g = pixels[i+1]/255;
                let b = pixels[i+2]/255;
                let cLinear = (0.2126*r) + (0.7152*g) + (0.0722*b)
                let Cfinal;
                if(cLinear <= 0.0031308) {
                    Cfinal = 12.92 * cLinear;
                } else {
                    Cfinal = (1.055*cLinear**(1/2.4)) - 0.055
                }
                inputs.push(Cfinal)
            }
        }

        this.environment.push(inputs);
        
        let outputs = this.brain.predict(inputs)

        this.action.push(outputs);

        if(outputs[0] > random(1)) this.turn(0.1)
        else if(outputs[1] > random(1)) this.turn(-0.1)
        else if(outputs[2] > random(1)) this.accelerate()
        else {}

        
    }

    die() {
        if(this.lives > 0) {
            this.dead = true;
            this.scores.push(this.score)
            this.score = 0;
            this.totalEnvironment.push(this.environment);
            this.environment = [];
            this.totalAction.push(this.action);
            this.action = [];
            this.lives--;
            this.resetting = true;
            this.dead = false;
        } else {
            console.log(ship.totalAction)
            this.dead = true;
            this.totalAction.sort((a, b) => b.length - a.length)
            this.totalEnvironment.sort((a, b) => b.length - a.length)
            for(var i = 0; i < this.totalAction.length; i++) {
                for(var j = 0; j < this.totalAction[i].length; j++) {
                    let action = this.totalAction[i][j].slice();
                    let chosenAction = action.map((x) => x == action.slice().sort((a,b)=>b-a)[0] ? 1 : 0);
                    if(this.totalAction[i].length < this.totalAction[0].length/4 || this.totalAction[i].length <=1) {
                        chosenAction = action.map((x) => x == action.slice().sort((a,b)=>b-a)[0] ? -1 : 0);
                    }
                    this.brain.train(this.totalEnvironment[i][j], chosenAction)

                        //action = action.map((x) => x == action.slice().sort((a,b)=>b-a)[0] ? -1 : 0)
                        //this.brain.train(this.totalEnvironment[i][j], action)
                    //if(ship.totalAction[i].length < ship.totalAction[0].length/2 || ship.totalAction[i].length >= 1) this.brain.mutate(mutate)
                }
            }
            saveJSON(this.brain, 'shipBrain.json')
            this.totalEnvironment = [];
            this.totalAction = [];
            this.environment = [];
            this.action = [];
            this.lives = 10;
            this.dead = false;
            this.resetting = true;
        }
    }

    show() {
        push()
        translate(this.loc.x, this.loc.y);
        rotate(this.angle)
        fill(0)
        stroke(255);
        triangle(-this.radius, this.radius, this.radius, this.radius, 0, -this.radius)
        pop()
    }

    update() {
        if(!this.dead) {
            this.wrapAround();
            this.loc.add(this.velocity);
            this.velocity.mult(0.98);
            this.score++;
            this.think();    
        }
        /*
        if(keyIsDown(RIGHT_ARROW)) {
            this.turn(0.1);
        } else if(keyIsDown(LEFT_ARROW)) {
            this.turn(-0.1)
        }
        if(keyIsDown(UP_ARROW)) {
            this.accelerate();
        }
        */
    }

    accelerate() {
        var force = p5.Vector.fromAngle(this.angle - PI/2);
        force.mult(0.5);
        this.velocity.add(force);
    }

    turn(angle) {
        this.angle += angle;
    }

    wrapAround() {
        if(this.loc.x > width + this.radius) {
            this.loc.x = -this.radius;
        } else if(this.loc.x < -this.radius) {
            this.loc.x = width +this.radius;
        }

        if(this.loc.y > height + this.radius) {
            this.loc.y = -this.radius;
        } else if(this.loc.y < -this.radius) {
            this.loc.y = height +this.radius;
        }
    }

}

class Asteroid {
    constructor() {
        this.loc = createVector(random(width)/10, random(height)/10)
        this.radius = random(15, 45);
        this.numberOfVertices = floor(random(5,15))
        this.vertexOffsets = [];
        this.velocity = p5.Vector.random2D();
        for(var i = 0; i < this.numberOfVertices; i++) {
            this.vertexOffsets[i] = random(-15, 15)
        }
    }

    show() {
        push()
        stroke(255)
        fill(0)
        translate(this.loc.x, this.loc.y);
        //ellipse(0, 0, this.radius * 2)
        beginShape();
        for(var i = 0; i < this.numberOfVertices; i++) {
            var angle = map(i, 0, this.numberOfVertices, 0, TWO_PI)
            var radius = this.radius + this.vertexOffsets[i]
            var x = radius * cos(angle);
            var y = radius * sin(angle); 
            vertex(x, y)
        }
        endShape(CLOSE);
        pop();
    }

    hits(ship) {
        let d = dist(this.loc.x, this.loc.y, ship.loc.x, ship.loc.y) 
        if(d < this.radius) {
            return true;
        }
    }

    update() {
        this.loc.add(this.velocity);
        this.wrapAround()
    }

    wrapAround() {
        if(this.loc.x > width + this.radius) {
            this.loc.x = -this.radius;
        } else if(this.loc.x < -this.radius) {
            this.loc.x = width +this.radius;
        }

        if(this.loc.y > height + this.radius) {
            this.loc.y = -this.radius;
        } else if(this.loc.y < -this.radius) {
            this.loc.y = height +this.radius;
        }
    }
}

let ship;
let asteroids = [];

function setup() {
    createCanvas(300, 300)
    ship = new Ship();
    setupAsteroids();
}

function setupAsteroids() {
    asteroids = []
    for(var i = 0; i < 8; i++) {
        asteroids.push(new Asteroid());
        ship.loc = createVector(width/2, height/2)
    }
}

function draw() {
    background(0)
    ship.update();
    ship.show();
    
    if(ship.resetting) {
        setupAsteroids();
        ship.resetting = false;
    }

    for(var i = 0; i < asteroids.length; i++) {
        asteroids[i].show();
        asteroids[i].update();
        if(asteroids[i].hits(ship) && !ship.dead) ship.die();
    }

}

