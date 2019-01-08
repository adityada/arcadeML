class Neuron {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.connections = []
    }

    show() {
        fill(130, 173, 242)
        stroke(0)
        ellipse(this.x, this.y, 16, 16)

        this.connections.forEach((c) => {
            c.display();
            c.update()
        })
    }

    addConnection(c) {
        this.connections.push(c);
    }

    feedForward() {
        this.connections.forEach((c) => {
            c.feedForward()
        })
    }
}