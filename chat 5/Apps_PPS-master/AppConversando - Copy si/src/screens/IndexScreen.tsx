import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
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
import Spinner from "react-native-loading-spinner-overlay";
const IndexScreen = () => {
  const [loading, setLoading] = useState(false);

  const handlerSingIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace("Login");
    }, 2000);
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlerSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace("SignUp");
    }, 2000);
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      resizeMode="repeat"
      style={styles.image}
    >
      <View style={styles.container}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={"CArgando..."}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
          children={
            <Image
              source={require("../../assets/cargando.gif")}
              style={{
                top: "45%",
                left: "25%",
              }}
              resizeMode="contain"
            />
          }
        />
        <Image
          source={require("../../assets/icon.png")}
          resizeMode="contain"
          style={styles.logo}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlerSingIn} style={styles.button}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlerSignUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default IndexScreen;
