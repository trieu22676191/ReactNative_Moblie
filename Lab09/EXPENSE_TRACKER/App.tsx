import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./src/screens/MainScreen";
import AddExpenseScreen from "./src/screens/AddExpenseScreen";
import EditScreen from "./src/screens/EditScreen";
import { createTable } from "./src/database/db";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    createTable(); // Tạo bảng khi app khởi động
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MainScreen}
            options={{ title: "EXPENSE TRACKER" }}
          />
          <Stack.Screen
            name="AddExpense"
            component={AddExpenseScreen}
            options={{ title: "Thêm khoản chi" }}
          />

          <Stack.Screen
            name="EditExpense"
            component={EditScreen}
            options={{ title: "Cập nhật khoản chi" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
