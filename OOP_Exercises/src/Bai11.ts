class Animal2 {
    public name: string;
    public color: string;

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }
}
class Dog2 extends Animal2 {
    constructor(name: string, color: string) {
        super(name, color);
    }
    bark(): void {
        console.log(`${this.name} sủa: Gâu Gâu!`);
    }
}
class Cat2 extends Animal2 {
    constructor(name: string, color: string) {
        super(name, color);
    }
    meow(): void {
        console.log(`${this.name} kêu: Meo Meo!`);
    }
}

const dog = new Dog2("Muc","Black");
dog.bark();
const cat = new Cat2("Mun","Black");
cat.meow();