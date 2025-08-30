"use strict";
class Car2 {
    move() {
        return "The car is driving.";
    }
}
class Robot {
    move() {
        return "The robot is walking.";
    }
}
const myCar2 = new Car2();
console.log(myCar2.move());
const myRobot = new Robot();
console.log(myRobot.move());
