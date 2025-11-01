import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpenseItem, { Expense } from "../components/ExpenseItem";

export default function MainScreen() {
  const data: Expense[] = [
    {
      id: "1",
      title: "Lương tháng 10",
      amount: 10000000,
      createdAt: "2025-11-01",
      type: "Thu",
    },
    {
      id: "2",
      title: "Ăn sáng",
      amount: 30000,
      createdAt: "2025-11-01",
      type: "Chi",
    },
    {
      id: "3",
      title: "Mua sách",
      amount: 120000,
      createdAt: "2025-10-30",
      type: "Chi",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EXPENSE TRACKER</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseItem item={item} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#4a90e2",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
});
