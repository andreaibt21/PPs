import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../App";
import { auth, db } from "../database/firebase";
import styles from "../styles/Style";
import { FontAwesome } from "@expo/vector-icons";
import { Bubble, GiftedChat, Time } from "react-native-gifted-chat";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay/lib";

const ChatRoomBScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setLoading(true);

    const unsubscribe = onSnapshot(
      query(collection(db, "chatB"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            text: doc.data().text,
            createdAt: doc.data().createdAt.toDate(),
            user: doc.data().user,
          }))
        );
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, "chatB"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handlerSingOut}>
          <FontAwesome name="power-off" size={24} color="#d993c5" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={handlerBack}>
          <Ionicons name="play-skip-back-circle" size={30} color="#d993c5" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text style={[styles.textUserB, { color: "#d993c5" }]}>
          Sala 4B -
          {auth?.currentUser?.email?.split("@")[0] === "anonimo"
            ? " ANÓNIMO"
            : " " + auth?.currentUser?.email?.split("@")[0].toUpperCase()}
        </Text>
      ),
      headerBackVisible: false,
      headerBackButtonMenuEnabled: false,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#b63792",
      },
    });
  }, []);

  async function handlerSingOut() {
    await auth
      .signOut()
      .then(() => {
        navigation.replace("Inicio");
      })
      .catch((error: any) => alert(error.message));
  }
  function handlerBack() {
    navigation.replace("Home");
  }
  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      resizeMode="repeat"
      style={styles.image}
    >
      {loading && (
        <View style={styles.spinContainer}>
          <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
        </View>
      )}
      <GiftedChat
        messagesContainerStyle={require("../../assets/fondo.png")}
        optionTintColor="#optionTintColor"
        textInputProps={{
          borderColor: "#222",
          placeholder: "Escribe un mensaje aquí...",
        }}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderUsernameOnMessage={true}
        renderAvatarOnTop={true}
        maxInputLength={21}
        renderTime={(props) => {
          return (
            <Time
              {...props}
              timeTextStyle={{
                left: {
                  color: "white",
                  textAlign: "right",
                },
                right: {
                  color: "white",
                },
              }}
            />
          );
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: "white",
                },
                left: {
                  color: "white",
                },
              }}
              usernameStyle={{
                color: "white",
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: "#d993c5",
                  borderBottomEndRadius: 20,
                  borderBottomStartRadius: 20,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 20,
                  padding: 5,
                },
                right: {
                  backgroundColor: "#b63792",
                  borderBottomEndRadius: 20,
                  borderBottomStartRadius: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 0,
                  padding: 5,
                },
              }}
            />
          );
        }}
        user={{
          _id: auth?.currentUser?.email || 1,
          name: auth?.currentUser?.email || "",
        }}
      />
    </ImageBackground>
  );
};

export default ChatRoomBScreen;
