import React, { use } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import search from "./reducers/search";
import user from "./reducers/user";
import Icon from "./components/icons";
import WelcomeScreen from "./screens/WelcomeScreen";
import OptionSearchScreen from "./screens/OptionSearchScreen";
import SignInScreen from "./screens/SingInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import CameraScreen from "./screens/CameraScreen";
import DocScreen from "./screens/DocScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ResultScreen from "./screens/ResultScreen";
import HomeCameraScreen from "./screens/HomeCameraScreen";
import SettingsScreen from "./screens/SettingsScreen";
import tabBar from "./components/tabBar";
import headerLeftBtn from "./components/headerLeftBtn";
import PhotoButton from "./components/photoBtn";
import TestScreen from "./screens/TestScreen";
import UserScreen from "./screens/UserScreen";
import { ScreenStackHeaderLeftView } from "react-native-screens";
import { Camera, Settings } from "lucide-react-native";
import { Image } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const reducers = combineReducers({ user, search });
const persistConfig = { key: "isSalad?", storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

// Component that renders the main tab navigation with custom styling and icons
const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#aabd8c",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        },
        headerBackImageSource: headerLeftBtn,
        headerLeft(props) {
          return (
            <Image
              source={{
                uri: "https://res.cloudinary.com/dtaynthro/image/upload/v1755091143/ChatGPT_Image_13_aou%CC%82t_2025_15_18_25_nxdfto.png",
              }}
              style={{
                aspectRatio: 1,
                width: 40,
                borderRadius: 100,
                borderColor: "#ac6139ff",
                borderWidth: 1,
                marginLeft: 15,
                marginBottom: 5,
              }}
            />
          );
        },
        tabBarIcon: ({ color }) => {
          let iconName: string;
          switch (route.name) {
            case "Home":
              iconName = "house";
              break;
            case "Search":
              iconName = "user-plus";
              break;
            case "Doc":
              iconName = "notebook-text";
              break;
            case "Profile":
              iconName = "user";
              break;
            case "Test":
              iconName = "meh";
              break;
            case "TabCamera":
              return null; // Camera button will be handled separately
          }
          return <Icon name={iconName} size={24} color={color} />;
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
          color: "#ac6139ff",
          fontWeight: "bold",
          fontSize: 25,
          fontFamily: "josephin sans",
          letterSpacing: 2,
        },
        headerTitle: "IsSalad?",
      })}
    >
      {/* <Tab.Screen
        name="Test"
        component={TestScreen}
        options={{ 
          // headerShown: false, tabBarButton: () => null, // Hide this tab in the tab bar
          headerRight: () => {
            return (
              <FontAwesome name="cog" size={24} color="#381D2A" onPress={() => navigation.navigate('Settings')} />
            );
          }
        }}
      /> */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Search"
        component={OptionSearchScreen}
        // options={{ headerLeft: false }}
      />
      <Tab.Screen
        name="TabCamera"
        component={HomeCameraScreen}
        options={{
          tabBarButton: () => {
            return (
              <TouchableOpacity
                style={{
                  bottom: 20,
                  width: 60,
                  height: 60,
                  backgroundColor: "#f39b6d",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                }}
                onPress={() => navigation.navigate("Camera")}
              >
                <Camera size={24} color="#381D2A" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name="Doc"
        component={DocScreen}
        // options={{ headerLeft: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{ marginRight: 20, marginBottom: 5 }}
                onPress={() => navigation.navigate("Settings")}
              >
                <Settings size={24} color="#381d2a" />
              </TouchableOpacity>
            );
          },
        }}
      />
      {/* Add other tabs here if needed */}
    </Tab.Navigator>
  );
};

// Main app component that sets up Redux store, navigation, and screen stack
export default function App({ navigation }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                headerShown: true,
                headerBackVisible: true,
                headerStyle: { backgroundColor: "#aabd8c" },
                headerTitleStyle: { color: "transparent" },
                headerTintColor: "#381d2aff",
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen
              name="UserScreen"
              component={UserScreen}
              options={{
                headerShown: true,
                headerBackVisible: true,
                headerStyle: { backgroundColor: "#aabd8c" },
                headerTitleStyle: { color: "transparent" },
                headerTintColor: "#381d2aff",
                headerBackTitleVisible: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
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
