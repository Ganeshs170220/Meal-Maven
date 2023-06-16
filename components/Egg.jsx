import { StyleSheet, Text, View,ScrollView } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { Fragment } from "react";
  
const UserEggDetails = () => {
  const [eggUserDetails, setEggUserDetails] = useState([]);
  useEffect(() => {
    const database = getDatabase();
    const eggUserDetailsRef = ref(database, "userDetails/egg");

    const eggUserDetailsListener = onValue(
     eggUserDetailsRef,
      (snapshot) => {
        const eggUserDetails = snapshot.val();
        if (eggUserDetails) {
          const users = Object.values(eggUserDetails).map(
            (user) => user.egg_user_email
          );
          setEggUserDetails(users);
        } else {
          setEggUserDetails([]);
        }
      }
    );

    return () => {
      off(eggUserDetailsRef, eggUserDetailsListener);
    };
  }, []);

  return (

    <ScrollView style={styles.container}>
      {eggUserDetails.map((user, index) => {
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
    </ScrollView>
  );
};
export default UserEggDetails;


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
