"use strict";
async function manyCalls() {
    const urls = [
        "https://jsonplaceholder.typicode.com/todos/1",
        "https://jsonplaceholder.typicode.com/invalid-url",
        "https://jsonplaceholder.typicode.com/todos/3"
    ];
    // Không cần .catch ở đây
    const promises = urls.map(u => fetch(u).then(r => {
        if (!r.ok)
            throw new Error(`HTTP ${r.status}`);
        return r.json();
    }));
    const settled = await Promise.allSettled(promises);
    settled.forEach((s, idx) => {
        if (s.status === "fulfilled") {
            console.log(`URL ${urls[idx]} succeeded:`, s.value);
        }
        else {
            const msg = s.reason instanceof Error ? s.reason.message : String(s.reason);
            console.error(`URL ${urls[idx]} failed:`, msg);
        }
    });
}
manyCalls();
