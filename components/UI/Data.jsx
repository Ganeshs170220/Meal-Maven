import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Data = ({ title, value, names, Userdetails }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.data}>
      <Text style={{ fontSize: 19 }}>{title}</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ fontSize: 19 }}>{value}</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Userdetails);
          }}
          style={styles.button}
        >
          <Icon style={{ marginTop: 2 }} name={names} size={24} color="black" />
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default Data;

const styles = StyleSheet.create({
  data: {
    paddingBottom: 13,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
