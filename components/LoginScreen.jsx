import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const PlaceholderImage = require("../assets/1.gif");

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const handleLogin = () => {
    // Perform login logic here
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredintial) => {
        const user = userCredintial.user;
        console.log("loggedin with:", user.email);
        navigation.navigate("MealMaven");
      })
      .catch((error) => alert(error.message));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={{ color: "#0C134F" }}>Meal</Text>
        <Text style={{ color: "#CD1818" }}> Maven</Text>
      </Text>
      <View style={styles.imageView}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>

      <View style={styles.inputComponents}>
        <TextInput
          keyboardType="email-address"
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIconContainer}
          >
            <MaterialCommunityIcons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <Button title="Login" onPress={handleLogin} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  title: {
    color: "black",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  image: {
    marginTop: 40,
    width: 150,
    height: 150,
  },
  imageView: {
    paddingTop: 20,
    alignItems: "center",
  },
  inputComponents: {
    alignItems: "center",
    marginTop: 50,
  },
  passwordInputContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
  },
  eyeIconContainer: {
    padding: 8,
  },
});

export default LoginScreen;
