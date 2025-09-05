async function callMultipleTimes() {
  const urls = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://jsonplaceholder.typicode.com/todos/3"
  ];
  const promises = urls.map(u => fetch(u).then(r => r.json()));
  const results = await Promise.all(promises);
  console.log(results);
}

callMultipleTimes();
