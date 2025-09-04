//11. Convert Exercise 1 into async/await.
async function helloAsyncAwait() {
  const res = await new Promise(resolve => 
    setTimeout(() => 
        resolve("Hello Async"), 2000));
  return res;
}

helloAsyncAwait().then(console.log);

