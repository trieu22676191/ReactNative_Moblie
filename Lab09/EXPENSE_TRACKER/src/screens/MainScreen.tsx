import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpenseItem, { Expense } from "../components/ExpenseItem";
import { getAllExpenses } from "../database/db";

export default function MainScreen({ navigation }: any) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const loadExpenses = async () => {
    const data = await getAllExpenses();
    setExpenses(data as Expense[]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadExpenses);
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.trashButton}
          onPress={() => navigation.navigate("TrashScreen")}
        >
          <Text style={styles.trashText}>🗑️ Thùng rác</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExpenseItem item={item} onDelete={loadExpenses} />
        )}
        contentContainerStyle={{ padding: 16 }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddExpense")}
      >
        <Text style={styles.addText}>＋</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { backgroundColor: "#4a90e2", padding: 20, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", color: "white" },
  trashButton: {
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  trashText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#4a90e2",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addText: { color: "white", fontSize: 30, lineHeight: 30 },
});
