class Repository<T> {
    private items: T[] = [];
    add(item: T): void {
        this.items.push(item);
    }
    getAll(): T[] {
        return this.items;
    }
}
const userRepo = new Repository<string>();
userRepo.add("Alice");
userRepo.add("Bob");
console.log(userRepo.getAll());