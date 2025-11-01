import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const avatar = require("../../assets/images/avt.png");

interface Props {
  name?: string;
}

export default function Header({ name }: Props) {
  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.avatar} />
      <View>
        <Text style={styles.nameText}>Hi {name || "User"}</Text>
        <Text style={styles.subText}>Have a great day ahead</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
  },
  subText: {
    color: "#6b7280",
  },
});
