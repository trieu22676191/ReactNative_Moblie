"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Tạo lớp Rectangle với width và height. Viết phương thức để tính diện tích và chu vi.
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
    perimeter() {
        return 2 * (this.width + this.height);
    }
}
const rect1 = new Rectangle(5, 10);
console.log(`Width: ${rect1.width}, Height: ${rect1.height}`);
console.log(`Area: ${rect1.area()}`);
console.log(`Perimeter: ${rect1.perimeter()}`);
