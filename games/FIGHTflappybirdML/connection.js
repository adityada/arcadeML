class Connection {

    constructor(fromNeuron, destinationNeuron) {
        this.fromNeuron = fromNeuron;
        this.destinationNeuron = destinationNeuron;
        this.sending = false;
        this.senderX = 50;
        this.senderY = 50;
    }

    display() {
        stroke(255);
        let neuronHalfed = 8;
        line(this.fromNeuron.x+neuronHalfed, this.fromNeuron.y, this.destinationNeuron.x + neuronHalfed, this.destinationNeuron.y)
        
        if(this.sending) {
            fill(0);
            stroke(0)
            ellipse(this.senderX, this.senderY, 8, 8);
        }
    }

    update() {
        if(this.sending) {
            this.senderX = lerp(this.senderX, this.destinationNeuron.x, 0.3);
            this.senderY = lerp(this.senderY, this.destinationNeuron.y, 0.3);

            var d = dist(this.senderX, this.senderY, this.destinationNeuron.x, this.destinationNeuron.y);

            if(d < 1) {
                this.destinationNeuron.feedForward()
                this.sending = false;
            }
        }
    }

    feedForward() {
        this.senderX = this.fromNeuron.x;
        this.senderY = this.fromNeuron.y;
        this.sending = true;
    }
}