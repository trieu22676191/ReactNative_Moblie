import { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import {
  initDB,
  getTodos,
  addTodo,
  toggleTodoDone,
  updateTodoTitle,
  deleteTodo,
  mergeApiTodos,
  type Todo,
} from './db';

export const useTodos = () => {
  // State dữ liệu
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // State cho UI (loading, modals)
  const [isLoading, setIsLoading] = useState(true); // Dùng cho load ban đầu và pull-to-refresh
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  // --- CÁC HÀM XỬ LÝ DỮ LIỆU (được bọc trong useCallback) ---

  const refreshTodos = useCallback(() => {
    setIsLoading(true);
    try {
      const data = getTodos();
      setTodos(data);
    } catch (e) {
      console.error("Lỗi khi làm mới danh sách todos", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initDB();
    refreshTodos();
  }, [refreshTodos]); // Chỉ chạy 1 lần vì refreshTodos được bọc trong useCallback

  const handleAddTodo = useCallback(() => {
    if (newTodoTitle.trim() === '') {
      Alert.alert("Lỗi", "Tiêu đề công việc không được để trống!");
      return;
    }
    addTodo(newTodoTitle);
    setIsAddModalVisible(false);
    refreshTodos();
    setNewTodoTitle('');
  }, [newTodoTitle, refreshTodos]);

  const handleToggleTodo = useCallback((id: number, done: number) => {
    toggleTodoDone(id, done);
    refreshTodos();
  }, [refreshTodos]);

  const openEditModal = useCallback((todo: Todo) => {
    setEditingTodo(todo);
    setNewTodoTitle(todo.title);
    setIsEditModalVisible(true);
  }, []);

  const handleUpdateTodo = useCallback(() => {
    if (!editingTodo || newTodoTitle.trim() === '') {
      Alert.alert("Lỗi", "Tiêu đề công việc không được để trống!");
      return;
    }
    updateTodoTitle(editingTodo.id, newTodoTitle);
    setIsEditModalVisible(false);
    refreshTodos();
    setNewTodoTitle('');
    setEditingTodo(null);
  }, [editingTodo, newTodoTitle, refreshTodos]);

  const handleDeleteTodo = useCallback((id: number) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa công việc này không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          onPress: () => {
            deleteTodo(id);
            refreshTodos();
          },
          style: "destructive"
        }
      ]
    );
  }, [refreshTodos]);

  const handleSync = useCallback(async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('https://690ee59bbd0fefc30a05f2ff.mockapi.io/TODOLIST');
      if (!response.ok) throw new Error('Lỗi mạng hoặc máy chủ');
      const apiTodos = await response.json();
      mergeApiTodos(apiTodos);
      refreshTodos();
      Alert.alert("Thành công", "Đồng bộ dữ liệu từ API thành công!");
    } catch (error) {
      console.error("Lỗi khi đồng bộ: ", error);
      Alert.alert("Lỗi", "Không thể đồng bộ dữ liệu. Vui lòng thử lại.");
    } finally {
      setIsSyncing(false);
    }
  }, [refreshTodos]);

  // Dùng useMemo để tối ưu việc lọc
  const filteredTodos = useMemo(() => {
    if (!searchTerm) return todos;
    return todos.filter(todo =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  // Trả về tất cả state và hàm cần thiết cho UI
  return {
    todos: filteredTodos,
    newTodoTitle,
    isAddModalVisible,
    isEditModalVisible,
    isLoading,
    isSyncing,
    searchTerm,
    setSearchTerm,
    refreshTodos,
    handleAddTodo,
    handleToggleTodo,
    openEditModal,
    handleUpdateTodo,
    handleDeleteTodo,
    handleSync,
    setNewTodoTitle,
    setIsAddModalVisible,
    setIsEditModalVisible,
    setEditingTodo,
  };
};