import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function UserTypeSelectScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("EmailAuth", { userType: "customer" })
        }
      >
        <Text style={styles.buttonText}>I am a Customer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EmailAuth", { userType: "worker" })}
      >
        <Text style={styles.buttonText}>I am a Worker</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 30 },
  button: {
    backgroundColor: "#FF7A00",
    padding: 15,
    marginVertical: 10,
    width: 200,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16 },
});
