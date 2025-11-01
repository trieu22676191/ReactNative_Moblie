import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { deleteExpense } from "../database/db";

export type Expense = {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
  type: string;
};

type ExpenseItemProps = {
  item: Expense;
  onDelete?: () => void;
};

export default function ExpenseItem({ item, onDelete }: ExpenseItemProps) {
  const navigation = useNavigation<any>();

  const handleDelete = () => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc chắn muốn xóa "${item.title}"?`,
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            await deleteExpense(item.id);
            if (onDelete) onDelete();
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("EditExpense", { item })}
      onLongPress={handleDelete}
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
      <Text>{item.type}</Text>
      <Text style={styles.date}>{item.createdAt}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: { fontWeight: "bold", fontSize: 16 },
  amount: { fontWeight: "600" },
  date: { fontSize: 12, color: "#666" },
});
