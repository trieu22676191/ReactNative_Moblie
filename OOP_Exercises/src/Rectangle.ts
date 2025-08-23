import { Constructor } from './../node_modules/make-error/index.d';
// Yêu cầu:

// Tạo lớp Rectangle với các thuộc tính width, height.

// Viết phương thức area() để tính diện tích.

// Viết phương thức perimeter() để tính chu vi.

// Tạo đối tượng và kiểm tra.
class Rectangle{
    width: number;
    height: number;
}

constructor(width: number, height: number){
    this.width = width;
    this.height = height;
}