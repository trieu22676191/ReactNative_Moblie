"use strict";
function returnTen() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(10), 1000);
    });
}
returnTen().then(n => console.log(n));
