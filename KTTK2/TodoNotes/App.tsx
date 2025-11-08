import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, Button, Modal, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { initDB, getTodos, addTodo, toggleTodoDone, type Todo } from './db';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const refreshTodos = () => {
    const data = getTodos();
    setTodos(data);
  }

  useEffect(() => {
    initDB();
    refreshTodos();
  }, []);

  const handleAddTodo = () => {
    if (currentTodo.trim() === '') {
      Alert.alert("Lỗi", "Tiêu đề công việc không được để trống!");
      return;
    }
    addTodo(currentTodo);
    setIsModalVisible(false); // Đóng modal sau khi thêm
    refreshTodos(); // Tải lại danh sách từ DB
    setCurrentTodo(''); // Xóa nội dung trong ô input
  };

  const handleToggleTodo = (id: number, done: number) => {
    toggleTodoDone(id, done);
    refreshTodos();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Thêm công việc mới</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tiêu đề công việc..."
              value={currentTodo}
              onChangeText={setCurrentTodo}
            />
            <View style={styles.buttonContainer}>
              <Button title="Lưu" onPress={handleAddTodo} />
              <Button title="Hủy" color="red" onPress={() => {
                setIsModalVisible(false);
                setCurrentTodo(''); // Xóa input khi hủy
              }} />
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleToggleTodo(item.id, item.done)}>
            <View style={styles.todoItem}>
              <Text style={item.done ? styles.doneText : styles.todoText}>{item.title}</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có việc nào</Text>
          </View>
        )}
      />

      <Pressable style={styles.fab} onPress={() => setIsModalVisible(true)}>
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
  todoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  todoText: {
    fontSize: 18,
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
  }
});
