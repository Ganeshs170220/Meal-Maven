import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fragment } from "react";

const UserUpdateDetailsDisplay = () => {
  return (
    <Fragment>
        <View style={styles.container}>
          <View style={styles.data}>
            <Text style={styles.userProfile}>ga</Text>
            <Text style={styles.userdata}>ganeshguntuku2002@gmail.com</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.data}>
            <Text style={styles.userProfile}>ga</Text>
            <Text style={styles.userdata}>ganeshguntuku2002@gmail.com</Text>
          </View>
        </View>
    </Fragment>
  );
};

export default UserUpdateDetailsDisplay;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#D2E9E9",
    paddingVertical: 10,
    marginBottom: 2,
  },
  userProfile: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  userdata: {
    lineHeight: 40,
    fontSize: 15,
  },
  data: {
    display: "flex",
    flexDirection: "row",
  },
});
