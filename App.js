import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "./components/HomePage";
import LoginScreen from "./components/LoginScreen";
import MenuIcons from "./components/UI/MenuIcons";
import CustomDrawerContent from "./components/UI/CustomDrawerContent";
const Drawer = createDrawerNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#181818" />
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
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({});
export default App;
