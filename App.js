import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from 'react-native';
import { Fragment } from "react";
import HomePage from './components/HomePage';
import {NavigationContainer} from '@react-navigation/native';
import Data from "./components/UI/Data";

const App = () => {
  return (
    <NavigationContainer>
       <StatusBar style="light" backgroundColor="black"/>
      <View style={styles.container}>
        <HomePage/>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:40,
  }
});

export default App;


