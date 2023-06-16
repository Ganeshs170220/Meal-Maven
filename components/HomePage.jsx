import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View ,Dimensions} from "react-native";
import { Fragment } from "react";
import { CheckBox } from "react-native-elements";
import { Button } from "react-native-elements";
import Data from "./UI/Data";
import { app, auth } from "../firebase";
import { getDatabase, ref, onValue, off, set, get } from "firebase/database";
import { SafeAreaProvider } from 'react-native-safe-area-context';
const database = getDatabase(app);

const MyCheckbox = ({ title, checked, onPress, disabled }) => {
  return (
    <View style={styles.checkbox}>
      <CheckBox
        title={title}
        checked={checked}
        onPress={onPress}
        disabled={disabled}
        containerStyle={{
          backgroundColor: "transparent",
          borderWidth: 0,
          borderColor: "transparent",
        }}
        textStyle={{ fontSize: 20, fontWeight: 100 }}
      />
    </View>
  );
};

const HomePage = () => {
  

  const [isLunchChecked, setIsLunchChecked] = useState(false);
  const [isEggChecked, setIsEggChecked] = useState(false);
  const [totalLunch, setTotalLunch] = useState(0);
  const [totalEgg, setTotalEgg] = useState(0);
  const [guest, setGuest] = useState(0);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [updatefood, setUpdateFood] = useState(false);
  const [lunchUserDetails, setLunchUserDetails] = useState(null);
  const [eggUserDetails, setEggUserDetails] = useState(null);

  useEffect(() => {
    const database = getDatabase(app);

    const totalLunchRef = ref(database, "totalLunch");
    const totalEggRef = ref(database, "totalEgg");

    const totalLunchListener = onValue(totalLunchRef, (snapshot) => {
      const lunchData = snapshot.val();
      setTotalLunch(lunchData);
    });

    const totalEggListener = onValue(totalEggRef, (snapshot) => {
      const eggData = snapshot.val();
      setTotalEgg(eggData);
    });

    const resetCountsAtMidnight = () => {
      const currentDate = new Date();
      const currentHours = currentDate.getHours();
      const currentMinutes = currentDate.getMinutes();

      if (currentHours === 0 && currentMinutes === 0) {
        const totalEggRef = ref(database, "totalEgg");
        set(totalEggRef, 0);
        const totalLunchRef = ref(database, "totalLunch");
        set(totalLunchRef, 0);
      }
    };

    // Check for midnight reset every minute
    const interval = setInterval(resetCountsAtMidnight, 60000);

    return () => {
      off(totalLunchRef, totalLunchListener);
      off(totalEggRef, totalEggListener);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const database = getDatabase(app);

    const lunchSubmittedRef = ref(
      database,
      `userDetails/lunch/${auth.currentUser.uid}`
    );
    const eggSubmittedRef = ref(
      database,
      `userDetails/egg/${auth.currentUser.uid}`
    );

    get(lunchSubmittedRef)
      .then((lunchSubmittedSnapshot) => {
        if (lunchSubmittedSnapshot.exists()) {
          setIsLunchChecked(true);
          setLunchUserDetails(lunchSubmittedSnapshot.val());
        }
      })
      .catch((error) => {
        console.error("Error getting lunch submission:", error);
      });

    get(eggSubmittedRef)
      .then((eggSubmittedSnapshot) => {
        if (eggSubmittedSnapshot.exists()) {
          setIsEggChecked(true);
          setEggUserDetails(eggSubmittedSnapshot.val());
        }
      })
      .catch((error) => {
        console.error("Error getting egg submission:", error);
      });
  }, []);
  // date started
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const options = { day: "numeric", month: "numeric", year: "numeric" };
  const dateParts = currentDateTime
    .toLocaleDateString(undefined, options)
    .split("/");
  const formattedDate = `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`;
  // date ended

  const handleCheckboxToggleLunch = () => {
    if (!lunchUserDetails && !buttonPressed) {
      setIsLunchChecked(!isLunchChecked);
    }
  };

  const handleCheckboxToggleEgg = () => {
    if (!eggUserDetails && !buttonPressed) {
      setIsEggChecked(!isEggChecked);
    }
  };

  const handleButtonPress = () => {
    if (!isLunchChecked && !isEggChecked) {
      return;
    }

    if (isLunchChecked && !lunchUserDetails) {
      const updatedUserDetails = {
        lunch_user_email: auth.currentUser.email,
      };
      set(
        ref(database, `userDetails/lunch/${auth.currentUser.uid}`),
        updatedUserDetails
      );
      console.log("Lunch Submitted by:", auth.currentUser.email);

      const totalLunchRef = ref(database, "totalLunch");
      set(totalLunchRef, totalLunch + 1);
    }

    if (isEggChecked && !eggUserDetails) {
      const updatedUserDetails = {
        egg_user_email: auth.currentUser.email,
      };
      set(
        ref(database, `userDetails/egg/${auth.currentUser.uid}`),
        updatedUserDetails
      );
      console.log("Egg Submitted by:", auth.currentUser.email);

      const totalEggRef = ref(database, "totalEgg");
      set(totalEggRef, totalEgg + 1);
    }

    setUpdateFood(true);
    setButtonPressed(true);
  };

  return (
    <Fragment>
      <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.title}>
          <Text style={{ color: "white" }}>Meal</Text>
          <Text style={{ color: "#CD1818" }}> Maven</Text>
        </Text>
        <View style={styles.checkboxcontainer}>
          <MyCheckbox
            title="Lunch"
            onPress={handleCheckboxToggleLunch}
            checked={isLunchChecked}
            disabled={
              buttonPressed ||
              lunchUserDetails ||
              (eggUserDetails && !lunchUserDetails)
            }
          />

          <MyCheckbox
            title="Egg"
            onPress={handleCheckboxToggleEgg}
            checked={isEggChecked}
            disabled={
              buttonPressed ||
              lunchUserDetails ||
              (eggUserDetails && !lunchUserDetails)
            }
          />
        </View>
        <View style={styles.lunchupdate}>
          <Text style={styles.lunchUpdateText}>Update Lunch</Text>
          <View>
            <Button
              title="Yes"
              onPress={handleButtonPress}
              disabled={
                (isLunchChecked && lunchUserDetails) ||
                (isEggChecked && eggUserDetails) ||
                buttonPressed
              }
              buttonStyle={{
                backgroundColor: "#0D4C92",
                borderRadius: 10,
                padding: 10,
                width: 50,
              }}
              titleStyle={{
                color: "white",
                fontSize: 15,
              }}
            />
          </View>
        </View>
        <View style={styles.datacontainer}>
          <View style={{ paddingBottom: 15 }}>
            <Data title="Total food quantity" value={formattedDate} />
          </View>
          <Data
            title="Total Lunch"
            value={totalLunch}
            names="arrow-right"
            Userdetails={"Food"}
          />
          <Data
            title="Total Eggs"
            value={totalEgg}
            names="arrow-right"
            Userdetails={"Egg"}
          />
          <View style={styles.data}>
            <Text style={{ fontSize: 19 }}>Guest</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontSize: 19 }}>{guest}</Text>
            </View>
          </View>
        </View>
        <View style={styles.finalmealdata}>
          <Text style={styles.finalMealTextData}>
            Meal quantity( {totalLunch} + {guest} x 1.0) ={" "}
            {(totalLunch + guest) * 1.0}
          </Text>
        </View>

        <View style={styles.footer}>
          {(isLunchChecked && lunchUserDetails) ||
                (isEggChecked && eggUserDetails) ||
                buttonPressed ? (
            <Text style={styles.footerText}>Successfully updated 🤗😘 </Text>
          ) : (
            <Text style={styles.footerText}>
              You have to update the food 🍲😋
            </Text>
          )}
        </View>
      </View></SafeAreaProvider>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingTop: 40,
    backgroundColor: "#181818",
    paddingVertical: 15,
    color: "black",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    elevation: 10,
    shadowColor: "black",
  },
  checkboxcontainer: {
    marginTop: 50,
    height: 150,
    paddingTop: 20,
    width: "50%",
    backgroundColor: "white",
    alignSelf: "center",
    elevation: 15,
    shadowColor: "#00E7FF",
    paddingLeft: 25,
  },
  lunchupdate: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 10,
    backgroundColor: "#CFF5E7",
    marginTop: 50,
    marginHorizontal: 5,
    elevation: 5,
    shadowColor: "#00E7FF",
  },
  lunchUpdateText: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 40,
    paddingRight: 20,
    paddingLeft: 20,
  },
  datacontainer: {
    paddingTop: 40,
    paddingHorizontal: 5,
  },
  finalmealdata: {
    marginTop: 40,
    marginHorizontal: 5,
    backgroundColor: "#00E7FF",
    padding: 10,
    alignItems: "center",
  },
  finalMealTextData: {
    fontSize: 18,
  },
  footer: {
    marginTop: 20,
    marginHorizontal: 5,
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical: 10,
    borderRadius: 5,
  },
  footerText: {
    fontSize: 20,
    color: "red",
  },
  data: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 24,
  },
});

export default HomePage;
