function reject(): Promise<never>{
    return new Promise((_, reject)=>{
        setTimeout(()=>{
            reject("Something went wrong");
        },1000);
    });
}
reject().catch((err)=>{
    console.error(err);
})