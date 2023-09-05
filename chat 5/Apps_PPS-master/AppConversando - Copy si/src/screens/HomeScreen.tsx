import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { RootStackParamList } from "../../App";
import { auth } from "../database/firebase";
import styles from "../styles/Style";
import Spinner from "react-native-loading-spinner-overlay";

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  async function handlerSingOut() {
    await auth
      .signOut()
      .then(() => {
        navigation.replace("Inicio");
      })
      .catch((error: any) => alert(error.message));
  }
  function handlerRoomA() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      navigation.replace("ChatA");
    }, 2000);
  }
  function handlerRoomB() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace("ChatB");
    }, 2000);
  }

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handlerRoomA}
            style={[styles.buttonHome, styles.buttonOutline]}
          >
            <Image
              source={require("../assets/4a.png")}
              resizeMode="contain"
              style={styles.logoHome}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlerRoomB}
            style={[styles.buttonHome, styles.buttonOutlineRole]}
          >
            <Image
              source={require("../assets/4b.png")}
              resizeMode="contain"
              style={styles.logoHome}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlerSingOut}
            style={[styles.button, styles.buttonOutline]}
          >
            <View>
              <Text style={styles.buttonOutlineText}>Cerrar Sesión</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
