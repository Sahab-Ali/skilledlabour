import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Image source={require('../../assets/images/logo.png')} style={styles.logo} /> */}

      <Text style={styles.title}>Welcome to Skilled Labour</Text>
      <TouchableOpacity
        style={styles.button} // 🔧 Add this
        // onPress={() => navigation.navigate("LoginSignup")}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login / Signup</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PhoneAuth")}
      >
        <Text style={styles.buttonText}>Login with Phone</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EmailAuth")}
      >
        <Text style={styles.buttonText}>Login with Email</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate("UserTypeSelect")}
      >
        <Text style={styles.secondaryText}>Create a New Account</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#FF7A00",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FF7A00",
  },
  secondaryText: {
    color: "#FF7A00",
    fontSize: 15,
  },
});
