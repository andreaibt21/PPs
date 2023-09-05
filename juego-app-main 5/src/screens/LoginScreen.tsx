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
import {
  Menu,
  Button,
  VStack,
  Select,
  CheckIcon,
  Center,
  NativeBaseProvider,
} from "native-base";

const LoginScreen = () => {
  const [shouldOverlapWithTrigger] = React.useState(false);

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
        navigation.navigate("Home");
      })
      .catch((error) => {
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
        console.log(error);
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

  const handlerBack = () => {
    navigation.replace("Inicio");
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
            placeholder="Correo electrónico"
            placeholderTextColor="#ffff"
            value={email}
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
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlerLogin} style={styles.button}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlerBack}
            style={[styles.buttonOutline]}
          >
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonAccessContainer}>
          <Menu
            w="160"
            shouldOverlapWithTrigger={shouldOverlapWithTrigger}
            placement="top"
            trigger={(triggerProps) => {
              return (
                <Button
                  alignSelf="center"
                  variant="solid"
                  {...triggerProps}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}> Selecciona un usuario</Text>
                </Button>
              );
            }}
          >
            <Menu.Item onPress={adminLogin}>Administrador</Menu.Item>
            <Menu.Item onPress={guestLogin}>Invitado</Menu.Item>
            <Menu.Item onPress={supplierLogin}>Usuario</Menu.Item>
            <Menu.Item onPress={anonimoLogin}>Anónimo</Menu.Item>
            <Menu.Item onPress={testerLogin}>Tester</Menu.Item>
          </Menu>
        </View>
      </ImageBackground>
    </View>
  );
};
export default LoginScreen;
