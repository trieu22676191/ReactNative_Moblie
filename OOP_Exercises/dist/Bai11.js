"use strict";
class Animal2 {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}
class Dog2 extends Animal2 {
    constructor(name, color) {
        super(name, color);
    }
    bark() {
        console.log(`${this.name} sủa: Gâu Gâu!`);
    }
}
class Cat2 extends Animal2 {
    constructor(name, color) {
        super(name, color);
    }
    meow() {
        console.log(`${this.name} kêu: Meo Meo!`);
    }
}
const dog = new Dog2("Muc", "Black");
dog.bark();
const cat = new Cat2("Mun", "Black");
cat.meow();
