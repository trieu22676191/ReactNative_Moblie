"use strict";
function waittt(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function createTask(i) {
    await waittt(500 + Math.random() * 500); // random delay
    return `task-${i}-done`;
}
async function batchProcess() {
    const tasks = Array.from({ length: 5 }, (_, i) => createTask(i + 1));
    const results = await Promise.all(tasks);
    console.log("Batch results:", results);
}
batchProcess();
// filepath: d:\ReactNative_Mobile\Bài tập thực hành\Async_Exercises\src\Bai28.ts
