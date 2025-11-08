import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, Button, Modal, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useEffect, useState, useMemo } from 'react';
import { initDB, getTodos, addTodo, toggleTodoDone, updateTodoTitle, deleteTodo, mergeApiTodos, type Todo } from './db'; 

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const refreshTodos = () => {
    const data = getTodos();
    setTodos(data);
  }

  useEffect(() => {
    initDB();
    refreshTodos();
  }, []);

  const handleAddTodo = () => {
    if (newTodoTitle.trim() === '') {
      Alert.alert("Lỗi", "Tiêu đề công việc không được để trống!");
      return;
    }
    addTodo(newTodoTitle);
    setIsAddModalVisible(false); // Đóng modal sau khi thêm
    refreshTodos(); // Tải lại danh sách từ DB
    setNewTodoTitle(''); // Xóa nội dung trong ô input
  };

  const handleToggleTodo = (id: number, done: number) => {
    toggleTodoDone(id, done);
    refreshTodos();
  };

  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setNewTodoTitle(todo.title);
    setIsEditModalVisible(true);
  };

  const handleUpdateTodo = () => {
    if (!editingTodo || newTodoTitle.trim() === '') {
      Alert.alert("Lỗi", "Tiêu đề công việc không được để trống!");
      return;
    }
    updateTodoTitle(editingTodo.id, newTodoTitle);
    setIsEditModalVisible(false);
    refreshTodos();
    setNewTodoTitle('');
    setEditingTodo(null);
  };

  const handleDeleteTodo = (id: number) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa công việc này không?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        { 
          text: "Xóa", 
          onPress: () => {
            deleteTodo(id);
            refreshTodos();
          },
          style: "destructive" // Màu đỏ trên iOS
        }
      ]
    );
  };

  const handleSync = async () => {
    setIsSyncing(true); // Bắt đầu loading
    try {
      const response = await fetch('https://690ee59bbd0fefc30a05f2ff.mockapi.io/TODOLIST');
      if (!response.ok) {
        throw new Error('Lỗi mạng hoặc máy chủ');
      }
      const apiTodos = await response.json();
      
      mergeApiTodos(apiTodos); // Gọi hàm xử lý logic trong db.ts
      refreshTodos(); // Cập nhật lại danh sách trên UI
      Alert.alert("Thành công", "Đồng bộ dữ liệu từ API thành công!");

    } catch (error) {
      console.error("Lỗi khi đồng bộ: ", error);
      Alert.alert("Lỗi", "Không thể đồng bộ dữ liệu. Vui lòng thử lại.");
    } finally {
      setIsSyncing(false); // Dừng loading dù thành công hay thất bại
    }
  };

  // Dùng useMemo để tối ưu việc lọc, chỉ tính toán lại khi todos hoặc searchTerm thay đổi
  const filteredTodos = useMemo(() => {
    if (!searchTerm) {
      return todos; // Nếu không có từ khóa tìm kiếm, trả về toàn bộ danh sách
    }
    // Lọc client-side, không phân biệt hoa thường
    return todos.filter(todo =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TextInput style={styles.searchInput} placeholder="Tìm kiếm công việc..." value={searchTerm} onChangeText={setSearchTerm} editable={!isSyncing} />
        {isSyncing ? (
          <ActivityIndicator style={styles.syncButton} size="small" color="#007AFF" />
        ) : (
          <Pressable onPress={handleSync} style={styles.syncButton}>
            <Text style={styles.syncButtonText}>Đồng bộ API</Text>
          </Pressable>
        )}
      </View>
      {/* Modal Thêm Mới */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Thêm công việc mới</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tiêu đề công việc..."
              value={newTodoTitle}
              onChangeText={setNewTodoTitle}
            />
            <View style={styles.buttonContainer}>
              <Button title="Lưu" onPress={handleAddTodo} />
              <Button title="Hủy" color="red" onPress={() => {
                setIsAddModalVisible(false);
                setNewTodoTitle(''); // Xóa input khi hủy
              }} />
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Modal Chỉnh Sửa */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Chỉnh sửa công việc</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tiêu đề mới..."
              value={newTodoTitle}
              onChangeText={setNewTodoTitle}
            />
            <View style={styles.buttonContainer}>
              <Button title="Lưu" onPress={handleUpdateTodo} />
              <Button title="Hủy" color="red" onPress={() => {
                setIsEditModalVisible(false);
                setNewTodoTitle('');
                setEditingTodo(null);
              }} />
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <FlatList
        data={filteredTodos} // Sử dụng danh sách đã lọc
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleToggleTodo(item.id, item.done)}
            onLongPress={() => openEditModal(item)}
          >
            <View style={styles.todoItemContainer}>
              <Text style={[styles.todoText, item.done && styles.doneText]}>{item.title}</Text>
              <Pressable onPress={() => handleDeleteTodo(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Xóa</Text>
              </Pressable>
            </View> 
          </Pressable>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có việc nào</Text>
          </View>
        )}
      />

      <Pressable style={styles.fab} onPress={() => setIsAddModalVisible(true)}>
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    flex: 1,
    marginRight: 10,
  },
  todoItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  todoText: {
    fontSize: 18,
    flex: 1, // Đảm bảo text không bị tràn ra ngoài
  },
  doneText: {
    fontSize: 18,
    color: '#aaa',
    textDecorationLine: 'line-through',
  },
  emptyContainer: {
    flex: 1,
    marginTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    borderRadius: 28,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
  },
  syncButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  }
});
