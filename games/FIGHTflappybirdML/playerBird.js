

class PlayerBird {
    constructor() {
        this.y = height/3;
        this.x = width/3;
    
        this.gravity = 1.25;
        this.lift = -25;
        this.velocity = 0;
        this.airResistance = 0.9;
        this.jump = false;
        this.dead = false;

    }


    show() {
        if(!this.dead) {
            fill(0, 255, 255)
            ellipse(this.x, this.y, 40, 40)
        }
    }

    up() {
        this.velocity += this.lift;
    }


    offScreen() {
        return (this.y > height || this.y < 0);
    }

    // Applies gravity
    update() {

        this.velocity += this.gravity;
        this.velocity *= this.airResistance;
        this.y += this.velocity;

    }

}
