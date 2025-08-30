"use strict";
class Car {
    start() {
        return "Car started";
    }
    stop() {
        return "Car stopped";
    }
}
class Bike {
    start() {
        return "Bike started";
    }
    stop() {
        return "Bike stopped";
    }
}
const myCar = new Car();
console.log(myCar.start()); // Car started
console.log(myCar.stop()); // Car stopped
const myBike = new Bike();
console.log(myBike.start()); // Bike started
console.log(myBike.stop()); // Bike stopped
