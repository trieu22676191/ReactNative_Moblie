//12. Write an async function that calls simulateTask(2000) and logs the result.
function simTask(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task completed in ${time} ms`);
        }, time);
    });
}

async function callSimTask() {
    const r = await simTask(2000);
    console.log("simulateTask result:", r);
}

callSimTask();
