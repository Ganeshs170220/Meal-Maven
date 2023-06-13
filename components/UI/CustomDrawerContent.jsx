import React from "react";
import { View, Image, StyleSheet, Text, Linking } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import MenuIcons from "./MenuIcons";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const PlaceholderImage = require("../../assets/logo.png");

const CustomDrawerContent = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const handleCustomLinkPress = () => {
    const url = "https://easycloud.in";
    Linking.openURL(url);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const umail = user.email;
      setUserEmail(umail);
    } else {
      console.log("user signedout");
    }
  });

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image source={PlaceholderImage} style={styles.logo} />
        </View>
        <Text style={styles.usermail}>{userEmail}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Powered by EasyCloud"
        onPress={handleCustomLinkPress}
        icon={() => <MenuIcons name="domain" />}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "flex-end",
  },
  contentContainer: {
    paddingTop: 40,
  },
  usermail: {
    // backgroundColor:'black',
    color: "white",
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  logoWrapper: {
    marginLeft: 20,
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 75,
    overflow: "hidden",
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default CustomDrawerContent;
