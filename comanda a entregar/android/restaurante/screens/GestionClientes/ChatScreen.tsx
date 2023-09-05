import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "../../styles/StylePrueba";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Vibration,
} from "react-native";
import Modal from "react-native-modal";
import React, { useCallback, useLayoutEffect, useState } from "react";
//import RotatingLogo from "../rotatingLogo/RotatingLogo";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../database/firebase";
import { GiftedChat, Send } from "react-native-gifted-chat";
import HomeMozoScreen from "../Homes/HomeMetreScreen";
import insertarToast from "../../utils/ToastUtil";
import { sendPushNotification } from "../../utils/PushNotificationUtil";
import { deepCopy } from "@firebase/util";
import styles2 from "../../styles/Style";
const ChatScreen = () => {
  //CONSTANTES
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [isModalSpinnerVisible, setModalSpinnerVisible] = useState(false);
  const [rol, setRol] = useState("");
  const [nombre, setNombre] = useState("");

  const [messages, setMessages] = useState([]);
  const user = auth?.currentUser?.email || "";
  const [loading, setLoading] = useState(false);

  const returnIcon = require("../../assets/return.png");
  const sendIcon = require("../../assets/send.png");

  useFocusEffect(
    useCallback(() => {
      checkClientNombre();
    }, [])
  );

  const checkClientNombre = async () => {
    setLoading(true);
    try {
      const query1 = query(
        collection(db, "userInfo"),
        where("email", "==", auth.currentUser?.email)
      );
      const querySnapshot1 = await getDocs(query1);
      querySnapshot1.forEach(async (doc) => {
        const rolAux = doc.data().rol;
        setRol(rolAux);
        console.log("rol checkClient ", rol);

        const nameAux = doc.data().name;
        if (rolAux == "Mozo") {
          setNombre("Mozo");
        } else if (
          rolAux == "clienteRegistrado" ||
          rolAux == "clienteAnonimo"
        ) {
          // const query2 = query(
          //   collection(db, "clienteMesa"),
          //   where("mailCliente", "==", auth.currentUser?.email)
          // );
          // const querySnapshot2 = await getDocs(query2);
          // querySnapshot2.forEach(async (doc) => {
          //   const statusMesaAux = doc.data().status;
          //   const idMesaAux = doc.data().idMesa;
          //   if (statusMesaAux == "Asignada" || statusMesaAux == "Encuestada") {
          //     setNombre("Mesa " + idMesaAux);
          //   } else {
          //     setNombre(nameAux);
          //   }
          // });

          const query3 = query(
            collection(db, "tableInfo"),
            where("assignedClient", "==", auth.currentUser?.email)
          );
          const querySnapshot3 = await getDocs(query3);
          querySnapshot3.forEach(async (doc) => {
            const statusMesaAux = doc.data().status;
            const idMesaAux = doc.data().tableNumber;
            console.log("Mesa statusMesaAux " + statusMesaAux);
            console.log("Mesa idMesaAux " + idMesaAux);
            if (statusMesaAux == "ocupada") {
              setNombre("Mesa " + idMesaAux);
              console.log("Mesa " + idMesaAux);
            }
          });
        } else {
          setNombre(nameAux);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log("error checkClientNombre ", error);
      Vibration.vibrate(1000);
    }
  };

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "chat"), orderBy("createdAt", "desc")),
      (snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            text: doc.data().text,
            createdAt: doc.data().createdAt.toDate(),
            user: doc.data().user,
          }))
        )
    );
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    sendPushNotification({
      title: "NUEVO MENSAJE",
      description: "Tienes una consulta de " + auth.currentUser?.email,
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, "chat"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  //RETURN
  const handleReturn = async () => {
    try {
      const query1 = query(
        collection(db, "userInfo"),
        where("email", "==", auth.currentUser?.email)
      );
      console.log("auth.currentUser?.email", auth.currentUser?.email);
      if (auth.currentUser?.email === "mozo@resto.com") {
        navigation.replace("HomeMozo");
      } else {
        navigation.replace("HomeClientePrincipal");
      }
      const querySnapshot1 = await getDocs(query1);
    } catch (error) {
      console.log("error en handle return chat ", error);
      Vibration.vibrate(1000);
    }

    // console.log(querySnapshot1);
    // querySnapshot1.forEach(async (doc) => {
    //   const rolAux = doc.data().rol;

    //   if (rolAux === "Mozo") {
    //     navigation.replace("HomeMozo");
    //   } else {
    //     navigation.replace("HomeCliente");
    //   }
    // });
  };

  //HEADER
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleReturn}>
          <Image source={returnIcon} style={styles.headerIcon} />
        </TouchableOpacity>
      ),
      headerTitle: () => <Text style={styles.headerText}>CONSULTAS</Text>,
      headerTintColor: "transparent",
      headerBackButtonMenuEnabled: false,
      headerStyle: {
        backgroundColor: "#ed9039",
      },
    });
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      resizeMode="repeat"
      style={styles2.image}
    >
      <View style={styles.container}>
        {/* <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage} imageStyle = {{opacity:0.5}}> */}

        <View style={styles.body}>
          <GiftedChat
            messagesContainerStyle={{
              borderColor: "rgba(220, 220, 225, 0.5)",
              shadowColor: "rgba(220, 220, 225, 0.5)",
            }}
            optionTintColor="rgba(220, 220, 225, 0.5)"
            messages={messages}
            onSend={(messages) => onSend(messages)}
            renderUsernameOnMessage={true}
            renderAvatarOnTop={true}
            alwaysShowSend={true}
            user={{
              _id: auth?.currentUser?.email || 1,
              name: nombre || "",
              //name: splitUserFromEmail(user) || '', --------------------------
            }}
            textInputProps={{
              borderColor: "#222",
              placeholder: "Mensaje...",
            }}
            renderSend={(props) => (
              <Send {...props}>
                <View style={{ marginRight: 10, marginBottom: 5 }}>
                  <Image
                    style={{ height: 35, width: 35 }}
                    source={sendIcon}
                    resizeMode={"center"}
                  />
                </View>
              </Send>
            )}
          />
        </View>

        {/* </ImageBackground>            */}
      </View>
    </ImageBackground>
  );
};

export default ChatScreen;
