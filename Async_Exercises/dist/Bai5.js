"use strict";
function simulateTask(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task done in ${time} ms`);
        }, time);
    });
}
simulateTask(1000).then(msg => console.log(msg));
simulateTask(2000).then(msg => console.log(msg));
simulateTask(3000).then(msg => console.log(msg));
