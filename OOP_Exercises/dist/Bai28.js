"use strict";
class Animal1 {
    makeSound() {
        return "Some generic animal sound";
    }
}
class Dog extends Animal1 {
    makeSound() {
        return "Woof! Woof!";
    }
    bark() {
        console.log(this.makeSound());
    }
}
class Cat extends Animal1 {
    makeSound() {
        return "Meow! Meow!";
    }
    meow() {
        console.log(this.makeSound());
    }
}
const myDog = new Dog();
myDog.bark(); // Output: Woof! Woof!
const myCat = new Cat();
myCat.meow(); // Output: Meow! Meow!
