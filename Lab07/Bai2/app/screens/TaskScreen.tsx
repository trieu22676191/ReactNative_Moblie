import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Header from "../components/Header";
import TaskItem from "../components/TaskItem";

export default function TaskScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [tasks, setTasks] = useState([
    "To check email",
    "UI task web page",
    "Learn javascript basic",
    "Learn HTML Advance",
    "Medical App UI",
    "Learn Java",
  ]);

  const [search, setSearch] = useState("");

  return (
    <View className="flex-1 bg-white px-5 pt-10">
      <Header name={name} />
      <TextInput
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
        className="border border-gray-300 rounded-lg px-4 py-2 mt-4 mb-5"
      />

      <FlatList
        data={tasks.filter(t => t.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TaskItem title={item} />}
      />

      <TouchableOpacity
        className="bg-cyan-500 w-14 h-14 rounded-full items-center justify-center self-center mt-4"
      >
        <Text className="text-white text-2xl">+</Text>
      </TouchableOpacity>
    </View>
  );
}
