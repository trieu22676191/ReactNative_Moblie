// Generic class Box
class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }
    getValue(): T {
        return this.value;
    }
    setValue(value: T): void {
        this.value = value;
    }
}
const intBox = new Box<number>(123);
console.log("Integer Box:", intBox.getValue());

const strBox = new Box<string>("Hello");
console.log("String Box:", strBox.getValue());

const boolBox = new Box<boolean>(true);
console.log("Boolean Box:", boolBox.getValue());