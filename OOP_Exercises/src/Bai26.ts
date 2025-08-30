class Product1 {
    name: string;
    price: number;
    quantity: number;

    constructor(name: string, price: number, quantity: number) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

class Order {
    private products: Product1[] = [];

    addProduct(product: Product1): void {
        this.products.push(product);
    }

    calculateTotalPrice(): number {
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