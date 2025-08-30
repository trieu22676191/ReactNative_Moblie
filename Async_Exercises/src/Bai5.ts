function simulateTask(time: number): Promise<string>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(`Task done in ${time} ms`);
        },time);
    });
}

simulateTask(1000).then(msg=>console.log(msg));
simulateTask(2000).then(msg=>console.log(msg));
simulateTask(3000).then(msg=>console.log(msg));