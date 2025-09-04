"use strict";
function timesThreeAfter1s(n) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(n * 3), 1000);
    });
}
async function sequential() {
    const a = await timesThreeAfter1s(1); // 3 (sau 1s)
    const b = await timesThreeAfter1s(2); // 6 (sau 1s)
    const c = await timesThreeAfter1s(3); // 9 (sau 1s)
    console.log(a, b, c);
}
sequential();
