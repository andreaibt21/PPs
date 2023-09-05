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
import styles from "../styles/Style";
import { signInWithEmailAndPassword } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { Slider, Box, Center, NativeBaseProvider } from "native-base";

export let admin = false;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [onChangeEndValue, setOnChangeEndValue] = useState(0);

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
        console.log(error);
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/user-not-found":
          case "auth/wrong-password":
          case "auth/internal-error":
          case "auth/too-many-requests":
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

  const adminLogin = () => {
    setEmail("admin@admin.com");
    setPassword("111111");
  };
  const guestLogin = () => {
    setEmail("invitado@invitado.com");
    setPassword("222222");
  };

  const supplierLogin = () => {
    setEmail("usuario@usuario.com");
    setPassword("333333");
  };
  const anonimoLogin = () => {
    setEmail("anonimo@anonimo.com");
    setPassword("444444");
  };
  const testerLogin = () => {
    setEmail("tester@tester.com");
    setPassword("555555");
  };

  switch (onChangeEndValue) {
    case 0:
      setOnChangeEndValue(-1);
      setEmail("");
      setPassword("");
      break;
    case 1:
      setOnChangeEndValue(-1);

      adminLogin();
      break;
    case 2:
      setOnChangeEndValue(-1);

      guestLogin();

      break;
    case 3:
      setOnChangeEndValue(-1);

      supplierLogin();
      break;
    case 4:
      setOnChangeEndValue(-1);

      anonimoLogin();
      break;
    case 5:
      setOnChangeEndValue(-1);
      testerLogin();
      break;
  }
  const handlerBack = () => {
    navigation.replace("Inicio");
  };

  return (
    <ImageBackground
      source={require("../../assets/fondoC.png")}
      resizeMode="repeat"
      style={styles.image}
    >
      <View style={styles.container}>
        {loading && (
          <View style={styles.spinContainer}>
            <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
          </View>
        )}
        <Image
          source={require("../assets/qr.png")}
          resizeMode="contain"
          style={styles.logoHome}
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
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />

          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            width: 200,
            textAlign: "center",
            marginTop: 15,
            color: "#016939",

            fontWeight: "bold",
          }}
        >
          Seleccione un usuario en la entrada de rango que está abajo:
        </Text>
        <Slider
          size="lg"
          margin={5}
          w="3/4"
          maxW="300"
          defaultValue={0}
          minValue={0}
          maxValue={5}
          accessibilityLabel="hello world"
          step={1}
          colorScheme="emerald"
          onChangeEnd={(v) => {
            v && setOnChangeEndValue(Math.floor(v));
          }}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlerLogin} style={styles.buttonLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlerBack}
            style={[styles.buttonLogin, styles.buttonOutlineLogin]}
          >
            <Text style={styles.buttonOutlineText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
export default LoginScreen;
