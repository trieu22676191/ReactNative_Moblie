"use strict";
class Dog {
    constructor(name) {
        this.name = name;
    }
    sound() {
        console.log(`${this.name} Gau Gau`);
    }
}
class Cat {
    constructor(name) {
        this.name = name;
    }
    sound() {
        console.log(`${this.name} Meo Meo`);
    }
}
const animals = [
    new Dog("Cho Cỏ"),
    new Cat("Meo Mun"),
];
animals.forEach(a => a.sound());
