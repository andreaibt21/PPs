import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import { auth } from "../database/firebase";
import styles from "../styles/Style";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AntDesign } from "@expo/vector-icons";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handlerLogin = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: { user: any }) => {
        const user = userCredential.user;
        console.log("Logged in with", user.email);
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
    setModalVisible(!modalVisible);
    setEmail("admin@admin.com");
    setPassword("111111");
  };
  const guestLogin = () => {
    setModalVisible(!modalVisible);
    setEmail("invitado@invitado.com");
    setPassword("222222");
  };

  const supplierLogin = () => {
    setModalVisible(!modalVisible);
    setEmail("usuario@usuario.com");
    setPassword("333333");
  };
  const anonimoLogin = () => {
    setModalVisible(!modalVisible);
    setEmail("anonimo@anonimo.com");
    setPassword("444444");
  };
  const testerLogin = () => {
    setModalVisible(!modalVisible);
    setEmail("tester@tester.com");
    setPassword("555555");
  };

  const handlerBack = () => {
    navigation.replace("Inicio");
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      resizeMode="repeat"
      style={styles.image}
    >
      <View style={[styles.container, { marginTop: 200 }]}>
        {loading && (
          <View style={styles.spinContainer}>
            <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
          </View>
        )}
        <Image
          source={require("../assets/burbujas.png")}
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

        <Pressable
          style={[
            modal.button,
            modal.buttonOpen,
            { margin: 20, marginTop: 40 },
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={modal.textStyle}>Seleccione un usuario</Text>
        </Pressable>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlerLogin} style={styles.button}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlerBack}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Volver</Text>
          </TouchableOpacity>
        </View>
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
                <AntDesign name="closecircle" size={24} color="black" />
              </Pressable>
              <Text style={modal.modalText}>Seleccione un usuario</Text>
              <TouchableOpacity
                onPress={guestLogin}
                style={[styles.buttonRole, styles.buttonOutlineRole]}
              >
                <Text style={styles.buttonOutlineTextRole}>Invitado</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={adminLogin}
                style={[styles.buttonRole, styles.buttonOutlineRole]}
              >
                <Text style={styles.buttonOutlineTextRole}>Admin</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={supplierLogin}
                style={[styles.buttonRole, styles.buttonOutlineRole]}
              >
                <Text style={styles.buttonOutlineTextRole}>Usuario</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={anonimoLogin}
                style={[styles.buttonRole, styles.buttonOutlineRole]}
              >
                <Text style={styles.buttonOutlineTextRole}>Anónimo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={testerLogin}
                style={[styles.buttonRole, styles.buttonOutlineRole]}
              >
                <Text style={styles.buttonOutlineTextRole}>Testeador</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#d993c5",
  },
  buttonClose: {
    backgroundColor: "#d993c5",
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
  },
});
export default LoginScreen;
