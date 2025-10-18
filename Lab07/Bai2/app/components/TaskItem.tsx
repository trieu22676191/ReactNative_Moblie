import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
}

export default function TaskItem({ title }: Props) {
  return (
    <View className="flex-row items-center justify-between bg-gray-100 rounded-xl px-4 py-3 mb-3 shadow-sm">
      <View className="flex-row items-center space-x-2">
        <Ionicons name="checkmark-circle" size={22} color="green" />
        <Text className="text-base">{title}</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="pencil" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
}
