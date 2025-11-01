import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("expenses.db");

// Tạo bảng nếu chưa có
export const createTable = async () => {
  // Tạo bảng cơ bản
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      createdAt TEXT NOT NULL,
      type TEXT NOT NULL
    );
  `);
  
  // Migration: Thêm cột isDeleted nếu chưa có
  try {
    // Kiểm tra xem cột isDeleted đã tồn tại chưa
    const tableInfo = await db.getAllAsync(`PRAGMA table_info(expenses)`);
    const hasIsDeletedColumn = tableInfo.some((col: any) => col.name === 'isDeleted');
    
    if (!hasIsDeletedColumn) {
      // Thêm cột isDeleted vào bảng đã tồn tại
      await db.execAsync(`ALTER TABLE expenses ADD COLUMN isDeleted INTEGER DEFAULT 0`);
      console.log('✅ Đã thêm cột isDeleted vào bảng expenses');
    }
  } catch (error) {
    console.error('Lỗi khi migration:', error);
  }
};

// Hàm thêm dữ liệu
export const addExpense = async (title: string, amount: number, type: string) => {
  const createdAt = new Date().toISOString().split("T")[0];
  await db.runAsync(
    `INSERT INTO expenses (title, amount, createdAt, type, isDeleted) VALUES (?, ?, ?, ?, 0)`,
    [title, amount, createdAt, type]
  );
};

// Hàm lấy dữ liệu (chỉ lấy những khoản chưa bị xóa)
export const getAllExpenses = async () => {
  const result = await db.getAllAsync(
    "SELECT * FROM expenses WHERE isDeleted = 0 ORDER BY id DESC"
  );
  return result;
};

// Hàm lấy các khoản đã xóa
export const getDeletedExpenses = async () => {
  const result = await db.getAllAsync(
    "SELECT * FROM expenses WHERE isDeleted = 1 ORDER BY id DESC"
  );
  return result;
};

export const updateExpense = async (
  id: number,
  title: string,
  amount: number,
  type: string
) => {
  await db.runAsync(
    `UPDATE expenses SET title = ?, amount = ?, type = ? WHERE id = ?`,
    [title, amount, type, id]
  );
};

// Hàm xóa mềm (soft delete) - đánh dấu isDeleted = 1
export const deleteExpense = async (id: number) => {
  await db.runAsync(
    `UPDATE expenses SET isDeleted = 1 WHERE id = ?`,
    [id]
  );
};

// Hàm khôi phục khoản đã xóa
export const restoreExpense = async (id: number) => {
  await db.runAsync(
    `UPDATE expenses SET isDeleted = 0 WHERE id = ?`,
    [id]
  );
};