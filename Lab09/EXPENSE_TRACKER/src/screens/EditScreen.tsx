import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { updateExpense } from "../database/db";

export default function EditExpenseScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { item } = route.params;

  const [title, setTitle] = useState(item.title);
  const [amount, setAmount] = useState(String(item.amount));
  const [type, setType] = useState(item.type);

  const handleUpdate = async () => {
    if (!title || !amount) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    await updateExpense(item.id, title, parseFloat(amount), type);
    Alert.alert("Thành công", "Cập nhật thành công!");
    navigation.goBack(); // quay lại màn hình chính
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CẬP NHẬT THU - CHI</Text>

      <Text style={styles.label}>Tên khoản:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Tên khoản chi"
      />

      <Text style={styles.label}>Số tiền:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
        placeholder="Số tiền"
      />

      <Text style={styles.label}>Loại (Thu / Chi):</Text>
      <TextInput
        style={styles.input}
        value={type}
        onChangeText={setType}
        placeholder="Nhập Thu hoặc Chi"
      />

      <Button title="Save" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: { marginTop: 10, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
});
