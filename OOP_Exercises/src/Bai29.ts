interface Movable {
    move(): string;
}

class Car2 implements Movable {
    move(): string {
        return "The car is driving.";
    }
}

class Robot implements Movable {
    move(): string {
        return "The robot is walking.";
    }
}

const myCar2 = new Car2();
console.log(myCar2.move());
const myRobot = new Robot();
console.log(myRobot.move());