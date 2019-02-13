

class PlayerBird {
    constructor(sprite) {
        this.y = height/3;
        this.x = width/3;
    
        this.gravity = 1.25;
        this.lift = -25;
        this.velocity = 0;
        this.airResistance = 0.9;
        this.jump = false;
        this.dead = false;
        this.sprite = sprite

    }


    show() {
        if(!this.dead) {
            fill(0, 255, 255)
            image(this.sprite, this.x, this.y, this.sprite.height * 1.2, this.sprite.width * 1.2)
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
