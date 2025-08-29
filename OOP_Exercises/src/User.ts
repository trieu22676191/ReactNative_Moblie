//Viết lớp User với thuộc tính riêng tư name và có getter/setter.
class User {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }
}
const user1 = new User("Alice");
console.log(`Name: ${user1.getName()}`);