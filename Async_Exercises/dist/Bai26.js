"use strict";
function wait(ms) {
    return new Promise(res => setTimeout(res, ms));
}
async function waitFiveSeconds() {
    console.log("Waiting 5s...");
    await wait(5000);
    console.log("Done waiting.");
}
waitFiveSeconds();
