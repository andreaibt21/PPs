import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  TextInput,
  ImageBackground,
  Vibration,
} from "react-native";
import { RootStackParamList } from "../../App";
import styles from "../../styles/Style";
import { BarCodeScanner } from "expo-barcode-scanner";
import { auth, db } from "../../database/firebase";
import Spinner from "../../utils/SpinnerUtil";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  QuerySnapshot,
} from "firebase/firestore";
import { addClienteMesa } from "../../utils/AddDocsUtil";
import { Camera } from "expo-camera";
import insertarToast from "../../utils/ToastUtil";
import { sendPushNotification } from "../../utils/PushNotificationUtil";
import moment from "moment";

import { cambioMesaAOcupada } from "../../utils/ManejoEstadosMesaUtil";
import { cambioClienteASentado } from "../../utils/ManejoEstadosClienteUtil";
import { getCurrentTimeInSeconds } from "expo-auth-session/build/TokenRequest";
import { cambioReservaAInactiva } from "../../utils/ManejoEstadosReservaUtil";

const HomeClientePrincipal = () => {
  //console.log("llegooo2");
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [numeroMesa, setNumeroMesa] = useState("");
  const [idReserva, setIdReserva] = useState("");
  const [idCliente, setIdCliente] = useState("");

  const [idMesa, setIdMesa] = useState("");
  const [scanned, setScanned] = useState(false);
  const [openQR, setOpenQR] = useState(false);

  const qrIcon = require("../../assets/qr.png");

  const handlerModificar = () => {
    navigation.replace("ModificacionUsuario");
  };
  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await BarCodeScanner.requestPermissionsAsync();
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      //pedir el idMesa
      //pedir el numeroMesa
      //pedir el idReserva
      getDatosMesa();
    }, [])
  );

  const handleOpenQR = () => {
    setScanned(false);
    setOpenQR(true);
  };

  const getDatosMesa = async () => {
    setLoading(true);
    setNumeroMesa("");
    setIdMesa("");
    try {
      const q = query(
        collection(db, "tableInfo"),
        where("assignedClient", "==", auth.currentUser?.email)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        console.log("doc.data()", doc.data());
        if (doc.data().status == "ocupada") {
          setNumeroMesa(doc.data().tableNumber);
          console.log("numero mesa ", doc.data().tableNumber);
          setIdMesa(doc.id);
        }
      });
    } catch (error) {
      console.log("error en el getDatosMesa ", error);
    }

    setLoading(false);
  };

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setOpenQR(false);
    const dataSplit = data.split("@");
    console.log("dataSplit", dataSplit);
    const qrType = dataSplit[0];
    const numeroMesaAux = dataSplit[1];
    if (qrType === "mesa") {
      try {
        setLoading(true);
        getDatosMesa();
        console.log("aaaaaaaaaaaa", numeroMesa);
        if (numeroMesaAux === numeroMesa) {
          //cliente sentado
          cambioClienteASentado(idCliente);
          //mesaClienteGenerado
          addClienteMesa(
            idCliente,
            auth.currentUser?.email,
            idMesa,
            "Asignada"
          );
          //reservaInactiva
          cambioReservaAInactiva(idReserva);
          //ir a la HomeCliente
          insertarToast("Mesa asignada");
          navigation.replace("HomeCliente");
        } else {
          Vibration.vibrate(1000);

          insertarToast("Mesa incorrecta. Su mesa es la " + numeroMesa);
        }
      } catch (error) {
        console.log("ERROR ESCANEANDO QR: " + error);
      } finally {
        setLoading(false);
      }
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

  useFocusEffect(
    useCallback(() => {
      checkDisplayName();
    }, [])
  );

  const checkDisplayName = async () => {
    setDisplayName(auth.currentUser?.email);
    if (auth.currentUser?.email === "anonimo@anonimo.com") {
      setDisplayName("Anónimo");
    }
  };

  return !openQR ? (
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
        <View style={styles.buttonContainer}>
          <Text style={styles.textHomeMedianoDos}>
            Escanee el QR de la mesa asignada
          </Text>
          <TouchableOpacity onPress={handleOpenQR}>
            <Image style={styles.qrIcon} resizeMode="cover" source={qrIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handlerSignOut} style={styles.button}>
            <Text style={styles.buttonText}>Salir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlerModificar}
            style={[
              styles.button,
              { width: 170, marginTop: 0, marginLeft: 70 },
            ]}
          >
            <Text style={styles.buttonText}>Modificar Usuario</Text>
          </TouchableOpacity>
          <Text style={styles.textHomePequeñoCentrado}>{displayName}</Text>
        </View>
      </View>
    </ImageBackground>
  ) : (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      resizeMode="repeat"
      style={styles.image}
    >
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={
            scanned && openQR ? undefined : handleBarCodeScanned
          }
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    </ImageBackground>
  );
};

export default HomeClientePrincipal;
