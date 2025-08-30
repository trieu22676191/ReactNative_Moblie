function filterEvenAfter1s(arr: number[]): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(arr.filter(x => x % 2 === 0)), 1000);
  });
}

filterEvenAfter1s([1, 2, 3, 4, 5, 6]).then(evens => console.log("Evens:", evens));