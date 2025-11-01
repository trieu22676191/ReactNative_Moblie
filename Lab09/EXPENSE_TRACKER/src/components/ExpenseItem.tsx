import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export type Expense = {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
  type: string;
};

export default function ExpenseItem({ item }: { item: Expense }) {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("EditExpense", { item })}
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
