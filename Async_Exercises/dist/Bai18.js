"use strict";
async function fetchUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id, name: `User${id}` }), 1000);
    });
}
fetchUser(5).then(user => console.log(user));
