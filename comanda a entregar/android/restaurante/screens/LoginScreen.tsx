import { useFocusEffect, useNavigation } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  Pressable,
  Modal,
  StyleSheet,
  Vibration,
} from "react-native";
import { auth, db } from "../database/firebase";
import styles from "../styles/Style";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithEmailLink,
} from "firebase/auth";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
//import Spinner from "react-native-loading-spinner-overlay/lib";
import Spinner from "../utils/SpinnerUtil";
import { collection, getDocs, query, where } from "firebase/firestore";
import Toast from "react-native-simple-toast";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import insertarToast from "../utils/ToastUtil";
import { parseJSON } from "date-fns/esm";
import ErrorModal from "./ErrorModal";

export let admin = false;
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [rol, setRol] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [isModalSpinnerVisible, setModalSpinnerVisible] = useState(false);

  //para el login con google
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const loginManager = async (userMail) => {
    const q = query(collection(db, "userInfo"), where("email", "==", userMail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setRol(doc.data().rol);
    });

    if (querySnapshot.size == 0) {
      insertarToast("USUARIO NO ENCONTRADO");
      Vibration.vibrate(1000);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      console.log(rol);
      Redireccionador(rol);
    }, [rol])
  );

  const Redireccionador = async (rol) => {
    let banderaSentado = false;
    let banderaEliminado = false;

    try {
      if (rol == "clienteRegistrado" || rol == "clienteAnonimo") {
        const q = query(
          collection(db, "userInfo"),
          where("email", "==", auth.currentUser?.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          if (doc.data().clientStatus == "Sentado") {
            banderaSentado = true;
          }
          if (doc.data().clientStatus == "Eliminado") {
            insertarToast("Credenciales Inválidas");
            banderaEliminado = true;
            Vibration.vibrate(5000);
          }
        });
      }
    } catch (error) {
      Vibration.vibrate(5000);
    }

    if (rol === "Dueño") {
      setLoading(true);
      navigation.replace("HomeDuenio");
      setLoading(false);
    } else if (rol === "Supervisor") {
      navigation.replace("HomeSupervisor");
    } else if (rol === "Mozo") {
      navigation.replace("HomeMozo");
    } else if (rol === "Bartender" || rol === "Cocinero") {
      navigation.replace("HomeCocinaBar");
    } else if (rol === "Metre") {
      navigation.replace("HomeMetre");
    } else if (
      rol === "clienteRegistrado" &&
      banderaSentado &&
      banderaEliminado == false
    ) {
      navigation.replace("HomeClientePrincipal");
    } else if (
      rol === "clienteRegistrado" &&
      banderaSentado == false &&
      banderaEliminado == false
    ) {
      navigation.replace("HomeCliente");
    } else if (rol === "clienteAnonimo" && banderaSentado) {
      console.log("rol === clienteAnonimo && banderaSentado");
      navigation.replace("HomeClientePrincipal");
    } else if (rol === "clienteAnonimo" && banderaSentado == false) {
      console.log("rol === clienteAnonimo && banderaSentado == false");
      navigation.replace("HomeCliente");
    }
  };

  const handlerLogin = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: { user: any }) => {
        console.log(password);
        const user = userCredential.user;
        console.log("Logged in with", user.email);
        if (email === "altacomanda@gmail.com" && password === "Comanda123") {
          setLoading(true);
          navigation.replace("HomeDuenio");
          setLoading(false);
        } else if (email === "mozo@resto.com" && password === "123456") {
          navigation.replace("HomeMozo");
        } else if (
          (email === "bartender@resto.com" && password === "123456") ||
          (email === "cocinero@resto.com" && password === "123456")
        ) {
          navigation.replace("HomeCocinaBar");
        } else if (email === "metre@resto.com" && password === "123456") {
          navigation.replace("HomeMetre");
        } else {
          loginManager(email);
          Redireccionador(rol);
        }
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setMessageError("Credenciales inválidas");
            break;
          case "auth/user-not-found":
            setMessageError("Credenciales inválidas");
            break;
          case "auth/wrong-password":
            setMessageError("Credenciales inválidas");
            break;
          case "auth/internal-error":
            setMessageError("Credenciales inválidas");
            break;
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
    Vibration.vibrate(1000);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const duenioLogin = () => {
    setEmail("altacomanda@gmail.com");
    setPassword("123456");
    setModalVisible(!modalVisible);
    admin = true;
  };

  const supervisorLogin = () => {
    setEmail("andreabricenotovar@gmail.com");
    setPassword("123456");
    setModalVisible(!modalVisible);
  };

  const barLogin = () => {
    setEmail("bartender@resto.com");
    setPassword("123456");
    setModalVisible(!modalVisible);
    admin = false;
  };

  const cocinaLogin = () => {
    setEmail("cocinero@resto.com");

    setPassword("123456");
    setModalVisible(!modalVisible);
    admin = false;
  };

  const metreLogin = () => {
    setEmail("metre@resto.com");
    setPassword("123456");
    setModalVisible(!modalVisible);
    admin = false;
  };
  const mozoLogin = () => {
    setEmail("mozo@resto.com");
    setPassword("123456");
    setModalVisible(!modalVisible);
    admin = false;
  };

  const clienteAnonimoLogin = () => {
    setEmail("anonimo@anonimo.com");
    setPassword("123456");
    setModalVisible(!modalVisible);
    admin = false;
  };

  const clienteRegistradoLogin = () => {
    setEmail("cristianmaida@outlook.com");

    setPassword("123456");
    setModalVisible(!modalVisible);
    admin = false;
  };
  const handlerBack = () => {
    navigation.replace("Inicio");
  };

  const ShowUserInfo = () => {
    if (user) {
      setLoading(true);
      //   loginManager(user.email);
      return <View></View>;
    }
  };
  return (
    <ImageBackground
      source={require("../assets/fondo.png")}
      resizeMode="repeat"
      style={styles.image}
    >
      <View style={styles.container}>
        {loading && (
          <View style={styles.spinContainer}>
            <Spinner />
          </View>
        )}

        {user ? (
          <ShowUserInfo />
        ) : (
          <View style={styles.buttonContainer}>
            {
              <Image
                source={require("../assets/LOGOS/logosimple.png")}
                resizeMode="contain"
                style={styles.logoHome}
              />
            }

            <View style={styles.inputContainer}>
              {!!message ? (
                <TouchableOpacity
                  style={styles.buttonError}
                  onPress={() => setMessage("")}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        backgroundColor: "red",
                        padding: 10,
                        borderRadius: 5,
                      },
                    ]}
                  >
                    {message}
                  </Text>
                </TouchableOpacity>
              ) : null}

              <TextInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input2}
              />

              <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input2}
                secureTextEntry
              />
            </View>

            <View style={styles.buttonContainer}>
              <Pressable
                style={modal.seleccionar}
                onPress={() => setModalVisible(true)}
              >
                <Text style={modal.textStyle}>Seleccione un usuario</Text>
              </Pressable>

              <TouchableOpacity
                onPress={handlerLogin}
                style={styles.buttonLogin2}
              >
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handlerBack}
                style={[styles.buttonLogin2, styles.buttonOutlineLogin]}
              >
                <Text style={styles.buttonOutlineText}>Volver</Text>
              </TouchableOpacity>
            </View>
            <View style={modal.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={modal.centeredView}>
                  <View style={modal.modalView}>
                    <Pressable
                      style={[modal.button, modal.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={modal.textStyle}>Cerrar</Text>
                    </Pressable>
                    <Text style={[modal.modalText]}>Seleccione un usuario</Text>
                    <TouchableOpacity
                      onPress={duenioLogin}
                      style={[
                        styles.buttonRole,
                        styles.buttonOutlineRole,
                        {
                          width: 200,
                          height: 50,
                          marginTop: 10,
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <Text style={styles.buttonOutlineTextRole}>Dueño</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={supervisorLogin}
                      style={[
                        styles.buttonRole,
                        styles.buttonOutlineRole,
                        {
                          width: 200,
                          height: 50,
                          marginTop: 10,
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <Text style={styles.buttonOutlineTextRole}>
                        Supervisor
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={barLogin}
                      style={[
                        styles.buttonRole,
                        styles.buttonOutlineRole,
                        {
                          width: 200,
                          height: 50,
                          marginTop: 10,
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <Text style={styles.buttonOutlineTextRole}>Bar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={cocinaLogin}
                      style={[
                        styles.buttonRole,
                        styles.buttonOutlineRole,
                        {
                          width: 200,
                          height: 50,
                          marginTop: 10,
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <Text style={styles.buttonOutlineTextRole}>Cocina</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={metreLogin}
                      style={[
                        styles.buttonRole,
                        styles.buttonOutlineRole,
                        {
                          width: 200,
                          height: 50,
                          marginTop: 10,
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <Text style={styles.buttonOutlineTextRole}>Metre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={mozoLogin}
                      style={[
                        styles.buttonRole,
                        styles.buttonOutlineRole,
                        {
                          width: 200,
                          height: 50,
                          marginTop: 10,
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <Text style={styles.buttonOutlineTextRole}>Mozo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={clienteRegistradoLogin}
                      style={[
                        styles.buttonRole,
                        styles.buttonOutlineRole,
                        {
                          width: 200,
                          height: 50,
                          marginTop: 10,
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <Text style={styles.buttonOutlineTextRole}>
                        Cliente registrado
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={clienteAnonimoLogin}
                      style={[
                        styles.buttonRole,
                        styles.buttonOutlineRole,
                        {
                          width: 200,
                          height: 50,
                          marginTop: 10,
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <Text style={styles.buttonOutlineTextRole}>
                        Cliente anónimo
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const modal = StyleSheet.create({
  centeredView: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  seleccionar: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#ed9039",
    margin: 20,
    marginTop: 20,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#ed9039",
  },
  buttonClose: {
    backgroundColor: "#ff5100",
    left: 70,
    top: -20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#ff5100",
    fontWeight: "700",
    fontSize: 20,
  },
});
export default LoginScreen;
