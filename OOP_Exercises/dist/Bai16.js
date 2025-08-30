"use strict";
// Generic class Box
class Box {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
}
const intBox = new Box(123);
console.log("Integer Box:", intBox.getValue());
const strBox = new Box("Hello");
console.log("String Box:", strBox.getValue());
const boolBox = new Box(true);
console.log("Boolean Box:", boolBox.getValue());
