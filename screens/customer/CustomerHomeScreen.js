import React, { useLayoutEffect } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Optional for icon

export default function CustomerHomeScreen() {
  const navigation = useNavigation();

  // Add Logout button in header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={handleLogout}
          style={{ marginLeft: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="log-out-outline" size={22} color="#FF7A00" />
          <Text style={{ color: "#FF7A00", marginLeft: 5 }}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login"); // Go back to login screen
    } catch (error) {
      console.error("Logout failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome, Customer 👋</Text>
      <Text>You can now search for nearby workers.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
