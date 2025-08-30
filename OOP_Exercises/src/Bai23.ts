interface Payment {
    pay(amount: number): void;
}

class CashPayment implements Payment {
    pay(amount: number): void {
        console.log(`Paid ${amount} in cash.`);
    }
}

class CardPayment implements Payment {
    pay(amount: number): void {
        console.log(`Paid ${amount} using card.`);
    }
}

const cashPayment = new CashPayment();
cashPayment.pay(100);
const cardPayment = new CardPayment();
cardPayment.pay(200);