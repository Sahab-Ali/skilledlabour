import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const workers = [
  {
    id: "1",
    name: "Electrician",
    rating: "4.8",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Maryam",
    rating: "4.7",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "Nawaz Shareef",
    rating: "4.7",
    // for import image from assets
    image: require("../../assets/img4.webp"),
  },
];

const BottomTab = () => (
  <View style={styles.tabBar}>
    <TouchableOpacity style={styles.tabItem}>
      <Ionicons name="home" size={24} color="#6A5AE0" />
      <Text style={styles.tabLabel}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.tabItem}>
      <Ionicons name="calendar" size={24} color="#A0A0A0" />
      <Text style={styles.tabLabelInactive}>Bookings</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.tabItem}>
      <Ionicons name="chatbubble-ellipses" size={24} color="#A0A0A0" />
      <Text style={styles.tabLabelInactive}>Messages</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.tabItem}>
      <Ionicons name="person" size={24} color="#A0A0A0" />
      <Text style={styles.tabLabelInactive}>Profile</Text>
    </TouchableOpacity>
  </View>
);

export default function CustomerHomeScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout failed", error.message);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={handleLogout}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="log-out-outline" size={22} color="#FF7A00" />
          {/* <Text style={{ color: "#FF7A00", marginLeft: 5 }}>Logout</Text> */}
        </TouchableOpacity>
        <Text style={styles.greeting}>Skilled Labour</Text>
      </View>

      <View style={styles.searchBox}>
        <Ionicons
          name="search"
          size={20}
          color="#fff"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search for plumber, electrician..."
          placeholderTextColor="#fff"
          style={styles.searchInput}
        />
      </View>

      <Image source={require("../../assets/map.png")} style={styles.mapImage} />

      <TouchableOpacity style={styles.localBtnCentered}>
        <Text style={styles.localBtnText}>Find Local Labour</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={workers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.workerCard}>
            <Image
              source={
                typeof item.image === "string"
                  ? { uri: item.image }
                  : item.image
              }
              style={styles.workerImage}
            />
            <View style={styles.workerInfo}>
              <Text style={styles.workerName}>{item.name}</Text>
              <View style={styles.ratingRow}>
                <MaterialIcons name="star" size={16} color="#f1c40f" />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bookNowBtn}>
              <Text style={styles.bookNowText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.content}
      />
      <BottomTab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20, paddingBottom: 90 },
  headerContent: {
    justifyContent: "center",
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 60,
    marginRight: 95,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A5AE0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    width: "100%",
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: "#fff", fontSize: 16 },
  mapImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  localBtnCentered: {
    backgroundColor: "#6A5AE0",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    alignSelf: "center",
    width: "60%",
  },
  localBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  workerCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  workerImage: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  workerInfo: { flex: 1 },
  workerName: { fontSize: 16, fontWeight: "600" },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  rating: { marginLeft: 4, fontSize: 14 },
  bookNowBtn: {
    backgroundColor: "#6A5AE0",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  bookNowText: { color: "#fff", fontWeight: "bold" },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  tabItem: { alignItems: "center" },
  tabLabel: { color: "#6A5AE0", fontSize: 12, marginTop: 4 },
  tabLabelInactive: { color: "#A0A0A0", fontSize: 12, marginTop: 4 },
});
