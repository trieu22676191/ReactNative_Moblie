function wait1(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createTask1(i: number) {
  await wait1(500 + Math.random() * 500);
  return `task-${i}-done`;
}

async function queueProcess(tasks: (() => Promise<any>)[]) {
  const results = [];
  for (const t of tasks) {
    const r = await t();
    results.push(r);
  }
  return results;
}

const taskFns = [() => createTask1(1), () => createTask1(2), () => createTask1(3)];
queueProcess(taskFns).then(res => console.log("Queue results:", res));

