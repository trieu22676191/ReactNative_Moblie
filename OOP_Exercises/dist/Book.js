"use strict";
//Tạo lớp Book với các thuộc tính title, author, year.
class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
    displayInfo() {
        console.log(`Title: ${this.title}, Author: ${this.author}, Year: ${this.year}`);
    }
}
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925);
