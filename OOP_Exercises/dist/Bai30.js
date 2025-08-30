"use strict";
class Student {
    constructor(name, age, grade) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }
    getInfo() {
        return `Student Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
    }
}
class Teacher1 {
    constructor(name, age, subject) {
        this.name = name;
        this.age = age;
        this.subject = subject;
    }
    getInfo() {
        return `Teacher Name: ${this.name}, Age: ${this.age}, Subject: ${this.subject}`;
    }
}
class School {
    constructor() {
        this.students = [];
        this.teachers = [];
    }
    addStudent(student) {
        this.students.push(student);
    }
    addTeacher(teacher) {
        this.teachers.push(teacher);
    }
    displayInfo() {
        console.log("Students:");
        for (const student of this.students) {
            console.log(student.getInfo());
        }
        console.log("Teachers:");
        for (const teacher of this.teachers) {
            console.log(teacher.getInfo());
        }
    }
}
const school = new School();
school.addStudent(new Student("Kevin", 16, "8th Grade"));
school.addStudent(new Student("Bob", 15, "9th Grade"));
school.addTeacher(new Teacher1("Mr. Smith", 40, "Mathematics"));
school.addTeacher(new Teacher1("Ms. Johnson", 35, "English"));
school.displayInfo();
