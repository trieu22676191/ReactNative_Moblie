"use strict";
function withTimeout(promise, ms) {
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));
    return Promise.race([promise, timeout]);
}
function fetchUser3(id) {
    return new Promise((resolve) => setTimeout(() => resolve({ id, name: `User${id}` }), 1000));
}
withTimeout(fetchUser3(1), 2000)
    .then(console.log)
    .catch(console.error);
const slowCall = new Promise(res => setTimeout(() => res("slow"), 3000));
withTimeout(slowCall, 2000)
    .catch(err => console.error(err.message));
