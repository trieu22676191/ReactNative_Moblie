"use strict";
class shape {
}
class Square {
    constructor(canh) {
        this.canh = canh;
    }
    area() {
        return this.canh * this.canh;
    }
}
class Circle extends shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
}
const shapes = [
    new Square(4),
    new Circle(2),
];
shapes.forEach(s => {
    console.log(`Diện tích: ${s.area().toFixed(2)}`);
});
