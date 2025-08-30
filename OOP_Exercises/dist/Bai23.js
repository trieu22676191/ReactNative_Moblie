"use strict";
class CashPayment {
    pay(amount) {
        console.log(`Paid $${amount} in cash.`);
    }
}
class CardPayment {
    pay(amount) {
        console.log(`Paid $${amount} in card.`);
    }
}
const cash = new CashPayment();
cash.pay(100);
const card = new CardPayment();
card.pay(250);
