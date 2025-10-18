import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-5">
      <Image
        source={require("../../assets/images/book.png")} 
        className="w-40 h-40 mb-6"
        resizeMode="contain"
      />
      <Text className="text-xl font-bold text-purple-600 mb-4">
        MANAGE YOUR TASK
      </Text>

      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-5"
      />

      <TouchableOpacity
        className="bg-cyan-500 rounded-lg px-6 py-3 w-full"
        onPress={() => router.push({ pathname: "/screens/TaskScreen", params: { name } })}
      >
        <Text className="text-white font-semibold text-center">GET STARTED →</Text>
      </TouchableOpacity>
    </View>
  );
}
