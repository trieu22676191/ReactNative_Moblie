abstract class shape{
    abstract area(): number;
}
class Square implements shape{
    canh: number
    constructor(canh: number){
        
        this.canh = canh;
    }
    area(): number {
        return this.canh*this.canh;
    }
}
class Circle extends shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}
const shapes: shape[] = [
  new Square(4),
  new Circle(2),
];

shapes.forEach(s => {
  console.log(`Diện tích: ${s.area().toFixed(2)}`);
});