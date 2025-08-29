interface Swimable{
    swim(): void;
}
interface Flyable{
    fly(): void;
}
class Bird implements Flyable {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  fly(): void {
    console.log(`${this.name} đang bay trên bầu trời`);
  }
}
class Fish implements Swimable {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  swim(): void {
    console.log(`${this.name} đang bơi dưới nước `);
  }
}

const fish = new Fish("Cá vàng");
fish.swim();

const bird = new Bird("Chim bồ câu");
bird.fly();