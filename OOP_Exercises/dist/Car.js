"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    showInfo() {
        console.log(`Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}`);
    }
}
exports.Car = Car;
const car1 = new Car("Toyota", "Camry", 2000);
car1.showInfo();
