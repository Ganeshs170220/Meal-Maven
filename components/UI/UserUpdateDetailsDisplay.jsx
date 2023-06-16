import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";

const UserUpdateDetailsDisplay = () => {
  // const [lunchUserDetails, setLunchUserDetails] = useState([]);
  // useEffect(() => {
  //   const database = getDatabase();
  //   const lunchUserDetailsRef = ref(database, "userDetails/lunch");

  //   const lunchUserDetailsListener = onValue(
  //     lunchUserDetailsRef,
  //     (snapshot) => {
  //       const lunchUserDetails = snapshot.val();
  //       if (lunchUserDetails) {
  //         const users = Object.values(lunchUserDetails).map(
  //           (user) => user.lunch_user_email
  //         );
  //         setLunchUserDetails(users);
  //       } else {
  //         setLunchUserDetails([]);
  //       }
  //     }
  //   );

  //   return () => {
  //     off(lunchUserDetailsRef, lunchUserDetailsListener);
  //   };
  // }, []);

  return (
    <Fragment>
      <View style={styles.container}>
        {lunchUserDetails.map((user, index) => {
          let c1 = "";
          let c2 = "";
          if (user.length >= 2) {
            c1 = user[0].trim();
            c2 = user[1].trim();
          }
          return (
            <View style={styles.dataContainer} key={index}>
              <View style={styles.data}>
                <Text style={styles.userProfile}>{`${c1}${c2}`}</Text>
                <Text style={styles.userdata}>{user}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </Fragment>
  );
};

export default UserUpdateDetailsDisplay;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 2,
  },
  userProfile: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 100,
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
  dataContainer: {
    // marginBottom: 10,
    paddingVertical: 10,
    marginBottom: 2,
    backgroundColor: "#D2E9E9",
  },
});
