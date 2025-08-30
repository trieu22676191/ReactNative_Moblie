class Student {
    name: string;
    age: number;
    grade: string;

    constructor(name: string, age: number, grade: string) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }

    getInfo(): string {
        return `Student Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
    }
}

class Teacher1 {
    name: string;
    age: number;
    subject: string;

    constructor(name: string, age: number, subject: string) {
        this.name = name;
        this.age = age;
        this.subject = subject;
    }

    getInfo(): string {
        return `Teacher Name: ${this.name}, Age: ${this.age}, Subject: ${this.subject}`;
    }
}

class School {
    private students: Student[] = [];
    private teachers: Teacher1[] = [];

    addStudent(student: Student): void {
        this.students.push(student);
    }

    addTeacher(teacher: Teacher1): void {
        this.teachers.push(teacher);
    }

    displayInfo(): void {
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