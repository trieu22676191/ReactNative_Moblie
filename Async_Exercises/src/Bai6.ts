function simulateTask1(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task with ${time}ms done`);
        }, time);
    });
}

const case1 = simulateTask1(400).then(() => "Case 1 done");
const case2 = simulateTask1(600).then(() => "Case 2 done");
const case3 = simulateTask1(200).then(() => "Case 3 done");

Promise.all([case1, case2, case3]).then((results) => {
    console.log("All cases done:", results);
});