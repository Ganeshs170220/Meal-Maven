import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React, { Fragment } from "react";
import { Icon } from "react-native-elements";

const Data = (props) => {
  return (
    <Fragment>
      <View style={styles.data}>
        <Text style={{ fontSize: 19 }}>{props.title}</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ fontSize: 19 }}>{props.value}</Text>
          <TouchableOpacity style={styles.button}>
            <Icon
              style={{ marginTop: 2 }}
              name={props.name}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
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
