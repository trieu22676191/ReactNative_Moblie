"use strict";
async function fetchWithRetry(url, retries = 3, delayMs = 500) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const res = await fetch(url);
            if (!res.ok)
                throw new Error(`HTTP ${res.status}`);
            return await res.json();
        }
        catch (err) {
            console.warn(`Attempt ${attempt} failed: ${err instanceof Error ? err.message : err}`);
            if (attempt === retries)
                throw err;
            await new Promise(r => setTimeout(r, delayMs));
        }
    }
}
fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3)
    .then(data => console.log("Fetched with retry:", data))
    .catch(err => console.error("Failed all retries:", err instanceof Error ? err.message : err));
