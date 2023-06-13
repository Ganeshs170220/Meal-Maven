import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "./components/HomePage";
import LoginScreen from "./components/LoginScreen";
import MenuIcons from "./components/UI/MenuIcons";
import CustomDrawerContent from "./components/UI/CustomDrawerContent";
import Food from "./components/Food";
import { createStackNavigator } from "@react-navigation/stack";
import Egg from "./components/Egg";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Drawer.Navigator
      initialRouteName="Logout"
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name="MealMaven"
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
        name="Logout"
        component={LoginScreen}
        options={{
          title: "Logout",
          drawerIcon: () => <MenuIcons name="exit-to-app" />,
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

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
