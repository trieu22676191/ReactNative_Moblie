function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );
  return Promise.race([promise, timeout]);
}

type User3 = { id: number; name: string };
function fetchUser3(id: number): Promise<User3> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id, name: `User${id}` }), 1000)
  );
}

withTimeout(fetchUser3(1), 2000)
  .then(console.log)
  .catch(console.error);

const slowCall = new Promise<string>(res =>
  setTimeout(() => res("slow"), 3000)
);
withTimeout(slowCall, 2000)
  .catch(err => console.error(err.message));

