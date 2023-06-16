import React from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "./components/HomePage";
import LoginScreen from "./components/LoginScreen";
import MenuIcons from "./components/UI/MenuIcons";
import CustomDrawerContent from "./components/UI/CustomDrawerContent";
import Food from "./components/Food";
import { createStackNavigator } from "@react-navigation/stack";
import Feedback from "./components/Feedback";
import Egg from "./components/Egg";
import "firebase/auth";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Root = (props) => {

  const handleLogout = () => {
    // Perform logout logic here
    // For example, calling a signOut method from Firebase auth
    auth
      .signOut()
      .then(() => {
        props.navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Drawer.Navigator
      initialRouteName="LoginScreen"
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name="HomePage"
        component={HomePage}
        options={{
          title: "Home",
          drawerIcon: () => <MenuIcons name="home" />,
          headerTitle: null,
          headerStyle: { height: 0 },
          headerTintColor: "white",
        }}
      />
      <Drawer.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={() => ({
          drawerIcon: () => (
            <TouchableOpacity onPress={() => handleLogout()}>
              <MenuIcons name="exit-to-app" />
            </TouchableOpacity>
          ),
          drawerLabel: () => (
            <TouchableOpacity
              onPress={() => {
                handleLogout();
              }}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          ),
          title: "Logout",
          headerShown: false,
        })}
      />
       <Drawer.Screen
        name="FeedBack"
        component={Feedback}
        options={{
          title: "Food Feedback",
          drawerIcon: () => <MenuIcons name="comment-text-outline" />,
          headerTitle: null,
          headerStyle: { height: 0 },
          headerTintColor: "white",
        }}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#181818" />
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Food" component={Food} />
        <Stack.Screen name="Egg" component={Egg} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
