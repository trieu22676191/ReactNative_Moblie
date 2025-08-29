"use strict";
class Account {
    constructor(name, password, accountId) {
        this.name = name;
        this.password = password;
        this.accountId = accountId;
    }
    getUserName() {
        return this.name;
    }
    checkPassword(pass) {
        return this.password === pass;
    }
    changePassword(oldpass, newpass) {
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
