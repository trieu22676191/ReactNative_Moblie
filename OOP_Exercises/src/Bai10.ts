class Account {
    public name: string;
    private password: string;
    public readonly accountId: number;

    constructor(name: string, password: string, accountId: number) {
        this.name = name;
        this.password = password;
        this.accountId = accountId;
    }
    getUserName(): string {
        return this.name;
    }
    checkPassword(pass: string): boolean {
        return this.password === pass;
    }
    changePassword(oldpass: string, newpass: string): boolean {
        if (this.password === oldpass) {
            this.password = newpass;
            return true;
        }
        return false;
    }
}

const acc = new Account("trieu22676191", "123456", 101);
console.log("Username:", acc.getUserName());
console.log("Check password '123456':", acc.checkPassword("123456"));

console.log("Change password:", acc.changePassword("123456", "654321"));
console.log("Check password '654321':", acc.checkPassword("654321"));