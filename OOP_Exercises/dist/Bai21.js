"use strict";
class Repository {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
}
const userRepo = new Repository();
userRepo.add("Alice");
userRepo.add("Bob");
console.log(userRepo.getAll());
