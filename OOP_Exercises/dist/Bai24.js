"use strict";
class Appliance {
}
class Fan extends Appliance {
    turnOn() {
        console.log("The fan is now ON.");
    }
}
class AirConditioner extends Appliance {
    turnOn() {
        console.log("The air conditioner is now ON.");
    }
}
const myFan = new Fan();
myFan.turnOn();
const myAC = new AirConditioner();
myAC.turnOn();
