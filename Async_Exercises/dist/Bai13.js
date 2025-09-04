"use strict";
function rejectAfterOneSecond(time) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(`Task failed after ${time} ms`);
        }, time);
    });
}
async function demoTryCatch() {
    try {
        const val = await rejectAfterOneSecond(1000);
        console.log(val);
    }
    catch (err) {
        console.error("Caught error:", err);
    }
    finally {
        console.log("Demo finished");
    }
}
demoTryCatch();
