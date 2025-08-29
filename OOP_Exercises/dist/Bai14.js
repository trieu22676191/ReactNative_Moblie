"use strict";
class Employee {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class Manager extends Employee {
    constructor(name, age, teamLead) {
        super(name, age);
        this.teamLead = teamLead;
    }
    manageTeam() {
        console.log(`${this.name} is managing the team ${this.teamLead}.`);
    }
}
class Developer extends Employee {
    constructor(name, age, projectDo) {
        super(name, age);
        this.projectDo = projectDo;
    }
    doProject() {
        console.log(`${this.name} is doing a project ${this.projectDo}.`);
    }
}
const manager = new Manager("Alice", 35, "Team A");
manager.manageTeam();
const dev = new Developer("Trieu", 21, "Project A");
dev.doProject();
