
function Pipe() {
    this.gap = random(100, 150);

    this.center = random(this.gap, height - this.gap);
    this.top = this.center - this.gap/2;
    this.bottom = height - (this.center + this.gap/2);

    this.x = width;
    this.width = 65;
    this.speed = 3;
    
    this.r, this.g, this.b = random(255), random(255), random(255)

    this.show = function() {
        fill(this.r, this.g, this.b);
        rect(this.x, 0, this.width, this.top)
        rect(this.x, height - this.bottom, this.width, this.bottom)
    }

    this.update = function() {
        this.x -= this.speed;
    }
    this.offscreen = function() {
        return this.x < -this.width*5;
    }
    this.hits = function(bird) {
        if(bird.y < this.top || bird.y > height - this.bottom) {
            if(bird.x > this.x && bird.x < this.x + this.width) {
                return true;
            }
        }
        return false;
    }
}
