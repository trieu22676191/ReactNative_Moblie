"use strict";
async function waitOneSecond(n) {
    await new Promise(r => setTimeout(r, 1000));
    return n * 3;
}
waitOneSecond(5).then(console.log); // 15
