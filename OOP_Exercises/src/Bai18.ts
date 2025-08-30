export class MathUtil {
    static add(a: number, b: number): number {
        return a + b;
    }

    static subtract(a: number, b: number): number {
        return a - b;
    }

    static multiply(a: number, b: number): number {
        return a * b;
    }

    static divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }
        return a / b;
    }
}

const num1 = 10;;
const num2 = 5;
console.log(`Add: ${MathUtil.add(num1, num2)}`);
console.log(`Subtract: ${MathUtil.subtract(num1, num2)}`);
console.log(`Multiply: ${MathUtil.multiply(num1, num2)}`);
console.log(`Divide: ${MathUtil.divide(num1, num2)}`);