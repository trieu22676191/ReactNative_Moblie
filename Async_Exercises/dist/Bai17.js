"use strict";
async function forAwaitExample() {
    const promises = [
        new Promise(res => setTimeout(() => res(1), 300)),
        new Promise(res => setTimeout(() => res(2), 200)),
        new Promise(res => setTimeout(() => res(3), 100)),
    ];
    for await (const val of promises) {
        console.log("Got:", val);
    }
}
forAwaitExample();
