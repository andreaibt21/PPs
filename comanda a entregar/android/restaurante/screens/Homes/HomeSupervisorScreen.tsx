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

const HomeDuenioScreen = () => {
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
  const handlerRegistroDuenio = () => {
    setLoading(true);
    navigation.replace("RegistroDuenio2");
    setLoading(false);
  };

  const handlerRegistroEmpleado = () => {
    navigation.replace("RegistroEmpleado");
  };

  const handlerRegistroMesa = () => {
    navigation.replace("RegistroMesa");
  };

  const handlerGestionClientes = () => {
    navigation.replace("GestionClienteDuenio");
  };

  const handlerGestionReservas = () => {
    navigation.replace("ReservaDuenio");
  };

  const handlerEncuestaEmpleados = () => {
    navigation.replace("EncuestaEmpleadosDuenio");
  };

  const handlerCrearEncuestaEmpleados = () => {
    navigation.replace("EncuestaSupervisor");
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

        <Image
          source={require("../../assets/LOGOS/supervisor.png")}
          resizeMode="contain"
          style={styles.logoHome}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handlerRegistroEmpleado}
            style={[styles.buttonRole, styles.buttonOutlineRole]}
          >
            <Text style={styles.buttonOutlineTextRole}>Registro Empleado</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlerGestionClientes}
            style={[styles.buttonRole, styles.buttonOutlineRole]}
          >
            <Text style={styles.buttonOutlineTextRole}>Gestionar Clientes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlerGestionReservas}
            style={[styles.buttonRole, styles.buttonOutlineRole]}
          >
            <Text style={styles.buttonOutlineTextRole}>Gestionar Reservas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlerEncuestaEmpleados}
            style={[styles.buttonRole, styles.buttonOutlineRole]}
          >
            <Text style={styles.buttonOutlineTextRole}>
              Ver Encuesta Empleados
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlerCrearEncuestaEmpleados}
            style={[styles.buttonRole, styles.buttonOutlineRole]}
          >
            <Text style={styles.buttonOutlineTextRole}>
              Crear Encuesta Empleados
            </Text>
          </TouchableOpacity>
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

export default HomeDuenioScreen;
