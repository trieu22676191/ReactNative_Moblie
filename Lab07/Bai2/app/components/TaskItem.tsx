import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function TaskItem({
  title,
  completed,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={onToggle}>
          <Ionicons
            name={completed ? "checkmark-circle" : "ellipse-outline"}
            size={22}
            color={completed ? "green" : "#9ca3af"}
          />
        </TouchableOpacity>
        <Text style={[styles.title, completed && styles.completedTitle]}>
          {title}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <Ionicons name="pencil-outline" size={20} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
    marginLeft: 8,
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: "#9ca3af",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});
