class Employee {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
class Manager extends Employee {
    teamLead: string;
    constructor(name: string, age: number,teamLead: string) {
        super(name, age);
        this.teamLead = teamLead;
    }
    manageTeam(): void {
        console.log(`${this.name} is managing the team ${this.teamLead}.`);
    }
}

class Developer extends Employee {
    projectDo: string;
    constructor(name: string, age: number,projectDo: string) {
        super(name, age);
        this.projectDo = projectDo;
    }
    doProject(): void {
        console.log(`${this.name} is doing a project ${this.projectDo}.`);
    }
}
const manager = new Manager("Alice", 35, "Team A");
manager.manageTeam();

const dev = new Developer("Trieu", 21, "Project A");
dev.doProject();