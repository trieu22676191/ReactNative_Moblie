"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    displayInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}
class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }
    introduce() {
        console.log(`Hello, my name is ${this.name}, I teach ${this.subject}.`);
    }
}
const teacher = new Teacher("Mr. Smith", 40, "Mathematics");
teacher.introduce();
