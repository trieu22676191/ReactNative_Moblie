import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getApiUrl,
  saveApiUrl,
  syncToApi,
  getAllExpensesFromApi,
} from "../services/api";
import { getAllExpenses } from "../database/db";

export default function SettingsScreen({ navigation }: any) {
  const [apiUrl, setApiUrl] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadApiUrl();
  }, []);

  const loadApiUrl = async () => {
    const url = await getApiUrl();
    setApiUrl(url);
  };

  const handleSaveUrl = async () => {
    if (!apiUrl.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập API URL!");
      return;
    }

    try {
      await saveApiUrl(apiUrl);
      Alert.alert("Thành công", "Đã lưu API URL!");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lưu API URL!");
    }
  };

  const handleSync = async () => {
    Alert.alert(
      "Xác nhận đồng bộ",
      "Thao tác này sẽ xóa toàn bộ dữ liệu trên API và upload dữ liệu từ thiết bị lên. Bạn có chắc chắn?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đồng bộ",
          style: "destructive",
          onPress: performSync,
        },
      ]
    );
  };

  const performSync = async () => {
    setIsSyncing(true);
    try {
      // Lấy toàn bộ data từ SQLite (chỉ lấy những khoản chưa xóa)
      const expenses = await getAllExpenses();
      
      // Đồng bộ lên API
      await syncToApi(expenses);
      
      Alert.alert(
        "Thành công",
        `Đã đồng bộ ${expenses.length} khoản thu chi lên API!`
      );
    } catch (error) {
      Alert.alert(
        "Lỗi",
        "Không thể đồng bộ dữ liệu. Vui lòng kiểm tra kết nối mạng và API URL!"
      );
      console.error(error);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleViewApiData = async () => {
    setIsLoading(true);
    try {
      const apiData = await getAllExpensesFromApi();
      Alert.alert(
        "Dữ liệu trên API",
        `Có ${apiData.length} khoản thu chi trên API`,
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lấy dữ liệu từ API!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CÀI ĐẶT ĐỒNG BỘ</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>API URL</Text>
          <Text style={styles.label}>
            Nhập link API MockAPI của bạn:
          </Text>
          <TextInput
            style={styles.input}
            value={apiUrl}
            onChangeText={setApiUrl}
            placeholder="https://69063d61ee3d0d14c1354b6c.mockapi.io/Expense"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveUrl}>
            <Text style={styles.buttonText}>💾 Lưu API URL</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Đồng bộ dữ liệu</Text>
          <Text style={styles.description}>
            Đồng bộ sẽ xóa toàn bộ dữ liệu trên API và upload dữ liệu từ thiết
            bị lên server.
          </Text>

          <TouchableOpacity
            style={[styles.syncButton, isSyncing && styles.disabledButton]}
            onPress={handleSync}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>🔄 Đồng bộ lên API</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.viewButton, isLoading && styles.disabledButton]}
            onPress={handleViewApiData}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#4a90e2" />
            ) : (
              <Text style={styles.viewButtonText}>👁️ Xem dữ liệu API</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>📋 Hướng dẫn:</Text>
          <Text style={styles.infoText}>
            1. Nhập API URL của bạn từ MockAPI{"\n"}
            2. Nhấn "Lưu API URL"{"\n"}
            3. Nhấn "Đồng bộ lên API" để upload dữ liệu{"\n"}
            4. Dữ liệu từ SQLite sẽ được đồng bộ lên server
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>⚠️ Lưu ý:</Text>
          <Text style={styles.infoText}>
            - Chỉ đồng bộ các khoản chưa bị xóa{"\n"}
            - API URL phải có cấu trúc đúng{"\n"}
            - Cần kết nối Internet để đồng bộ
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    backgroundColor: "#4a90e2",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  section: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#27ae60",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  syncButton: {
    backgroundColor: "#4a90e2",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  viewButton: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4a90e2",
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  viewButtonText: {
    color: "#4a90e2",
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  infoSection: {
    backgroundColor: "#fff3cd",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#ffc107",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#856404",
  },
  infoText: {
    fontSize: 14,
    color: "#856404",
    lineHeight: 22,
  },
});

