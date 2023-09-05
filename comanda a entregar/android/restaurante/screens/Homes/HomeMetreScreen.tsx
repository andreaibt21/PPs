import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
} from "react-native";
import { RootStackParamList } from "../../App";
import styles from "../../styles/Style";

import { auth } from "../../database/firebase";
import Spinner from "../../utils/SpinnerUtil";

const HomeMozoScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);

  async function handlerSignOut() {
    setLoading(true);
    await auth
      .signOut()
      .then(() => {
        navigation.replace("Inicio");
      })
      .catch((error: any) => alert(error.message))
      .finally(() => {
        setLoading(false);
      });
  }

  // const displayName = auth.currentUser.email;
  const handlerModificar = () => {
    navigation.replace("ModificacionUsuario");
  };
  const handlerGestionClientes = () => {
    navigation.replace("GestionClientesMetre");
  };

  const handlerEncuestaLugarTrabajo = () => {
    navigation.replace("EncuestaLugarDeTrabajoMetre");
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      resizeMode="repeat"
      style={styles.image}
    >
      <View style={styles.container}>
        {loading ? (
          <View style={styles.spinContainer}>
            <Spinner />
          </View>
        ) : null}

        {
          <Image
            source={require("../../assets/LOGOS/metre.png")}
            resizeMode="contain"
            style={styles.logoHome}
          />
        }

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handlerGestionClientes}
            style={[styles.buttonRole, styles.buttonOutlineRole]}
          >
            <Text style={styles.buttonOutlineTextRole}>Gestión Clientes</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={handlerEncuestaLugarTrabajo}
            style={[styles.buttonRole, styles.buttonOutlineRole]}
          >
            <Text style={styles.buttonOutlineTextRole}>
              Encuesta Lugar de Trabajo
            </Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handlerModificar}
              style={[styles.button, { width: 170, marginTop: 0 }]}
            >
              <Text style={styles.buttonText}>Modificar Usuario</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerSignOut} style={styles.button}>
              <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.textHomePequeño}>{auth.currentUser?.email}</Text>
      </View>
    </ImageBackground>
  );
};

export default HomeMozoScreen;
