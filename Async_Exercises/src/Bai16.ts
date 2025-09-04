function timesAfter1s(n: number): Promise<number>{
    return new Promise((resolve)=>{
        setTimeout(()=>resolve(n*3),1000);
    });
}

async function parallel() {
    const p = [timesAfter1s(1), timesAfter1s(2), timesAfter1s(3)];
    const t = await Promise.all(p);
    console.log("Parallel:", t);
}

parallel();