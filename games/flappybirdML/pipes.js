
function Pipe() {
    this.gap = random(125, 250);

    this.center = random(this.gap, height - this.gap);
    this.top = this.center - this.gap/2;
    this.bottom = height - (this.center + this.gap/2);

    this.x = width;
    this.width = 50;
    this.speed = 3;

    this.show = function() {
        fill(255);
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