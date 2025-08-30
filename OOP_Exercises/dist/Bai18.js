"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtil = void 0;
class MathUtil {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
    static multiply(a, b) {
        return a * b;
    }
    static divide(a, b) {
        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }
        return a / b;
    }
}
exports.MathUtil = MathUtil;
const num1 = 10;
;
const num2 = 5;
console.log(`Add: ${MathUtil.add(num1, num2)}`);
console.log(`Subtract: ${MathUtil.subtract(num1, num2)}`);
console.log(`Multiply: ${MathUtil.multiply(num1, num2)}`);
console.log(`Divide: ${MathUtil.divide(num1, num2)}`);
