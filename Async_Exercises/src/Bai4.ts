function randomNumberPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const n = Math.random();
      if (n < 0.8) resolve(n);
      else reject(new Error("Bad random"));
    }, 500);
  });
}

randomNumberPromise()
  .then(n => console.log("Random:", n))
  .catch(err => console.error("Error:", err.message));
