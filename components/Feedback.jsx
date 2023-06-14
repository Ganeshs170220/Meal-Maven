import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Feedback = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={{ color: "white" }}>Meal</Text>
        <Text style={{ color: "#CD1818" }}> Maven</Text>
      </Text>
    </View>
  )
}

export default Feedback;

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
})