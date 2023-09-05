import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { auth } from "../database/firebase";
import styles from "../styles/Style";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlerLogin = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: { user: any }) => {
        const user = userCredential.user;
        console.log("Logged in with", user.email);
        navigation.replace("Home");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/user-not-found":
          case "auth/wrong-password":
          case "auth/internal-error":
          case "auth/too-many-requests":
            console.log(error.code);
            setMessageError("Credenciales inválidas");
            break;
          default:
            setMessageError(error.message);
            break;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setMessageError = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const guestLogin = () => {
    setEmail("invitado@invitado.com");
    setPassword("222222");
  };

  const adminLogin = () => {
    setEmail("admin@admin.com");
    setPassword("111111");
  };

  const usuarioLogin = () => {
    setEmail("usuario@usuario.com");
    setPassword("333333");
  };

  const handlerBack = () => {
    navigation.replace("Inicio");
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        {loading && (
          <View style={styles.spinContainer}>
            <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
          </View>
        )}
        <Image
          source={require("../../assets/icon.png")}
          resizeMode="contain"
          style={styles.logoLogin}
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
            placeholder="Correo electrónico"
            value={email}
            placeholderTextColor="white"
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />

          <TextInput
            placeholder="Contraseña"
            value={password}
            placeholderTextColor="white"
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlerLogin} style={styles.buttonLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlerBack}
            style={[styles.buttonLogin, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Text style={styles.seleccione}>Seleccione un usuario: </Text>

          <TouchableOpacity
            onPress={adminLogin}
            style={[styles.buttonRole, styles.buttonOutlineRole]}
          >
            <Text style={styles.buttonText}>Administrador</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={guestLogin}
            style={[styles.buttonRole, styles.buttonOutlineRole]}
          >
            <Text style={styles.buttonText}>Invitado</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={usuarioLogin}
            style={[styles.buttonRole, styles.buttonOutlineRole]}
          >
            <Text style={styles.buttonText}>Usuario</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
export default LoginScreen;
