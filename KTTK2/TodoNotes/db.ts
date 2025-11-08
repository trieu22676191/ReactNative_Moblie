// File: db.ts (Đã sửa đổi cho API đồng bộ)

export type Todo = {
  id: number;
  title: string;
  done: number; // 0 for false, 1 for true
  created_at: number;
};


import * as SQLite from 'expo-sqlite';
import { LogBox } from 'react-native';

// Bỏ qua cảnh báo về việc sử dụng Sync API nếu có
LogBox.ignoreLogs(['The SQLite.openDatabaseSync() and SQLite.deleteDatabaseSync()']); 


/**
 * Mở kết nối đến database 'todos.db' (Đồng bộ)
 */
export function openDatabase() {
  // Dùng openDatabaseSync theo yêu cầu của bạn
  const db = SQLite.openDatabaseSync('todos.db');
  return db;
}

// Xuất một thể hiện (instance) của DB để dùng chung
export const db = openDatabase();

export const initDB = () => {
  try {
    // 1. Tạo bảng todos nếu chưa có (dùng execSync)
    db.execSync(`
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            title TEXT NOT NULL, 
            done INTEGER DEFAULT 0, 
            created_at INTEGER DEFAULT (cast(strftime('%s', 'now') as integer))
        );
    `);

    // 2. Kiểm tra và Seed 2 bản ghi mẫu nếu bảng trống (dùng getAllSync và runSync)
    const result = db.getAllSync<{ count: number }>("SELECT COUNT(id) as count FROM todos;");
    
    if (result.length > 0 && result[0].count === 0) {
      db.runSync("INSERT INTO todos (title, done) VALUES (?, ?)", ["Công việc đầu tiên", 0]);
      db.runSync("INSERT INTO todos (title, done) VALUES (?, ?)", ["Công việc đã hoàn thành", 1]);
      console.log("Seed dữ liệu mẫu thành công.");
    }
    
    console.log("Khởi tạo DB thành công / Bảng đã tồn tại.");
    
  } catch (error) {
    console.error("Lỗi khi khởi tạo DB: ", error);
  }
};

export const getTodos = (): Todo[] => {
  try {
    return db.getAllSync<Todo>("SELECT * FROM todos ORDER BY created_at DESC;");
  } catch (error) {
    console.error("Lỗi khi lấy danh sách todos: ", error);
    return [];
  }
};

export const addTodo = (title: string) => {
  try {
    // Dùng runSync để thực thi câu lệnh INSERT
    db.runSync("INSERT INTO todos (title) VALUES (?)", [title]);
  } catch (error) {
    console.error("Lỗi khi thêm todo: ", error);
  }
};

export const toggleTodoDone = (id: number, currentDoneStatus: number) => {
  try {
    // Lật trạng thái: nếu đang là 0 -> 1, nếu là 1 -> 0
    const newDoneStatus = currentDoneStatus === 0 ? 1 : 0;
    db.runSync("UPDATE todos SET done = ? WHERE id = ?", [newDoneStatus, id]);
  } catch (error) {
    console.error(`Lỗi khi cập nhật todo có id ${id}: `, error);
  }
};

export const updateTodoTitle = (id: number, title: string) => {
  try {
    db.runSync("UPDATE todos SET title = ? WHERE id = ?", [title, id]);
  } catch (error) {
    console.error(`Lỗi khi cập nhật tiêu đề todo có id ${id}: `, error);
  }
};

export const deleteTodo = (id: number) => {
  try {
    db.runSync("DELETE FROM todos WHERE id = ?", [id]);
  } catch (error) {
    console.error(`Lỗi khi xóa todo có id ${id}: `, error);
  }
};

type ApiTodo = {
  title: string;
  completed: boolean;
  id: string;
};

export const mergeApiTodos = (apiTodos: ApiTodo[]) => {
  try {
    // Lấy tất cả các title hiện có để kiểm tra trùng lặp
    const existingTitles = new Set(
      db.getAllSync<{ title: string }>("SELECT title FROM todos;").map(t => t.title)
    );

    // Dùng transaction thủ công để đảm bảo tương thích
    try {
      db.execSync("BEGIN TRANSACTION;");
      for (const todo of apiTodos) {
        if (!existingTitles.has(todo.title)) {
          db.runSync("INSERT INTO todos (title, done) VALUES (?, ?)", [todo.title, todo.completed ? 1 : 0]);
        }
      }
      db.execSync("COMMIT;");
    } catch (transactionError) {
      db.execSync("ROLLBACK;");
      throw transactionError; // Ném lại lỗi để khối catch bên ngoài bắt được
    }
  } catch (error) {
    console.error("Lỗi khi hợp nhất dữ liệu từ API: ", error);
  }
};