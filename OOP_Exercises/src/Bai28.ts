class Animal1 {
    protected makeSound(): string {
        return "Some generic animal sound";
    }
}

class Dog extends Animal1 {
    protected makeSound(): string {
        return "Woof! Woof!";
    }

    public bark(): void {
        console.log(this.makeSound());
    }
}

class Cat extends Animal1 {
    protected makeSound(): string {
        return "Meow! Meow!";
    }

    public meow(): void {
        console.log(this.makeSound());
    }
}

const myDog = new Dog();
myDog.bark(); // Output: Woof! Woof!
const myCat = new Cat();
myCat.meow(); // Output: Meow! Meow!