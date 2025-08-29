"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = require("./Person");
const Book_1 = require("./Book");
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }
    addBook(book) {
        this.books.push(book);
        console.log(`Added book: ${book.displayInfo()}`);
    }
    addUser(user) {
        this.users.push(user);
        console.log(`Added user: ${user.name}, Age: ${user.age}`);
    }
}
const library = new Library();
const book1 = new Book_1.Book("1984", "George Orwell", 1949);
const user1 = new Person_1.Person("Alice", 30);
library.addBook(book1);
library.addUser(user1);
