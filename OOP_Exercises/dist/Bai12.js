"use strict";
class Bird {
    constructor(name) {
        this.name = name;
    }
    fly() {
        console.log(`${this.name} đang bay trên bầu trời`);
    }
}
class Fish {
    constructor(name) {
        this.name = name;
    }
    swim() {
        console.log(`${this.name} đang bơi dưới nước `);
    }
}
const fish = new Fish("Cá vàng");
fish.swim();
const bird = new Bird("Chim bồ câu");
bird.fly();
