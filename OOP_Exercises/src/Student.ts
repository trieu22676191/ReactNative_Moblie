import { Person } from "./Person";

class Student extends Person {
    grade: string;

    constructor(name: string, age: number, grade: string) {
        super(name, age); // gọi constructor của Person
        this.grade = grade;
    }

    displayAllInfo(): void {
        console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
    }
}

// Test
const s1 = new Student("Bình", 19, "10");
s1.displayAllInfo();
