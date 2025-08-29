
import { Person } from "./Person";
import { Book } from "./Book";
class Library {
    books: Book[];
    users: Person[];

    constructor() {
        this.books = [];
        this.users = [];
    }

    addBook(book: Book): void {
        this.books.push(book);
        console.log(`Added book: ${book.displayInfo()}`);
    }

    addUser(user: Person): void {
        this.users.push(user);
        console.log(`Added user: ${user.name}, Age: ${user.age}`);
    }
}

const library = new Library();
const book1 = new Book("1984", "George Orwell", 1949);
const user1 = new Person("Alice", 30);
library.addBook(book1);
library.addUser(user1);