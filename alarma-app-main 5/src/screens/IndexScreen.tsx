import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import styles from "../styles/Style";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const IndexScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlerSignUp = () => {
    navigation.replace("SignUp");
  };

  const handlerSingIn = () => {
    navigation.replace("Login");
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/icon.png")}
          resizeMode="contain"
          style={styles.logoIndex}
        />

        <View style={styles.buttonContainerIndex}>
          <TouchableOpacity onPress={handlerSingIn} style={styles.button}>
          <Text style={styles.buttonText}>Iniciar
             </Text> 
          <Text style={styles.buttonText}>
             Sesión
             </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlerSignUp}
            style={[styles.button, styles.buttonOutline2]}
          >
            <Text style={styles.buttonOutlineText}>
            Crear 
            </Text>   
            <Text style={styles.buttonOutlineText}>
            cuenta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default IndexScreen;
