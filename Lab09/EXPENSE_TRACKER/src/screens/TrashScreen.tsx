import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  RefreshControl,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState<"Tất cả" | "Thu" | "Chi">(
    "Tất cả"
  );

  const loadDeletedExpenses = async () => {
    const data = await getDeletedExpenses();
    setDeletedExpenses(data as Expense[]);
  };

  // Hàm refresh khi kéo xuống
  const onRefresh = async () => {
    setRefreshing(true);
    await loadDeletedExpenses();
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadDeletedExpenses);
    return unsubscribe;
  }, [navigation]);

  const handleRestore = (item: Expense) => {
    Alert.alert(
      "Khôi phục khoản chi",
      `Bạn muốn khôi phục "${item.title}" (${item.amount}đ)?`,
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Khôi phục",
          style: "default",
          onPress: async () => {
            await restoreExpense(item.id);
            await loadDeletedExpenses(); // Reload danh sách thùng rác
            Alert.alert(
              "Thành công",
              "Đã khôi phục khoản chi về danh sách chính!"
            );
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
      <Text style={styles.hint}>💡 Nhấn hoặc giữ lâu để khôi phục</Text>
    </TouchableOpacity>
  );

  // Lọc danh sách theo từ khóa tìm kiếm và loại thu/chi
  const filteredExpenses = deletedExpenses.filter((expense) => {
    const matchSearch = expense.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchType = filterType === "Tất cả" || expense.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>THÙNG RÁC</Text>
        <Text style={styles.headerSubtitle}>
          Các khoản đã xóa ({deletedExpenses.length})
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm trong thùng rác..."
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

      {filteredExpenses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🗑️</Text>
          <Text style={styles.emptyMessage}>
            {searchQuery ? "Không tìm thấy kết quả nào" : "Thùng rác trống"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredExpenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#e74c3c"]}
              tintColor="#e74c3c"
            />
          }
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
    backgroundColor: "#e74c3c",
    borderColor: "#e74c3c",
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
