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
import {
  cambioClienteAWaiting,
  cambioClienteARejected,
  cambioClienteAAccepted,
} from "../../utils/ManejoEstadosClienteUtil";
import { getCurrentTimeInSeconds } from "expo-auth-session/build/TokenRequest";
import { cambioReservaAInactiva } from "../../utils/ManejoEstadosReservaUtil";

const HomeClienteScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [clientStatus, setClientStatus] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [numeroMesa, setNumeroMesa] = useState("");
  const [mesaStatus, setMesaStatus] = useState("");
  const [estaRechazado, setEstaRechazado] = useState(false);
  const [motivoRechazo, setMotivoRechazo] = useState("");
  const [scanned, setScanned] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [tienePedidos, setTienePedidos] = useState(false);
  const [encuestada, setEncuestada] = useState(false);
  const [dataNumeroConfirmados, setDataNumeroConfirmados] = useState(0);

  const qrIcon = require("../../assets/qr.png");

  const handlerBack = () => {
    navigation.replace("HomeCliente");
  };

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

        if (statusAux === "Sentado") {
          principal = true;
        }
      });
    } catch (error) {}

    if (principal) {
      console.log("Llega?");
      navigation.replace("HomeClientePrincipal");
    } else {
      navigation.replace("HomeCliente");
    }
  };

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await BarCodeScanner.requestPermissionsAsync();
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getTienePedidos();
      getPedidoConfirmado();
      getEstaRehazado();
      getConReserva();
      getAnonimos();
    }, [])
  );

  const handleOpenQR = () => {
    setScanned(false);
    setOpenQR(true);
  };

  const getConReserva = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "Reservas"),
        where("mailCliente", "==", auth.currentUser?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const diaReserva = doc.data().fechaReserva;
        const horaReserva = doc.data().horaReserva;
        const ahora = moment();
        const reserva = moment(
          diaReserva + " " + horaReserva,
          "DD-MM-YYYY hh:mmA"
        );
        const diferencia = ahora.diff(reserva, "minutes");
        console.log("diferencia " + diferencia);

        if (doc.data().status == "aceptada" && diferencia < 10) {
          navigation.replace("HomeClienteQRReservas");
        } else {
          cambioReservaAInactiva(doc.id);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log("error en getConReserva  ", error);
    }
  };

  const handleChat = () => {
    navigation.replace("Chat");
  };

  const handleMenu = () => {
    navigation.replace("Menu");
  };

  const handleJuegos = () => {
    insertarToast("ir a juegos");
    navigation.replace("EnConstruccionJuego");
  };

  const handleEstadisticas = () => {
    navigation.replace("EstadisticasEncuestaCliente");
  };

  const handleEncuesta = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "clienteMesa"),
        where("mailCliente", "==", auth.currentUser?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        if (doc.data().status == "Encuestada") {
          insertarToast("Ya ha realizado la encuesta.");
          Vibration.vibrate(1000);

          navigation.replace("EstadisticasEncuestaCliente");
        } else if (doc.data().status == "Asignada") {
          navigation.replace("EncuestaCliente");
        }
      });
      setLoading(false);
    } catch (error) {
      console.log("error en handleEncuesta ", error);
    }
  };
  const handlePedido = () => {
    navigation.replace("GestionPedidosCliente");
  };

  const handlePedirCuenta = () => {
    navigation.replace("PedirCuenta");
  };

  const getAnonimos = async () => {
    console.log("email " + auth.currentUser?.email);
    try {
      const q = query(
        collection(db, "userInfo"),
        where("email", "==", auth.currentUser?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (item) => {
        if (item.data().clientStatus == "Accepted") {
          console.log(
            "email " +
              auth.currentUser?.email +
              " estado " +
              item.data().clientStatus
          );
          return;
        }
      });
    } catch (error) {
      console.log("ERROR CHEQUEANDO SI ESTÁ RECHAZADO: " + error);
    } finally {
      setLoading(false);
    }
  };
  const getEstaRehazado = async () => {
    try {
      const q = query(
        collection(db, "userInfo"),
        where("email", "==", auth.currentUser?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (item) => {
        if (item.data().clientStatus == "Rejected") {
          setEstaRechazado(true);
          return;
        }
      });
    } catch (error) {
      console.log("ERROR CHEQUEANDO SI ESTÁ RECHAZADO: " + error);
    } finally {
      setLoading(false);
    }
  };

  const getTienePedidos = async () => {
    try {
      const q = query(
        collection(db, "pedidos"),
        where("mailCliente", "==", auth.currentUser?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (item) => {
        if (item.data().status != "Inactivo") {
          setTienePedidos(true);
          return;
        }
      });
    } catch (error) {
      console.log("ERROR CHEQUEANDO SI HAY PEDIDOS: " + error);
    } finally {
      setLoading(false);
    }
  };

  const getPedidoConfirmado = async () => {
    setLoading(true);
    setDataNumeroConfirmados(0);
    try {
      const q = query(
        collection(db, "pedidos"),
        where("mailCliente", "==", auth.currentUser?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        if (doc.data().status == "Confirmado") {
          setDataNumeroConfirmados(querySnapshot.size);
        }
      });
    } catch (error) {
      console.log("ERROR GETPEDIDOCONFIRMADO: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setOpenQR(false);
    const dataSplit = data.split("@");
    console.log("dataSplit", dataSplit);
    if (dataSplit[0] == "ListaEsperaMesa") {
      setLoading(true);
      setData([]);
      try {
        const q = query(
          collection(db, "userInfo"),
          where("email", "==", auth.currentUser?.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          cambioClienteAWaiting(doc.id);
          insertarToast("Estás en lista de espera de asignación de mesa.");
          navigation.replace("HomeCliente");
          sendPushNotification({
            title: "CLIENTE ESPERANDO MESA",
            description: "Hay un nuevo cliente en la lista de espera",
          });
          //va a la botonera pero solo algunos botones
          checkClientStatus();
        });
      } catch (error) {
        console.log("ERROR ENCONTRANDO USUARIO: " + error);
      } finally {
        setLoading(false);
      }
    } else {
      Vibration.vibrate(1000);

      insertarToast("El QR de la lista de espera debe ser el código válido.");
    }
  };
  const handlerModificar = () => {
    navigation.replace("ModificacionUsuario");
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
      checkClientStatus();
      checkDisplayName();
    }, [])
  );

  const checkDisplayName = async () => {
    setDisplayName(auth.currentUser?.email);
    if (auth.currentUser?.email === "anonimo@anonimo.com") {
      setDisplayName("Anónimo");
    }
  };

  const checkClientStatus = async () => {
    setLoading(true);
    console.log("aquí llega?");
    if (auth.currentUser?.email === undefined) {
      setClientStatus("Accepted");
      setLoading(false);
    } else {
      try {
        const query1 = query(
          collection(db, "userInfo"),
          where("email", "==", auth.currentUser?.email)
        );
        const querySnapshot1 = await getDocs(query1);
        querySnapshot1.forEach(async (doc) => {
          const statusAux = doc.data().clientStatus;
          const motivoRechazoAux = doc.data().rejectedReason;
          console.log("status cliente " + statusAux);
          setClientStatus(statusAux);
          setMotivoRechazo(motivoRechazoAux);
          if (statusAux === "Pending") {
            navigation.replace("HomeClienteEspera");
            //setClientStatus('Accepted');
            console.log("clientStatus", clientStatus);
            setLoading(false);
            return;
          }
        });
        setLoading(false);
      } catch (error) {
        console.log("error en checkClientStatus", error);
      }
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

        <Image
          source={
            auth.currentUser?.email == "anonimo@anonimo.com"
              ? require("../../assets/LOGOS/anonimo.png")
              : require("../../assets/LOGOS/cliente.png")
          }
          resizeMode="contain"
          style={styles.logoHome}
        />
        {clientStatus == "Accepted" ? (
          <View style={styles.buttonContainer}>
            <Text style={styles.textHomeMedianoDos}>
              Escanee el QR para entrar en lista de espera para que le asignen
              una mesa
            </Text>
            <TouchableOpacity onPress={handleOpenQR}>
              <Image style={styles.qrIcon} resizeMode="cover" source={qrIcon} />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                onPress={handleEstadisticas}
                style={[styles.buttonRole, styles.buttonOutlineRole]}
              >
                <Text style={styles.buttonOutlineTextRole}>Estadísticas</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlerSignOut} style={styles.button}>
                <Text style={styles.buttonText}>Salir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <View style={styles.inputContainer}>
              {clientStatus == "Pending" && (
                <View>
                  <Text style={styles.textEnEspera}>
                    Espere a que le acepten el registro para poder continuar.
                  </Text>

                  <TouchableOpacity
                    onPress={handleEstadisticas}
                    style={[styles.buttonRole, styles.buttonOutlineRole]}
                  >
                    <Text style={styles.buttonOutlineTextRole}>
                      Estadísticas
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {clientStatus == "Waiting" && (
                <>
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

                  <Text style={styles.textEnEspera}>
                    Espere a que el metre le asigne una mesa.
                  </Text>
                </>
              )}

              <View>
                {clientStatus == "Rejected" ? (
                  <Text style={styles.textHomeMedianoDos}>
                    Su petición fue rechazada.{"\n"}Motivo: {motivoRechazo}
                  </Text>
                ) : (
                  <View>
                    {clientStatus == "Sentado" && (
                      <TouchableOpacity
                        onPress={handleMenu}
                        style={[styles.buttonRole, styles.buttonOutlineRole]}
                      >
                        <Text style={styles.buttonOutlineTextRole}>Menú</Text>
                      </TouchableOpacity>
                    )}

                    {tienePedidos ? (
                      <TouchableOpacity
                        onPress={handlePedido}
                        style={[styles.buttonRole, styles.buttonOutlineRole]}
                      >
                        <Text style={styles.buttonOutlineTextRole}>
                          Ver estado del pedido
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                    {dataNumeroConfirmados > 0 ? (
                      <TouchableOpacity
                        onPress={handlePedirCuenta}
                        style={[styles.buttonRole, styles.buttonOutlineRole]}
                      >
                        <Text style={styles.buttonOutlineTextRole}>
                          Pedir la cuenta
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                )}
                {clientStatus == "Sentado" ? (
                  <>
                    <TouchableOpacity
                      onPress={handleChat}
                      style={[styles.buttonRole, styles.buttonOutlineRole]}
                    >
                      <Text style={styles.buttonOutlineTextRole}>
                        Hablar con el mozo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleEstadisticas}
                      style={[styles.buttonRole, styles.buttonOutlineRole]}
                    >
                      <Text style={styles.buttonOutlineTextRole}>
                        Estadísticas
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : null}
                {tienePedidos && !estaRechazado ? (
                  <View>
                    <TouchableOpacity
                      onPress={handleJuegos}
                      style={[styles.buttonRole, styles.buttonOutlineRole]}
                    >
                      <Text style={styles.buttonOutlineTextRole}>Jugar</Text>
                    </TouchableOpacity>
                    {!encuestada && (
                      <TouchableOpacity
                        onPress={handleEncuesta}
                        style={[styles.buttonRole, styles.buttonOutlineRole]}
                      >
                        <Text style={styles.buttonOutlineTextRole}>
                          Hacer encuesta
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : null}
              </View>

              {/* <View style={styles.inputContainer}> */}

              <TouchableOpacity onPress={handlerSignOut} style={styles.button}>
                <Text style={styles.buttonText}>Salir</Text>
              </TouchableOpacity>
              <Text style={styles.textHomePequeñoCentrado}>{displayName}</Text>
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={handlerModificar}
          style={[styles.button, { width: 170, marginTop: 0 }]}
        >
          <Text style={styles.buttonText}>Modificar Usuario</Text>
        </TouchableOpacity>
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
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            onPress={handlerBack}
            style={[
              styles.button,
              styles.buttonLogin,
              styles.buttonOutlineLogin,
            ]}
          >
            <Text style={styles.buttonOutlineText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeClienteScreen;
