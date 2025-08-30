"use strict";
const r1 = new Promise(resolve => setTimeout(() => resolve("r1"), 100));
const r2 = new Promise(resolve => setTimeout(() => resolve("r2"), 300));
const r3 = new Promise(resolve => setTimeout(() => resolve("r3"), 500));
Promise.race([r1, r2, r3]).then(first => console.log("First:", first));
