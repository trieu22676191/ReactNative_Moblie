async function getTodo() {
  const res = await fetch("https://68baeb4e84055bce63f096c9.mockapi.io/Users");
  const data = await res.json();
  console.log(data);
}

getTodo();
