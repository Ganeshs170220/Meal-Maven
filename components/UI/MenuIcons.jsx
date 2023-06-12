import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MenuIcons = ({title,name}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={name} size={24} color="black" />
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default MenuIcons;

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
    },
    title:{
      lineHeight:25,
    }
})