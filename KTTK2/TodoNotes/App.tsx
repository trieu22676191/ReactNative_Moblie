import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { initDB, getTodos, addTodo, type Todo } from './db';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState('');

  const refreshTodos = () => {
    const data = getTodos();
    setTodos(data);
  }

  useEffect(() => {
    initDB();
    refreshTodos();
  }, []);

  const handleAddTodo = () => {
    if (currentTodo.trim() === '') return; // Không thêm nếu input rỗng
    addTodo(currentTodo);
    refreshTodos(); // Tải lại danh sách từ DB
    setCurrentTodo(''); // Xóa nội dung trong ô input
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Thêm việc mới..."
          value={currentTodo}
          onChangeText={setCurrentTodo}
        />
        <Button title="Thêm" onPress={handleAddTodo} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={item.done ? styles.doneText : styles.todoText}>{item.title}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có việc nào</Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
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
  }
});
