"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = exports.Dog = void 0;
class Dog {
    constructor(name) {
        this.name = name;
    }
    sound() {
        console.log(`${this.name} Gau Gau`);
    }
}
exports.Dog = Dog;
class Cat {
    constructor(name) {
        this.name = name;
    }
    sound() {
        console.log(`${this.name} Meo Meo`);
    }
}
exports.Cat = Cat;
const animals = [
    new Dog("Cho Cỏ"),
    new Cat("Meo Mun"),
];
animals.forEach(a => a.sound());
