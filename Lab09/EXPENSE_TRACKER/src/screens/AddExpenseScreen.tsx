import React, { useRef, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { addExpense } from "../database/db";

export default function AddExpenseScreen({ navigation }: any) {
  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);
  const [type, setType] = useState<"Thu" | "Chi">("Chi");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSave = async () => {
    if (!title || !amount) return;
    await addExpense(title, parseFloat(amount), type);
    setTitle("");
    setAmount("");
    titleRef.current?.clear();
    amountRef.current?.clear();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên khoản:</Text>
      <TextInput
        ref={titleRef}
        style={styles.input}
        placeholder="Nhập tên khoản..."
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Số tiền:</Text>
      <TextInput
        ref={amountRef}
        style={styles.input}
        placeholder="Nhập số tiền..."
        keyboardType="numeric"
        onChangeText={setAmount}
      />

      <View style={styles.typeContainer}>
        <Button
          title="Thu"
          onPress={() => setType("Thu")}
          color={type === "Thu" ? "green" : "gray"}
        />
        <Button
          title="Chi"
          onPress={() => setType("Chi")}
          color={type === "Chi" ? "red" : "gray"}
        />
      </View>

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { marginTop: 10, fontSize: 16, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
});
