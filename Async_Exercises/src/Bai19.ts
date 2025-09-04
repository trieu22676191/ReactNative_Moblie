type User1 = {
  id: number;
  name: string;
};

async function fetchUser1(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: `User${id}` }), 500);
  });
}

async function fetchUsers(ids: number[]): Promise<User[]> {
  const promises = ids.map(id => fetchUser1(id));
  return Promise.all(promises);
}

fetchUsers([1, 2, 3]).then(users => console.log(users));
