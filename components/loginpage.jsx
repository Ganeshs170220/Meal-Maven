import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Fragment } from "react";
import { Image } from "react-native";
const PlaceholderImage = require("./assets/1.gif");

const HomePage = () => {
  return (
    <Fragment>
      <View style={styles.container}>
        <StatusBar style="light-content" />
        <Text style={styles.title}>
          <Text style={{ color: "#CD1818" }}>Meal</Text>
          <Text style={{ color: "#0C134F" }}> Maven</Text>
        </Text>
      <View  style={styles.imageView}>
        <Image source={PlaceholderImage} style={styles.image} /></View>
      </View>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    color: "black",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  image:{
    width:220,
    height:220,
  },
  imageView:{
    paddingTop:20,
    alignItems:'center',
  }
});

export default HomePage;
