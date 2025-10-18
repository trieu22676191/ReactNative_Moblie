import React from "react";
import { View, Text, Image } from "react-native";

const avatar = require("../../assets/images/avt.png");
interface Props {
  name?: string;
}

export default function Header({ name }: Props) {
  return (
    <View className="flex-row items-center space-x-3">
      <Image source={avatar} className="w-12 h-12 rounded-full" />
      <View>
        <Text className="text-lg font-semibold">Hi {name || "User"}</Text>
        <Text className="text-gray-500">Have a great day ahead</Text>
      </View>
    </View>
  );
}
