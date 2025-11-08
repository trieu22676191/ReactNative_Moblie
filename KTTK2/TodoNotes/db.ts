// File: db.ts
import * as SQLite from 'expo-sqlite';

/**
 * Mở kết nối đến database 'todos.db'
 */
export function openDatabase() {
  const db = SQLite.openDatabaseSync('todos.db');
  return db;
}

// Xuất một thể hiện (instance) của DB để dùng chung
export const db = openDatabase();