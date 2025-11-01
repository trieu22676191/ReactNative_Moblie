import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import * as SQLite from 'expo-sqlite';

import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import TaskItem from "../components/TaskItem";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TaskScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "To check email", completed: false },
    { id: "2", title: "UI task web page", completed: false },
    { id: "3", title: "Learn javascript basic", completed: false },
    { id: "4", title: "Learn HTML Advance", completed: false },
    { id: "5", title: "Medical App UI", completed: false },
    { id: "6", title: "Learn Java", completed: false },
  ]);

  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState("");

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          title: newTask.trim(),
          completed: false,
        },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => setTasks(tasks.filter((task) => task.id !== id)),
        style: "destructive",
      },
    ]);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setNewTask(task.title);
  };

  const handleUpdate = () => {
    if (editingTask && newTask.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, title: newTask.trim() } : task
        )
      );
      setEditingTask(null);
      setNewTask("");
    }
  };

  const addOrUpdateTask = () => {
    if (editingTask) {
      handleUpdate();
    } else {
      addTask();
    }
  };

  return (
    <View style={styles.container}>
      <Header name={name} />
      <TextInput
        placeholder="Search tasks..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={tasks.filter((t) =>
          t.title.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            title={item.title}
            completed={item.completed}
            onToggle={() => toggleTask(item.id)}
            onDelete={() => deleteTask(item.id)}
            onEdit={() => handleEdit(item)}
          />
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={editingTask ? "Edit task..." : "Add new task..."}
          value={newTask}
          onChangeText={setNewTask}
          style={styles.newTaskInput}
        />
        <TouchableOpacity
          onPress={addOrUpdateTask}
          style={[styles.addButton, editingTask && styles.editButton]}
        >
          <Text style={styles.addButtonText}>{editingTask ? "✓" : "+"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 16,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  newTaskInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#06b6d4",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 24,
  },
  editButton: {
    backgroundColor: "#22c55e", // green color for edit mode
  },
});
