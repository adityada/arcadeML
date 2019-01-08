class Network {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.neurons = []
    }

    addNeuron(n) {
        this.neurons.push(n)
    }

    display() {
        translate(this.x, this.y);
        this.neurons.forEach((item) => {
            item.show()
        })
    }

    connect(a, b) {
        let c = new Connection(a, b);
        a.addConnection(c);
    }



}