import React, { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Audio } from "expo-av";

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const win = Dimensions.get("window");
  const [sound, setSound] = useState<any>();

  const audioPlayer = new Audio.Sound();
  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    playSound(require("../assets/inicio.mp3"));
  }, []);

  setTimeout(() => {
    audioPlayer.pauseAsync();
    audioPlayer.unloadAsync();
    navigation.replace("Inicio");
  }, 3000);

  async function playSound(sound: any) {
    try {
      await audioPlayer.unloadAsync();
      await audioPlayer.loadAsync(sound);
      await audioPlayer.playAsync();
    } catch (err) {
      console.warn("Couldn't Play audio", err);
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#EFDFA8" }}>
      <ImageBackground
        source={require("../assets/splash.gif")}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SplashScreen;
