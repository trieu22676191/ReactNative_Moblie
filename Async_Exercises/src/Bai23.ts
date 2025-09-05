async function getCompletedTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: { completed: boolean }[] = await res.json();
  const completed = todos.filter(pt => pt.completed);
  console.log("Completed:", completed);
}

getCompletedTodos();
