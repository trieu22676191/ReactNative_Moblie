import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type Expense = {
  id: string;
  title: string;
  amount: number;
  createdAt: string;
  type: "Thu" | "Chi";
};

interface Props {
  item: Expense;
}

export default function ExpenseItem({ item }: Props) {
  const isIncome = item.type === "Thu";

  return (
    <View style={[styles.item, isIncome ? styles.income : styles.expense]}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.title}</Text>
        <Text
          style={[styles.amount, isIncome ? styles.textGreen : styles.textRed]}
        >
          {isIncome ? "+" : "-"}
          {item.amount.toLocaleString()}₫
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.date}>{item.createdAt}</Text>
        <Text style={styles.type}>{item.type}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textGreen: { color: "#2ecc71" },
  textRed: { color: "#e74c3c" },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  type: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
    fontStyle: "italic",
  },
  income: { borderLeftWidth: 4, borderLeftColor: "#2ecc71" },
  expense: { borderLeftWidth: 4, borderLeftColor: "#e74c3c" },
});
