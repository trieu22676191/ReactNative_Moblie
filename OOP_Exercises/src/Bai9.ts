interface Animal {
  name: string;
  sound(): void;
}

class Dog implements Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sound() {
    console.log(`${this.name} Gau Gau`);
  }
}

class Cat implements Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sound() {
    console.log(`${this.name} Meo Meo`);
  }
}

const animals: Animal[] = [
  new Dog("Cho Cỏ"),
  new Cat("Meo Mun"),
];

animals.forEach(a => a.sound());