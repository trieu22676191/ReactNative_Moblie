"use strict";
class Product1 {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}
class Order {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    calculateTotalPrice() {
        let total = 0;
        for (const p of this.products) {
            total += p.price * p.quantity;
        }
        return total;
    }
}
const order = new Order();
order.addProduct(new Product1("Laptop", 1500, 1));
order.addProduct(new Product1("Mouse", 450, 2));
order.addProduct(new Product1("Keyboard", 500, 1));
console.log("Total Order Price:", order.calculateTotalPrice());
