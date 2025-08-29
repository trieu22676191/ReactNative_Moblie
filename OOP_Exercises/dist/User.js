"use strict";
//Viết lớp User với thuộc tính riêng tư name và có getter/setter.
class User {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
}
const user1 = new User("Alice");
console.log(`Name: ${user1.getName()}`);
