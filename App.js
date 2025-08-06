import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SignInScreen from "./screens/SingInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import CameraScreen from "./screens/CameraScreen";
import DocScreen from "./screens/DocScreen";
import ProfileScreen from "./screens/ProfileScreen";
import tabBar from "./components/tabBar";
import headerLeftBtn from "./components/headerLeftBtn";
import PhotoButton from "./components/photoBtn";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: "#aabd8c",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      },
      tabBarIcon: ({ color }) => {
        let iconName;
        switch (route.name) {
          case "Home":
            iconName =  "home";
            break;
          case "Search":
            iconName = "search";
            break;
          case "Doc":
            iconName = "book";
            break;
          case "Profile":
            iconName = "user";
            break;
          case "Camera":
            return null; // Camera button will be handled separately
        }
        return <FontAwesome name={iconName} size={24} color={color} />;
      },
      tabBarActiveTintColor: "#ac6139ff",
      tabBarInactiveTintColor: "#381D2A",
      tabBarShowLabel: false,
      headerShown: true,
      headerStyle: {
        backgroundColor: "#aabd8c",
        height: 90,
      },
      headerTitleStyle: {
        color: "transparent",
      },
    })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerLeft: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerLeft: false }} />
      <Tab.Screen name="Camera" component={CameraScreen} options={{ tabBarButton: (props) => (<PhotoButton {...props} />) }} />
      <Tab.Screen name="Doc" component={DocScreen} options={{ headerLeft: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerLeft: false }} />
      {/* Add other tabs here if needed */}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
