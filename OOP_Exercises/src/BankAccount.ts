//Tạo lớp BankAccount với balance. Thêm các phương thức deposit() và withdraw().
class BankAccount{
    balnece: number;

    constructor(balance: number){
        this.balnece = balance;
    }

    deposit(amount: number): void{
        this.balnece += amount;
        console.log(`Deposited: ${amount}. New balance: ${this.balnece}`);
    }

    withdraw(amount: number): void{
        if(amount > this.balnece){
            console.log("Insufficient funds");
        } else {
            this.balnece -= amount;
            console.log(`Withdrew: ${amount}. New balance: ${this.balnece}`);
        }
    }

}

const account1 = new BankAccount(1000);
account1.deposit(500);
account1.withdraw(200);