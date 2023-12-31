import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { auth } from "../database/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";
import styles from "../styles/Style";

const SignScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlerSingUp = async () => {
    if (
      displayName === "" ||
      email === "" ||
      password === "" ||
      rePassword === ""
    ) {
      setMessageError("Todos los campos son obligatorios");
    } else if (password === rePassword) {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: { user: any }) => {
          userCredential.user;
          navigation.navigate("Home");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              setMessageError("Correo inválido");
              break;
            case "auth/email-already-in-use":
              setMessageError("Correo ya registrado");
              break;
            case "auth/missing-email":
              setMessageError("Correo no ingresado");
              break;
            case "auth/internal-error":
              setMessageError("Ingrese contraseña");
              break;
            default:
              setMessageError(error.message);
              break;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setMessageError("Las contraseñas no coinciden");
    }
  };

  const handlerBack = () => {
    navigation.replace("Inicio");
  };

  const setMessageError = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.image}
      >
        {loading && (
          <View style={styles.spinContainer}>
            <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
          </View>
        )}
        <Image
          source={require("../assets/joystick.png")}
          resizeMode="contain"
          style={styles.logoIndex}
        />

        <View style={styles.inputContainer}>
          {!!message ? (
            <TouchableOpacity
              style={styles.buttonError}
              onPress={() => setMessage("")}
            >
              <Text style={styles.buttonText}>{message}</Text>
            </TouchableOpacity>
          ) : null}

          <TextInput
            placeholder="Nombre"
            value={displayName}
            onChangeText={(text) => setDisplayName(text)}
            placeholderTextColor="#ffff"
            style={styles.input}
          />
          <TextInput
            placeholder="Correo electrónico"
            value={email}
            placeholderTextColor="#ffff"
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />

          <TextInput
            placeholder="Contraseña"
            value={password}
            placeholderTextColor="#ffff"
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            placeholder="Vuelva a escribir la contraseña"
            value={rePassword}
            placeholderTextColor="#ffff"
            onChangeText={(text) => setRePassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlerSingUp} style={[styles.button]}>
            <Text style={styles.buttonText}>Crear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlerBack}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonRegisterText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignScreen;
