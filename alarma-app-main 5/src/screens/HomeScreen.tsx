import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Torch from "react-native-torch";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Vibration,
  TextInput,
} from "react-native";
import { RootStackParamList } from "../../App";
import { auth } from "../database/firebase";
import styles from "../styles/StyleHome";
import { showMessage } from "react-native-flash-message";
import { Accelerometer } from "expo-sensors";
import { FontAwesome } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Audio } from "expo-av";
import { Camera, FlashMode } from "expo-camera";

const audioPlayer = new Audio.Sound();

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);
  const [position, setPosition] = useState(""); //!!!!!!!!!!!!!!!!!!!!!!!
  const [sound, setSound] = useState<any>();
  const [modal, setModal] = useState(false);
  const [cord, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [count, setCount] = useState(0);
  const [countInTimeout, setCountInTimeout] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCountInTimeout(count); // count is 0 here
    }, 3000);
    setCount(5); // Update count to be 5 after timeout is scheduled
  }, []);

  const [subscription, setSubscription] = useState<any>(null);
  const [flagImage, setFlagImage] = useState(true);
  let imageAlarm = flagImage
    ? require("../../assets/1.png")
    : require("../../assets/alarma.gif");

  useEffect(() => {
    Accelerometer.setUpdateInterval(700);
  }, []);

  useEffect(() => {
    const { x, y, z } = cord;

    if (x < 1 && x > 0.9 && y < 0.05 && y > 0.01) {
      setPosition("derecha");
    } else if (x < -0.5) {
      setPosition("izquierda");
    } else if (
      x > -0.01 &&
      x < 0.5 &&
      y > 1 &&
      y < 1.05 &&
      z > 0.01 &&
      z < 0.19
    ) {
      setPosition("vertical");
    } else if (
      x < -0.0 &&
      x > -0.05 &&
      y > -0.05 &&
      y < 0.05 &&
      z > 0.05 &&
      z < 2
    ) {
      setPosition("horizontal");
    }
  }, [cord]);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((gyroscopeData) => {
        setData(gyroscopeData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    if (cord.x > 0.5) {
      setPosition("izquierda");
    }
    if (cord.x < -0.5) {
      setPosition("derecha");
    }
    if (cord.y > 0.7) {
      setPosition("vertical");
    }
    if (cord.z > 1) {
      setPosition("horizontal");
    }
  }, [cord.x, cord.y, cord.z]);

  // console.log(cord.x);
  // console.log(cord.y);
  // console.log(cord.z);

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound(sound: any) {
    try {
      await audioPlayer.unloadAsync();
      await audioPlayer.loadAsync(sound);
      await audioPlayer.playAsync();
    } catch (err) {
      console.warn("Couldn't Play audio", err);
    }
  }

  useEffect(() => {
    if (start) {
      switch (position) {
        case "horizontal":
          console.log("horizontal");
          playSound(require("../../assets/sounds/horizontal.mp3"));
          Vibration.vibrate(5000);

          break;
        case "izquierda":
          console.log("izquierda");
          playSound(require("../../assets/sounds/izquierda.mp3"));
          Vibration.cancel();
          break;
        case "derecha":
          console.log("derecha");
          playSound(require("../../assets/sounds/derecha.mp3"));
          Vibration.cancel();

          break;
        case "vertical":
          console.log("vertical");
          playSound(require("../../assets/sounds/vertical.mp3"));
          Vibration.cancel();
          Camera.requestCameraPermissionsAsync();
          <Camera
            flashMode={FlashMode.on}
            style={{ height: 1, width: 1 }}
          ></Camera>;
          break;
        case "error":
          console.log("error");
          playSound(require("../../assets/sounds/alarma.mp3"));
          setPosition("");
          Camera.requestCameraPermissionsAsync();
          <Camera
            flashMode={FlashMode.on}
            style={{ height: 1, width: 1 }}
          ></Camera>;
          Vibration.cancel();
          Vibration.vibrate(5000);

          break;
      }
    }
  }, [position]);

  const handleStart = () => {
    setFlagImage((previousState) => !previousState);
    if (!start) {
      setStart(true);
      _subscribe();
      setModal(true);
    } else {
      setStart(false);
      _unsubscribe();
      setModal(false);
    }
  };

  const handleEnd = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(
      auth,
      auth.currentUser?.email || "",
      password
    )
      .then((userCredential: { user: any }) => {
        const user = userCredential.user;
        console.log("Iniciaste con ", user.email);
        if (user) {
          setModal(false);
          setStart(false);
          handleClose();
          _unsubscribe();
          setFlagImage((previousState) => !previousState);
          audioPlayer.pauseAsync();
          audioPlayer.unloadAsync();
          console.log("sali");
          setPosition("");
        }
      })
      .catch((error) => {
        setPosition("error");
        showMessage({
          type: "danger",
          message: "Error",
          description: "Contraseña inválida",
        });
      });
  };

  const handleClose = () => {
    setModal(false);
  };

  useLayoutEffect(() => {
    // console.log(auth?.currentUser);
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handlerSingOut}>
          <FontAwesome name="power-off" size={24} color="#ff5e00" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <Text style={styles.textUser}>
          {auth?.currentUser?.email?.split("@")[0].toUpperCase()}
        </Text>
      ),
      headerTitle: () => <Text></Text>,
      headerBackVisible: false,

      headerBackButtonMenuEnabled: false,
      headerStyle: {
        backgroundColor: "#4a4b4a",
      },
    });
  }, []);

  async function handlerSingOut() {
    await auth
      .signOut()
      .then(() => {
        navigation.navigate("Inicio");
      })
      .catch((error: any) => alert(error.message));
  }

  function handlerBack() {
    navigation.replace("Home");
  }

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        {subscription && position === "vertical" && (
          <Camera
            flashMode={FlashMode.torch}
            style={{ height: 1, width: 1 }}
          ></Camera>
        )}

        <View style={styles.body}>
          <View style={styles.containerArriba}>
            {modal ? (
              <View
                style={{
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.modalText}>Ingrese su contraseña </Text>
                <View style={styles.input}>
                  <FontAwesome name="key" size={24} color="#d31928" />
                  <TextInput
                    placeholder="Confirme contraseña..."
                    placeholderTextColor="#d31928"
                    style={styles.textInput}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    autoCompleteType="off"
                  />
                </View>
                <TouchableOpacity
                  onPress={handleEnd}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonText}>Cancelar alarma</Text>
                </TouchableOpacity>

                {/* <Text style={styles.buttonText}>{position}</Text> */}
              </View>
            ) : (
              <Text style={styles.buttonText3}>
                Presione la alarma para activarla
              </Text>
            )}
          </View>
          {!modal ? (
            <TouchableOpacity onPress={handleStart}>
              <Image source={imageAlarm} style={styles.buttonImageIcon} />
            </TouchableOpacity>
          ) : (
            <Image source={imageAlarm} style={styles.buttonImageIcon} />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
