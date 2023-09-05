import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
} from "react-native";
import { RootStackParamList } from "../App";
import styles from "../styles/Style";

import { auth } from "../database/firebase";

const EnConstruccionScreen = (ruta) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // async function handlerSignOut() {
  //     await auth
  //         .signOut()
  //         .then(() => {navigation.replace(ruta)})
  //         .catch((error: any) => alert(error.message))
  //         navigation.replace(ruta)
  // }

  function handlerSignOut() {
    if (auth.currentUser?.email === "andreabricenotovar@gmail.com") {
      navigation.replace("HomeSupervisor");
    }
    else {
      navigation.replace(ruta);
    }
    
  }

  return (
    <ImageBackground
      source={require("../assets/fondo.png")}
      resizeMode="repeat"
      style={styles.image}
    >
      <View style={styles.container}>
        <Text style={styles.textHomePequeño}>En construcción...</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlerSignOut} style={styles.button}>
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default EnConstruccionScreen;
