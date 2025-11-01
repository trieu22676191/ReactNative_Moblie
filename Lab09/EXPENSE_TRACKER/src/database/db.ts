import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("expenses.db");

// Tạo bảng nếu chưa có
export const createTable = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      createdAt TEXT NOT NULL,
      type TEXT NOT NULL
    );
  `);
};

// Hàm thêm dữ liệu
export const addExpense = async (title: string, amount: number, type: string) => {
  const createdAt = new Date().toISOString().split("T")[0];
  await db.runAsync(
    `INSERT INTO expenses (title, amount, createdAt, type) VALUES (?, ?, ?, ?)`,
    [title, amount, createdAt, type]
  );
};

// Hàm lấy dữ liệu
export const getAllExpenses = async () => {
  const result = await db.getAllAsync("SELECT * FROM expenses ORDER BY id DESC");
  return result;
};
