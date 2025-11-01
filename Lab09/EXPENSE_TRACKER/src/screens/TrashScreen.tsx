import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDeletedExpenses, restoreExpense } from "../database/db";

type Expense = {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
  type: string;
};

export default function TrashScreen({ navigation }: any) {
  const [deletedExpenses, setDeletedExpenses] = useState<Expense[]>([]);

  const loadDeletedExpenses = async () => {
    const data = await getDeletedExpenses();
    setDeletedExpenses(data as Expense[]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadDeletedExpenses);
    return unsubscribe;
  }, [navigation]);

  const handleRestore = (item: Expense) => {
    Alert.alert(
      "Khôi phục khoản chi",
      `Bạn muốn khôi phục "${item.title}"?`,
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Khôi phục",
          onPress: async () => {
            await restoreExpense(item.id);
            loadDeletedExpenses();
            Alert.alert("Thành công", "Đã khôi phục khoản chi!");
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Expense }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleRestore(item)}
      onLongPress={() => handleRestore(item)}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text
          style={[
            styles.amount,
            { color: item.type === "Thu" ? "green" : "red" },
          ]}
        >
          {item.amount} đ
        </Text>
      </View>
      <Text style={styles.type}>{item.type}</Text>
      <Text style={styles.date}>{item.createdAt}</Text>
      <Text style={styles.hint}>Nhấn để khôi phục</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>THÙNG RÁC</Text>
        <Text style={styles.headerSubtitle}>
          Các khoản đã xóa ({deletedExpenses.length})
        </Text>
      </View>

      {deletedExpenses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🗑️</Text>
          <Text style={styles.emptyMessage}>Thùng rác trống</Text>
        </View>
      ) : (
        <FlatList
          data={deletedExpenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    backgroundColor: "#e74c3c",
    padding: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "white",
    marginTop: 5,
    opacity: 0.9,
  },
  item: {
    backgroundColor: "#fff3cd",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#e74c3c",
  },
  title: { fontWeight: "bold", fontSize: 16 },
  amount: { fontWeight: "600" },
  type: { fontSize: 14, color: "#666", marginTop: 4 },
  date: { fontSize: 12, color: "#666", marginTop: 2 },
  hint: {
    fontSize: 11,
    color: "#856404",
    marginTop: 6,
    fontStyle: "italic",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 60,
    opacity: 0.3,
  },
  emptyMessage: {
    fontSize: 18,
    color: "#999",
    marginTop: 10,
  },
});

