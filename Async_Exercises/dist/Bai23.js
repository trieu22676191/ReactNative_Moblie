"use strict";
async function getCompletedTodos() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await res.json();
    const completed = todos.filter(pt => pt.completed);
    console.log("Completed:", completed);
}
getCompletedTodos();
