"use strict";
class Animal {
    speak() {
        console.log("The animal makes a sound");
    }
}
class Dogo extends Animal {
    speak() {
        console.log("Woof");
    }
}
class Cata extends Animal {
    speak() {
        console.log("Meow");
    }
}
function makeAnimalSpeak(animal) {
    animal.speak();
}
const a1 = new Animal();
const a2 = new Dogo();
const a3 = new Cata();
makeAnimalSpeak(a1);
makeAnimalSpeak(a2);
makeAnimalSpeak(a3);
