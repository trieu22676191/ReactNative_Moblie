class Product {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

const products: Product[] = [
    new Product("Sản phẩm A", 50),
    new Product("Sản phẩm B", 120),
    new Product("Sản phẩm C", 200),
    new Product("Sản phẩm D", 80),
];

const expensiveProducts = products.filter(p => p.price > 100);
console.log("Các sản phẩm có giá > 100:");
expensiveProducts.forEach(p => {
    console.log(`- ${p.name}: ${p.price}`);
});