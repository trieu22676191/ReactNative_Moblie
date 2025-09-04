"use strict";
async function fetchUser1(id) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id, name: `User${id}` }), 500);
    });
}
async function fetchUsers(ids) {
    const promises = ids.map(id => fetchUser1(id));
    return Promise.all(promises);
}
fetchUsers([1, 2, 3]).then(users => console.log(users));
