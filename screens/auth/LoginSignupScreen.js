import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { auth, db } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useNavigation } from "@react-navigation/native";

export default function LoginSignupScreen() {
  const navigation = useNavigation();

  const [isLogin, setIsLogin] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("customer");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const isPhone = emailOrPhone.match(/^\+?[0-9]{10,15}$/);

  const handleSendOtp = async () => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const id = await provider.verifyPhoneNumber(
        emailOrPhone,
        recaptchaVerifier.current
      );
      setVerificationId(id);
      Alert.alert("OTP Sent", "Please check your SMS.");
    } catch (error) {
      Alert.alert("OTP Error", error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const result = await signInWithCredential(auth, credential);
      const user = result.user;

      // Save phone user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        userType: userType,
        createdAt: new Date().toISOString(),
      });

      navigation.replace("CustomerHome");
    } catch (error) {
      Alert.alert("OTP Failed", error.message);
    }
  };

  const handleSubmit = async () => {
    if (!emailOrPhone) {
      Alert.alert("Missing Field", "Enter email or phone number");
      return;
    }

    if (isPhone) {
      if (!verificationId) {
        handleSendOtp();
      } else {
        handleVerifyOtp();
      }
    } else {
      if (!password) {
        Alert.alert("Missing Password", "Enter your password");
        return;
      }

      if (!isLogin && password !== confirmPassword) {
        Alert.alert("Passwords don't match");
        return;
      }

      try {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, emailOrPhone, password);
        } else {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            emailOrPhone,
            password
          );
          const user = userCredential.user;

          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            userType: userType,
            createdAt: new Date().toISOString(),
          });
        }

        // Fetch user data
        const user = auth.currentUser;
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.userType === "customer") {
            navigation.replace("CustomerHome");
          } else if (userData.userType === "worker") {
            Alert.alert("Worker screen coming soon!");
          } else {
            Alert.alert("User type not recognized.");
          }
        } else {
          Alert.alert("User document not found.");
        }
      } catch (error) {
        Alert.alert("Firebase Error", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />
      <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email or Phone (+92...)"
        onChangeText={setEmailOrPhone}
        value={emailOrPhone}
        keyboardType="email-address"
      />

      {!isPhone && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry
            />
          )}
        </>
      )}

      {!isLogin && (
        <View style={styles.radioGroup}>
          <TouchableOpacity onPress={() => setUserType("customer")}>
            <Text
              style={
                userType === "customer" ? styles.radioSelected : styles.radio
              }
            >
              👤 Customer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUserType("worker")}>
            <Text
              style={
                userType === "worker" ? styles.radioSelected : styles.radio
              }
            >
              🛠️ Worker
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isPhone && verificationId && (
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isPhone
            ? verificationId
              ? "Verify OTP"
              : "Send OTP"
            : isLogin
            ? "Login"
            : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#FF7A00",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  switchText: {
    marginTop: 15,
    textAlign: "center",
    color: "#FF7A00",
    fontWeight: "bold",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  radio: {
    padding: 10,
    color: "#555",
  },
  radioSelected: {
    padding: 10,
    color: "#FF7A00",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
