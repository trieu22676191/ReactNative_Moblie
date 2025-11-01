import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpenseItem, { Expense } from "../components/ExpenseItem";
import { getAllExpenses } from "../database/db";

export default function MainScreen({ navigation }: any) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState<"Tất cả" | "Thu" | "Chi">(
    "Tất cả"
  );

  const loadExpenses = async () => {
    const data = await getAllExpenses();
    setExpenses(data as Expense[]);
  };

  // Hàm refresh khi kéo xuống
  const onRefresh = async () => {
    setRefreshing(true);
    await loadExpenses();
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadExpenses);
    return unsubscribe;
  }, [navigation]);

  // Lọc danh sách theo từ khóa tìm kiếm và loại thu/chi
  const filteredExpenses = expenses.filter((expense) => {
    const matchSearch = expense.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchType = filterType === "Tất cả" || expense.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("StatisticsScreen")}
          >
            <Text style={styles.headerButtonText}>📊 Thống kê</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("TrashScreen")}
          >
            <Text style={styles.headerButtonText}>🗑️ Thùng rác</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("SettingsScreen")}
          >
            <Text style={styles.headerButtonText}>⚙️ Đồng bộ</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo tên khoản..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Text style={styles.clearButton}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Bar */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === "Tất cả" && styles.filterButtonActive,
          ]}
          onPress={() => setFilterType("Tất cả")}
        >
          <Text
            style={[
              styles.filterButtonText,
              filterType === "Tất cả" && styles.filterButtonTextActive,
            ]}
          >
            📊 Tất cả
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === "Thu" && styles.filterButtonActive,
            filterType === "Thu" && styles.filterButtonIncome,
          ]}
          onPress={() => setFilterType("Thu")}
        >
          <Text
            style={[
              styles.filterButtonText,
              filterType === "Thu" && styles.filterButtonTextActive,
            ]}
          >
            💰 Thu
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === "Chi" && styles.filterButtonActive,
            filterType === "Chi" && styles.filterButtonExpense,
          ]}
          onPress={() => setFilterType("Chi")}
        >
          <Text
            style={[
              styles.filterButtonText,
              filterType === "Chi" && styles.filterButtonTextActive,
            ]}
          >
            💸 Chi
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExpenseItem item={item} onDelete={loadExpenses} />
        )}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4a90e2"]}
            tintColor="#4a90e2"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery
                ? "Không tìm thấy kết quả nào"
                : "Chưa có khoản thu chi nào"}
            </Text>
          </View>
        }
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
  headerButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  headerButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  headerButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 4,
  },
  clearButton: {
    fontSize: 20,
    color: "#999",
    paddingHorizontal: 8,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 10,
  },
  filterButton: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ddd",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterButtonActive: {
    backgroundColor: "#4a90e2",
    borderColor: "#4a90e2",
  },
  filterButtonIncome: {
    backgroundColor: "#27ae60",
    borderColor: "#27ae60",
  },
  filterButtonExpense: {
    backgroundColor: "#e74c3c",
    borderColor: "#e74c3c",
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  filterButtonTextActive: {
    color: "white",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
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
