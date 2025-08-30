function simulateTask3(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task completed in ${time} ms`);
        }, time);
    });
}

simulateTask3(600)
  .then(res => console.log("OK:", res))
  .catch(err => console.error("ERR:", err))
  .finally(() => console.log("Done"));
