// 20. Write a Vehicle interface and implement 
// it in Car and Bike classes.
interface Vehicle {
    start(): string;
    stop(): string;
}

class Car implements Vehicle {
    start(): string {
        return "Car started";
    }

    stop(): string {
        return "Car stopped";
    }
}

class Bike implements Vehicle {
    start(): string {
        return "Bike started";
    }

    stop(): string {
        return "Bike stopped";
    }
}

const myCar = new Car();
console.log(myCar.start()); // Car started
console.log(myCar.stop());  // Car stopped
const myBike = new Bike();
console.log(myBike.start()); // Bike started
console.log(myBike.stop());  // Bike stopped