abstract class Appliance {
    abstract turnOn(): void;
}

class Fan extends Appliance {
    turnOn(): void {
        console.log("The fan is now ON.");
    }
}

class AirConditioner extends Appliance {
    turnOn(): void {
        console.log("The air conditioner is now ON.");
    }
}

const myFan = new Fan();
myFan.turnOn();
const myAC = new AirConditioner();
myAC.turnOn();