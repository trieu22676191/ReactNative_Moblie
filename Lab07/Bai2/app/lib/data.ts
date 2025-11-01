import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("tasks.db");

export type TaskRow = {
  id: string;
  title: string;
  completed: number; // 0 or 1
};

function execSql<T = any>(sql: string, params: (string | number)[] = []): Promise<T> {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          sql,
          params,
          (_, result) => resolve(result as unknown as T),
          (_, error) => {
            // return true to rollback (not used here)
            reject(error);
            return false;
          }
        );
      },
      (txErr) => reject(txErr)
    );
  });
}

export async function initDB(): Promise<void> {
  await execSql(
    `CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0
    );`
  );
}

export async function getAllTasks(): Promise<TaskRow[]> {
  const result = await execSql<SQLite.SQLResultSet>("SELECT * FROM tasks ORDER BY ROWID DESC;", []);
  // @ts-ignore result.rows exists on SQLResultSet
  return (result as any).rows._array as TaskRow[];
}

export async function addTaskRow(id: string, title: string): Promise<void> {
  await execSql("INSERT INTO tasks (id, title, completed) VALUES (?, ?, 0);", [id, title]);
}

export async function updateTaskTitle(id: string, title: string): Promise<void> {
  await execSql("UPDATE tasks SET title = ? WHERE id = ?;", [title, id]);
}

export async function setTaskCompleted(id: string, completed: boolean): Promise<void> {
  await execSql("UPDATE tasks SET completed = ? WHERE id = ?;", [completed ? 1 : 0, id]);
}

export async function deleteTaskRow(id: string): Promise<void> {
  await execSql("DELETE FROM tasks WHERE id = ?;", [id]);
}

export async function clearAllTasks(): Promise<void> {
  await execSql("DELETE FROM tasks;", []);
}