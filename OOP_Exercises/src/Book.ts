//Tạo lớp Book với các thuộc tính title, author, year.
export class Book{
    title: string;
    author: string;
    year: number;

    constructor(title: string, author: string, year: number){
        this.title = title;
        this.author = author;
        this.year = year;
    }

    displayInfo(): void{
        console.log(`Title: ${this.title}, Author: ${this.author}, Year: ${this.year}`);
    }
}

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925);