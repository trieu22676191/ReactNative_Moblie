import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/book.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>MANAGE YOUR TASK</Text>

      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({ pathname: "/screens/TaskScreen", params: { name } })
        }
      >
        <Text style={styles.buttonText}>GET STARTED →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#9333ea", // purple-600 equivalent
    marginBottom: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db", // gray-300 equivalent
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#06b6d4", // cyan-500 equivalent
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});
