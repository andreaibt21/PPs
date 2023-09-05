import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "../../styles/Style";
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  ImageBackground,
  Vibration,
} from "react-native";
import Modal from "react-native-modal";

import React, { useCallback, useEffect, useState } from "react";
import Spinner from "../../utils/SpinnerUtil";
import { auth, db, storage } from "../../database/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import insertarToast from "../../utils/ToastUtil";
import {
  cambioPedidoAPagando,
  cambioPedidoAInactivo,
} from "../../utils/ManejoEstadosPedidoUtil";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";

import { addCuenta } from "../../utils/AddDocsUtil";
import { DataTableRow } from "react-native-paper/lib/typescript/components/DataTable/DataTableRow";
import DataTableCell from "react-native-paper/lib/typescript/components/DataTable/DataTableCell";
import { DataTable } from "react-native-paper";

const PedirCuentaScreen = () => {
  //CONSTANTES
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [loading, setLoading] = useState(false);
  const [dataConfirmados, setDataConfirmados] = useState<any>([]);
  const [dataNoConfirmados, setDataNoConfirmados] = useState<any>([]);

  const [dataNumeroPedidos, setDataNumeroPedidos] = useState(0);
  const [dataNumeroConfirmados, setDataNumeroConfirmados] = useState(0);
  const [dataNumeroServidos, setDataNumeroServidos] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [precioPedido, setPrecioPedido] = useState(0);
  const [cuentaPedida, setCuentaPedida] = useState(false);
  const [mesa, setMesa] = useState("");
  const [cliente, setCliente] = useState("");
  const [isModalCancelVisible, setModalCancelVisible] = useState(false);
  const [idPedido, setIdPedido] = useState("");
  const [scanned, setScanned] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [propina, setPropina] = useState(0);

  //RETURN
  const handleReturn = () => {
    navigation.replace("GestionPedidosCliente");
  };
  const handleReturn2 = () => {
    navigation.replace("HomeClientePrincipal");
  };

  const handleConfirmarLaCuenta = () => {
    if (!cuentaPedida) {
      //cambiar estado pedidos confirmados a Pagando
      dataConfirmados.forEach(async (item) => {
        cambioPedidoAPagando(item.id);
      });

      //cambiar estado no confirmados a Inactivos
      dataNoConfirmados.forEach(async (item) => {
        cambioPedidoAInactivo(item.id);
      });

      //añadir la cuenta
      addCuenta(
        auth.currentUser?.email,
        mesa,
        propina,
        precioPedido,
        precioTotal
      );
      getCuentaPedida();
      insertarToast("Cuenta pagada, muchas gracias.");
      navigation.replace("HomeClientePrincipal");
    } else {
      Vibration.vibrate(1000);
      insertarToast("Ya pidió la cuenta. ");

      navigation.replace("HomeClientePrincipal");
    }
  };

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await BarCodeScanner.requestPermissionsAsync();
    })();
  }, []);

  const handleOpenQR = () => {
    setScanned(false);
    setOpenQR(true);
  };

  const handleBarCodeScanned = ({ data }) => {
    setLoading(true);
    setScanned(true);
    setOpenQR(false);
    let precioTotal = 0;
    //console.log(data);
    const dataSplit = data.split("@");
    if (dataSplit[0].trim() == "propina") {
      setPropina(dataSplit[1].trim());
      precioTotal = Number(precioPedido) + Number(dataSplit[1].trim());
      setPrecioTotal(precioTotal);
      setLoading(false);
    } else {
      Vibration.vibrate(1000);
      insertarToast("QR desconocido,");
    }
  };

  //REFRESH DE LA DATA
  useFocusEffect(
    useCallback(() => {
      getCliente();
      getPedidoConfirmado();
      getPedidoNoConfirmado();
      getPrecioPedido();
      getCuentaPedida();
      //getPrecioTotal();
      getMesa();
    }, [])
  );

  const getCliente = async () => {
    try {
      setLoading(true);
      setCliente(auth.currentUser?.email);
    } catch (error) {
      console.log("ERROR CHEQUEANDO EL CLIENTE: " + error);
    } finally {
      setLoading(false);
    }
  };

  const getPrecioTotal = async () => {
    setLoading(true);
    const total = Number(propina) + Number(precioPedido);
    await setPrecioTotal(Number(propina) + Number(precioPedido));
    setLoading(false);
  };

  const toggleModalCancel = () => {
    setModalCancelVisible(!isModalCancelVisible);
  };

  const handleLanzarModal = async (id) => {
    try {
      setLoading(true);
      setIdPedido(id);
      getPedidoConfirmado();
      toggleModalCancel();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCuentaPedida = async () => {
    try {
      setLoading(true);

      const q = query(
        collection(db, "cuenta"),
        where("mailCliente", "==", auth.currentUser?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (item) => {
        const statusCuenta = item.data().estado;
        if (statusCuenta == "Pedida") {
          setCuentaPedida(true);
        }
      });
    } catch (error) {
      console.log("ERROR CHEQUEANDO EL TIEMPO DE ELABORACIÓN: " + error);
    } finally {
      setLoading(false);
    }
  };

  const getPrecioPedido = async () => {
    try {
      setLoading(true);
      let acumulador = 0;
      let precioTotal = 0;
      const q = query(
        collection(db, "pedidos"),
        where("mailCliente", "==", auth.currentUser?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (item) => {
        const statusPedido = item.data().status;
        if (statusPedido == "Confirmado" || statusPedido == "Pagando") {
          acumulador = acumulador + item.data().precioTotal;
          precioTotal = Number(acumulador) + Number(propina);
          setPrecioPedido(acumulador);
          setPrecioTotal(precioTotal);
        }
      });
    } catch (error) {
      console.log("ERROR CHEQUEANDO EL PRECIO DEL PEDIDO: " + error);
    } finally {
      setLoading(false);
    }
  };

  const getMesa = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "clienteMesa"),
        where("mailCliente", "==", auth.currentUser?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (item) => {
        const statusAux = item.data().status;
        if (statusAux == "Asignada" || statusAux == "Encuestada") {
          setMesa(item.data().idMesa);
        }
      });
    } catch (error) {
      console.log("ERROR CHEQUEANDO EL ID DE LA MESA: " + error);
    } finally {
      setLoading(false);
    }
  };

  const getPedidoNoConfirmado = async () => {
    setLoading(true);
    setDataConfirmados([]);
    setDataNumeroConfirmados(0);
    try {
      const q = query(
        collection(db, "pedidos"),
        where("mailCliente", "==", auth.currentUser?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        if (
          doc.data().status != "Confirmado" &&
          doc.data().status != "Pagando"
        ) {
          const res: any = { ...doc.data(), id: doc.id };
          setDataNoConfirmados((arr: any) =>
            [...arr, { ...res, id: doc.id }].sort((a, b) =>
              a.status < b.status ? 1 : a.status > b.status ? -1 : 0
            )
          );
          setDataNumeroConfirmados(querySnapshot.size);
        }
      });
    } catch (error) {
      console.log("ERROR GETPEDIDO: " + error);
    } finally {
      setLoading(false);
    }
  };

  //GET DATA
  const getPedidoConfirmado = async () => {
    setLoading(true);
    setDataConfirmados([]);
    setDataNumeroConfirmados(0);
    try {
      const q = query(
        collection(db, "pedidos"),
        where("mailCliente", "==", auth.currentUser?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        if (
          doc.data().status == "Confirmado" ||
          doc.data().status == "Pagando"
        ) {
          const res: any = { ...doc.data(), id: doc.id };
          setDataConfirmados((arr: any) =>
            [...arr, { ...res, id: doc.id }].sort((a, b) =>
              a.status < b.status ? 1 : a.status > b.status ? -1 : 0
            )
          );
          setDataNumeroConfirmados(querySnapshot.size);
        }
      });
    } catch (error) {
      console.log("ERROR GETPEDIDO: " + error);
    } finally {
      setLoading(false);
    }
  };

  return !openQR ? (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      resizeMode="repeat"
      style={styles.image}
    >
      <View style={styles.containerMenu}>
        {loading ? (
          <View style={styles.spinContainer}>
            <Spinner />
          </View>
        ) : null}

        <View
          style={[
            styles.pedidoStyle,
            {
              top: -50,
              width: 200,
              height: 180,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text style={styles.buttonOutlineTextRole}>CUENTA</Text>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              marginTop: 5,
              color: "#ff5100",
              fontWeight: "bold",
            }}
          >
            Total
          </Text>
          <Text style={styles.textCuenta}>${precioTotal}</Text>
          <Text style={styles.textHomePequeñoCentrado}>
            Pedido: ${precioPedido}
          </Text>
          <Text style={styles.textHomePequeñoCentrado}>
            Propina: ${propina}
          </Text>
        </View>

        <View style={styles.buttonContainerPropina}>
          <TouchableOpacity onPress={handleOpenQR} style={styles.buttonLogin}>
            <Text style={styles.buttonText}>Dar propina</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.bodyPedido2}> */}
        {/* <ScrollView>  */}
        {/* {dataNumeroConfirmados > 0 ?
                        <Text style={styles.textHomePequeñoCentrado}>Confirmados</Text> 
                    :null} */}
        <DataTable style={styles.containerTabla}>
          <DataTable.Header style={styles.headerTablaStyle}>
            <DataTable.Title
              style={[[{ flex: 2 }], styles.celdaTablaStyle]}
              textStyle={styles.textoHeaderStyle}
            >
              PRODUCTO
            </DataTable.Title>
            <DataTable.Title
              style={styles.celdaTablaStyle}
              textStyle={styles.textoHeaderStyle}
            >
              PRECIO
            </DataTable.Title>
            <DataTable.Title
              style={styles.celdaTablaStyle}
              textStyle={styles.textoHeaderStyle}
            >
              CANT.
            </DataTable.Title>
            <DataTable.Title textStyle={styles.textoHeaderStyle}>
              SUBTOT.
            </DataTable.Title>
          </DataTable.Header>
          {dataConfirmados.map(
            (item: {
              nombreProducto: any;
              cantidad: any;
              precioUnitario: any;
              precioTotal: any;
              status: any;
            }) => (
              <DataTable.Row style={styles.filaTablaStyle}>
                <DataTable.Cell
                  style={[[{ flex: 2 }], styles.celdaTablaStyle]}
                  textStyle={styles.buttonOutlineTextRole}
                >
                  {item.nombreProducto}
                </DataTable.Cell>
                <DataTable.Cell
                  style={styles.celdaTablaStyle}
                  textStyle={styles.buttonOutlineTextRole}
                >
                  ${item.precioUnitario}
                </DataTable.Cell>
                <DataTable.Cell
                  style={styles.celdaTablaStyle}
                  textStyle={styles.buttonOutlineTextRole}
                >
                  {item.cantidad}
                </DataTable.Cell>
                <DataTable.Cell textStyle={styles.buttonOutlineTextRole}>
                  ${item.precioTotal}
                </DataTable.Cell>
              </DataTable.Row>
            )
          )}
        </DataTable>
        {/* </ScrollView>  */}

        {/* </View> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleConfirmarLaCuenta}
            style={styles.buttonLogin}
          >
            <Text style={styles.buttonText}>Pagar la cuenta</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleReturn}
            style={[styles.buttonRole, styles.buttonOutlineRole]}
          >
            <Text style={styles.buttonOutlineTextRole}>Ir al pedido</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleReturn2}
            style={[styles.buttonRole, styles.buttonOutlineRole]}
          >
            <Text style={styles.buttonOutlineTextRole}>VOLVER</Text>
          </TouchableOpacity>
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

export default PedirCuentaScreen;
