"use strict";
class Animal {
    sound() {
        console.log("The animal make a sound");
    }
}
class Dogo extends Animal {
    sound() {
        console.log("Woof");
    }
}
class Cata extends Animal {
    sound() {
        console.log("Meow");
    }
}
function makeAnimalSound(animal) {
    animal.sound();
}
const a1 = new Animal();
const a2 = new Dogo();
const a3 = new Cata();
makeAnimalSound(a1);
makeAnimalSound(a2);
makeAnimalSound(a3);
