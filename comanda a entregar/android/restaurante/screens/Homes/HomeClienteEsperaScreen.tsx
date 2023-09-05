import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import { RootStackParamList } from "../../App";
import styles from "../../styles/Style";
import Toast from "react-native-simple-toast";

import { auth, db } from "../../database/firebase";
import Spinner from "../../utils/SpinnerUtil";
import { collection, getDocs, query, where } from "firebase/firestore";
import EnConstruccionScreen from "../../utils/EnConstruccionUtil";
//import { addListaDeEspera } from "../utils/AddDocsUtil";

const HomeClienteEsperaScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [clientStatus, setClientStatus] = useState("");
  const handleActualizar = async () => {
    let principal = false;
    try {
      const query1 = query(
        collection(db, "userInfo"),
        where("email", "==", auth.currentUser?.email)
      );
      const querySnapshot1 = await getDocs(query1);
      querySnapshot1.forEach(async (doc) => {
        const statusAux = doc.data().clientStatus;
        console.log(" handleActualizar status cliente --- " + statusAux);
        setClientStatus(statusAux);

        if (statusAux === "Accepted") {
          principal = true;
        }
      });
    } catch (error) {
      console.log("error actualizar en homeclienteespera ", error);
    }

    if (principal) {
      console.log("Llega?");
      navigation.replace("HomeCliente");
    }
  };
  async function handlerSignOut() {
    await auth
      .signOut()
      .then(() => {
        navigation.replace("Inicio");
      })
      .catch((error: any) => alert(error.message));
  }

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      resizeMode="repeat"
      style={styles.image}
    >
      <View style={styles.container}>
        {
          <Image
            source={require("../../assets/logo.png")}
            resizeMode="contain"
            style={styles.logoHome}
          />
        }
        <View style={styles.buttonContainer}>
          <Text style={styles.textEnEspera}>
            Espere a que le acepten el registro para poder continuar.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleActualizar}
              style={[
                styles.buttonRole,
                styles.buttonOutlineRole,
                {
                  marginLeft: 10,
                  height: 50,
                  alignContent: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={styles.buttonOutlineTextRole}>Actualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerSignOut} style={styles.button}>
              <Text style={styles.buttonText}>Salir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeClienteEsperaScreen;
