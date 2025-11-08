import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, Button, Modal, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useTodos } from './useTodos';

export default function App() {
  const {
    todos,
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
  } = useTodos();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TextInput style={styles.searchInput} placeholder="Tìm kiếm công việc..." value={searchTerm} onChangeText={setSearchTerm} editable={!isSyncing} />
        {isSyncing ? (
          <ActivityIndicator style={styles.syncButton} size="small" color="#007AFF" />
        ) : (
          <Pressable onPress={handleSync} style={styles.syncButton} disabled={isSyncing}>
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
              <Button title="Lưu" onPress={handleAddTodo} disabled={isSyncing} />
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
              <Button title="Lưu" onPress={handleUpdateTodo} disabled={isSyncing} />
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
        data={todos} // Sử dụng danh sách đã lọc từ hook
        onRefresh={refreshTodos} // Hàm cho Pull to Refresh
        refreshing={isLoading} // Trạng thái loading cho Pull to Refresh
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleToggleTodo(item.id, item.done)}
            onLongPress={() => openEditModal(item)}
          >
            <View style={styles.todoItemContainer}>
              <Text style={[styles.todoText, item.done ? styles.doneText : null]}>{item.title}</Text>
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

      <Pressable style={styles.fab} onPress={() => setIsAddModalVisible(true)} disabled={isSyncing}>
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
