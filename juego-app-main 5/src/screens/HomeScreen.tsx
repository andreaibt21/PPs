import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
} from "react-native";
import { RootStackParamList } from "../../App";
import { auth } from "../database/firebase";
import styles from "../styles/StyleHome";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import {
  Image as ImageNative,
  Fab,
  Icon,
  PresenceTransition,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

const audioPlayer = new Audio.Sound();

const HomeScreen = () => {
  //#region
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);

  const spain = require("../../assets/languages/espana.png");
  const portugal = require("../../assets/languages/portugal.png");
  const inglaterra = require("../../assets/languages/inglaterra.png");
  const numeros = require("../../assets/categories/numbers.png");
  const colores = require("../../assets/categories/chromatic.png");
  const animales = require("../../assets/categories/livestock.png");

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [widthWindow, setWidthWindow] = useState(
    Dimensions.get("window").width
  );
  const updateLayout = () => {
    setWidthWindow(Dimensions.get("window").width);
  };
  Dimensions.addEventListener("change", updateLayout);

  const [languageFlag, setLanguageFlag] = useState(1);
  const [objectFlag, setObjectFlag] = useState(1);

  const [languageIcon, setLanguageIcon] = useState(
    require("../../assets/languages/espana.png")
  );
  const [categoryIcon, setCategoryIcon] = useState(
    require("../../assets/categories/numbers.png")
  );

  const [sound1, setSound1] = useState(
    require("../../assets/sounds/spanish/numbers/uno.mp3")
  );
  const [sound2, setSound2] = useState(
    require("../../assets/sounds/spanish/numbers/dos.mp3")
  );
  const [sound3, setSound3] = useState(
    require("../../assets/sounds/spanish/numbers/tres.mp3")
  );
  const [sound4, setSound4] = useState(
    require("../../assets/sounds/spanish/numbers/cuatro.mp3")
  );
  const [sound5, setSound5] = useState(
    require("../../assets/sounds/spanish/numbers/cinco.mp3")
  );
  const [sound6, setSound6] = useState(
    require("../../assets/sounds/spanish/numbers/seis.mp3")
  );
  const [sound7, setSound7] = useState(
    require("../../assets/sounds/spanish/numbers/siete.mp3")
  );
  const [sound8, setSound8] = useState(
    require("../../assets/sounds/spanish/numbers/ocho.mp3")
  );
  const [sound9, setSound9] = useState(
    require("../../assets/sounds/spanish/numbers/nueve.mp3")
  );

  const [image1, setImage1] = useState(require("../../assets/numbers/one.png"));
  const [image2, setImage2] = useState(require("../../assets/numbers/two.png"));
  const [image3, setImage3] = useState(
    require("../../assets/numbers/three.png")
  );
  const [image4, setImage4] = useState(
    require("../../assets/numbers/four.png")
  );
  const [image5, setImage5] = useState(
    require("../../assets/numbers/five.png")
  );
  const [image6, setImage6] = useState(require("../../assets/numbers/six.png"));
  const [image7, setImage7] = useState(
    require("../../assets/numbers/seven.png")
  );
  const [image8, setImage8] = useState(
    require("../../assets/numbers/eight.png")
  );
  const [image9, setImage9] = useState(
    require("../../assets/numbers/nine.png")
  );

  const setNumbersSpanish = () => {
    setImage1(require("../../assets/numbers/one.png"));
    setImage2(require("../../assets/numbers/two.png"));
    setImage3(require("../../assets/numbers/three.png"));
    setImage4(require("../../assets/numbers/four.png"));
    setImage5(require("../../assets/numbers/five.png"));
    setImage6(require("../../assets/numbers/six.png"));
    setImage7(require("../../assets/numbers/seven.png"));
    setImage8(require("../../assets/numbers/eight.png"));
    setImage9(require("../../assets/numbers/nine.png"));

    setSound1(require("../../assets/sounds/spanish/numbers/uno.mp3"));
    setSound2(require("../../assets/sounds/spanish/numbers/dos.mp3"));
    setSound3(require("../../assets/sounds/spanish/numbers/tres.mp3"));
    setSound4(require("../../assets/sounds/spanish/numbers/cuatro.mp3"));
    setSound5(require("../../assets/sounds/spanish/numbers/cinco.mp3"));
    setSound6(require("../../assets/sounds/spanish/numbers/seis.mp3"));
    setSound7(require("../../assets/sounds/spanish/numbers/siete.mp3"));
    setSound8(require("../../assets/sounds/spanish/numbers/ocho.mp3"));
    setSound9(require("../../assets/sounds/spanish/numbers/nueve.mp3"));
  };

  const setNumbersEnglish = () => {
    setImage1(require("../../assets/numbers/one.png"));
    setImage2(require("../../assets/numbers/two.png"));
    setImage3(require("../../assets/numbers/three.png"));
    setImage4(require("../../assets/numbers/four.png"));
    setImage5(require("../../assets/numbers/five.png"));
    setImage6(require("../../assets/numbers/six.png"));
    setImage7(require("../../assets/numbers/seven.png"));
    setImage8(require("../../assets/numbers/eight.png"));
    setImage9(require("../../assets/numbers/nine.png"));

    setSound1(require("../../assets/sounds/english/numbers/one.mp3"));
    setSound2(require("../../assets/sounds/english/numbers/two.mp3"));
    setSound3(require("../../assets/sounds/english/numbers/three.mp3"));
    setSound4(require("../../assets/sounds/english/numbers/four.mp3"));
    setSound5(require("../../assets/sounds/english/numbers/five.mp3"));
    setSound6(require("../../assets/sounds/english/numbers/six.mp3"));
    setSound7(require("../../assets/sounds/english/numbers/seven.mp3"));
    setSound8(require("../../assets/sounds/english/numbers/eight.mp3"));
    setSound9(require("../../assets/sounds/english/numbers/nine.mp3"));
  };

  const setNumbersPortuguese = () => {
    setImage1(require("../../assets/numbers/one.png"));
    setImage2(require("../../assets/numbers/two.png"));
    setImage3(require("../../assets/numbers/three.png"));
    setImage4(require("../../assets/numbers/four.png"));
    setImage5(require("../../assets/numbers/five.png"));
    setImage6(require("../../assets/numbers/six.png"));
    setImage7(require("../../assets/numbers/seven.png"));
    setImage8(require("../../assets/numbers/eight.png"));
    setImage9(require("../../assets/numbers/nine.png"));

    setSound1(require("../../assets/sounds/portuguese/numbers/um.mp3"));
    setSound2(require("../../assets/sounds/portuguese/numbers/dois.mp3"));
    setSound3(require("../../assets/sounds/portuguese/numbers/tres.mp3"));
    setSound4(require("../../assets/sounds/portuguese/numbers/quatro.mp3"));
    setSound5(require("../../assets/sounds/portuguese/numbers/cinco.mp3"));
    setSound6(require("../../assets/sounds/portuguese/numbers/seis.mp3"));
    setSound7(require("../../assets/sounds/portuguese/numbers/sete.mp3"));
    setSound8(require("../../assets/sounds/portuguese/numbers/oito.mp3"));
    setSound9(require("../../assets/sounds/portuguese/numbers/nove.mp3"));
  };

  const setColorsSpanish = () => {
    setImage1(require("../../assets/colors/black.png"));
    setImage2(require("../../assets/colors/blue.png"));
    setImage3(require("../../assets/colors/brown.png"));
    setImage4(require("../../assets/colors/green.png"));
    setImage5(require("../../assets/colors/orange.png"));
    setImage6(require("../../assets/colors/pink.png"));
    setImage7(require("../../assets/colors/yellow.png"));
    setImage8(require("../../assets/colors/red.png"));
    setImage9(require("../../assets/colors/white.png"));

    setSound1(require("../../assets/sounds/spanish/colors/negro.mp3"));
    setSound2(require("../../assets/sounds/spanish/colors/azul.mp3"));
    setSound3(require("../../assets/sounds/spanish/colors/marron.mp3"));
    setSound4(require("../../assets/sounds/spanish/colors/verde.mp3"));
    setSound5(require("../../assets/sounds/spanish/colors/anaranjado.mp3"));
    setSound6(require("../../assets/sounds/spanish/colors/rosado.mp3"));
    setSound7(require("../../assets/sounds/spanish/colors/amarillo.mp3"));
    setSound8(require("../../assets/sounds/spanish/colors/rojo.mp3"));
    setSound9(require("../../assets/sounds/spanish/colors/blanco.mp3"));
  };

  const setColorsEnglish = () => {
    setImage1(require("../../assets/colors/black.png"));
    setImage2(require("../../assets/colors/blue.png"));
    setImage3(require("../../assets/colors/brown.png"));
    setImage4(require("../../assets/colors/green.png"));
    setImage5(require("../../assets/colors/orange.png"));
    setImage6(require("../../assets/colors/pink.png"));
    setImage7(require("../../assets/colors/yellow.png"));
    setImage8(require("../../assets/colors/red.png"));
    setImage9(require("../../assets/colors/white.png"));

    setSound1(require("../../assets/sounds/english/colors/black.mp3"));
    setSound2(require("../../assets/sounds/english/colors/blue.mp3"));
    setSound3(require("../../assets/sounds/english/colors/brown.mp3"));
    setSound4(require("../../assets/sounds/english/colors/green.mp3"));
    setSound5(require("../../assets/sounds/english/colors/orange.mp3"));
    setSound6(require("../../assets/sounds/english/colors/pink.mp3"));
    setSound7(require("../../assets/sounds/english/colors/yellow.mp3"));
    setSound8(require("../../assets/sounds/english/colors/red.mp3"));
    setSound9(require("../../assets/sounds/english/colors/white.mp3"));
  };

  const setColorsPortuguese = () => {
    setImage1(require("../../assets/colors/black.png"));
    setImage2(require("../../assets/colors/blue.png"));
    setImage3(require("../../assets/colors/brown.png"));
    setImage4(require("../../assets/colors/green.png"));
    setImage5(require("../../assets/colors/orange.png"));
    setImage6(require("../../assets/colors/pink.png"));
    setImage7(require("../../assets/colors/yellow.png"));
    setImage8(require("../../assets/colors/red.png"));
    setImage9(require("../../assets/colors/white.png"));

    setSound1(require("../../assets/sounds/portuguese/colors/preto.mp3"));
    setSound2(require("../../assets/sounds/portuguese/colors/azul.mp3"));
    setSound3(require("../../assets/sounds/portuguese/colors/marrom.mp3"));
    setSound4(require("../../assets/sounds/portuguese/colors/verde.mp3"));
    setSound5(require("../../assets/sounds/portuguese/colors/laranja.mp3"));
    setSound6(require("../../assets/sounds/portuguese/colors/rosa.mp3"));
    setSound7(require("../../assets/sounds/portuguese/colors/amarelo.mp3"));
    setSound8(require("../../assets/sounds/portuguese/colors/vermelho.mp3"));
    setSound9(require("../../assets/sounds/portuguese/colors/branco.mp3"));
  };

  const setAnimalsSpanish = () => {
    setImage1(require("../../assets/animals/bird.png"));
    setImage2(require("../../assets/animals/cat.png"));
    setImage3(require("../../assets/animals/cow.png"));
    setImage4(require("../../assets/animals/dog.png"));
    setImage5(require("../../assets/animals/elephant.png"));
    setImage6(require("../../assets/animals/penguin.png"));
    setImage7(require("../../assets/animals/lion.png"));
    setImage8(require("../../assets/animals/pez.png"));
    setImage9(require("../../assets/animals/turtle.png"));

    setSound1(require("../../assets/sounds/spanish/animals/pajaro.mp3"));
    setSound2(require("../../assets/sounds/spanish/animals/gato.mp3"));
    setSound3(require("../../assets/sounds/spanish/animals/vaca.mp3"));
    setSound4(require("../../assets/sounds/spanish/animals/perro.mp3"));
    setSound5(require("../../assets/sounds/spanish/animals/elefante.mp3"));
    setSound6(require("../../assets/sounds/spanish/animals/pinguino.mp3"));
    setSound7(require("../../assets/sounds/spanish/animals/leon.mp3"));
    setSound8(require("../../assets/sounds/spanish/animals/pez.mp3"));
    setSound9(require("../../assets/sounds/spanish/animals/tortuga.mp3"));
  };

  const setAnimalsEnglish = () => {
    setImage1(require("../../assets/animals/bird.png"));
    setImage2(require("../../assets/animals/cat.png"));
    setImage3(require("../../assets/animals/cow.png"));
    setImage4(require("../../assets/animals/dog.png"));
    setImage5(require("../../assets/animals/elephant.png"));
    setImage6(require("../../assets/animals/penguin.png"));
    setImage7(require("../../assets/animals/lion.png"));
    setImage8(require("../../assets/animals/pez.png"));
    setImage9(require("../../assets/animals/turtle.png"));

    setSound1(require("../../assets/sounds/english/animals/bird.mp3"));
    setSound2(require("../../assets/sounds/english/animals/cat.mp3"));
    setSound3(require("../../assets/sounds/english/animals/cow.mp3"));
    setSound4(require("../../assets/sounds/english/animals/dog.mp3"));
    setSound5(require("../../assets/sounds/english/animals/elephant.mp3"));
    setSound6(require("../../assets/sounds/english/animals/penguin.mp3"));
    setSound7(require("../../assets/sounds/english/animals/lion.mp3"));
    setSound8(require("../../assets/sounds/english/animals/fish.mp3"));
    setSound9(require("../../assets/sounds/english/animals/turtle.mp3"));
  };

  const setAnimalsPortuguese = () => {
    setImage1(require("../../assets/animals/bird.png"));
    setImage2(require("../../assets/animals/cat.png"));
    setImage3(require("../../assets/animals/cow.png"));
    setImage4(require("../../assets/animals/dog.png"));
    setImage5(require("../../assets/animals/elephant.png"));
    setImage6(require("../../assets/animals/penguin.png"));
    setImage7(require("../../assets/animals/lion.png"));
    setImage8(require("../../assets/animals/pez.png"));
    setImage9(require("../../assets/animals/turtle.png"));
    setSound1(require("../../assets/sounds/portuguese/animals/passaro.mp3"));
    setSound2(require("../../assets/sounds/portuguese/animals/gato.mp3"));
    setSound3(require("../../assets/sounds/portuguese/animals/vaca.mp3"));
    setSound4(require("../../assets/sounds/portuguese/animals/cachorro.mp3"));
    setSound5(require("../../assets/sounds/portuguese/animals/elefante.mp3"));
    setSound6(require("../../assets/sounds/portuguese/animals/pinguim.mp3"));
    setSound7(require("../../assets/sounds/portuguese/animals/leao.mp3"));
    setSound8(require("../../assets/sounds/portuguese/animals/pez.mp3"));
    setSound9(require("../../assets/sounds/portuguese/animals/tartaruga.mp3"));
  };

  var setItemsAtr = (language: number, object: number) => {
    setLanguageFlag(language);
    setObjectFlag(object);
    console.log(language + " " + object);

    switch (language) {
      case 1:
        setLanguageIcon(require("../../assets/languages/espana.png"));
        switch (object) {
          case 1:
            setCategoryIcon(require("../../assets/categories/numbers.png"));
            setNumbersSpanish();
            console.log("Numbers Spanish");
            break;
          case 2:
            setCategoryIcon(require("../../assets/categories/chromatic.png"));
            setColorsSpanish();
            console.log("Colors Spanish");
            break;
          case 3:
            setCategoryIcon(require("../../assets/categories/livestock.png"));
            setAnimalsSpanish();
            console.log("Animals Spanish");
            break;
        }
        break;
      case 2:
        setLanguageIcon(require("../../assets/languages/inglaterra.png"));
        switch (object) {
          case 1:
            setCategoryIcon(require("../../assets/categories/numbers.png"));
            setNumbersEnglish();
            console.log("Numbers English");
            break;
          case 2:
            setCategoryIcon(require("../../assets/categories/chromatic.png"));
            setColorsEnglish();
            console.log("Colors English");
            break;
          case 3:
            setCategoryIcon(require("../../assets/categories/livestock.png"));
            setAnimalsEnglish();
            console.log("Animals English");
            break;
        }
        break;
      case 3:
        setLanguageIcon(require("../../assets/languages/portugal.png"));
        switch (object) {
          case 1:
            setCategoryIcon(require("../../assets/categories/numbers.png"));
            setNumbersPortuguese();
            console.log("Numbers Portuguese");
            break;
          case 2:
            setCategoryIcon(require("../../assets/categories/chromatic.png"));
            setColorsPortuguese();
            console.log("Colors Portuguese");
            break;
          case 3:
            setCategoryIcon(require("../../assets/categories/livestock.png"));
            setAnimalsPortuguese();
            console.log("Animals Portuguese");
            break;
        }
        break;
    }
  };

  async function playSound(sound: any) {
    try {
      await audioPlayer.unloadAsync();
      await audioPlayer.loadAsync(sound);
      await audioPlayer.playAsync();
    } catch (err) {
      console.warn("Couldn't Play audio", err);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handlerSingOut}>
          <FontAwesome name="power-off" size={24} color="#6B0549" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text style={styles.textUser}>
          {auth?.currentUser?.email?.split("@")[0] === "anonimo"
            ? "ANÓNIMO"
            : auth?.currentUser?.email?.split("@")[0].toUpperCase()}
        </Text>
      ),
      headerBackVisible: false,
      headerBackButtonMenuEnabled: false,
      headerTitleAlign: "left",
      headerStyle: {
        backgroundColor: "#6b53e6",
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
  //#endregion

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.png")}
        resizeMode="cover"
        style={[styles.image, { flex: 1 }]}
      >
        {widthWindow < 400 ? (
          <View style={styles.body}>
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                height: "100%",
                justifyContent: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.buttonObject}
                  onPress={() => playSound(sound1)}
                >
                  <Image source={image1} style={styles.buttonImageIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.buttonObject, { backgroundColor: "#781a7d" }]}
                  onPress={() => playSound(sound2)}
                >
                  <Image source={image2} style={styles.buttonImageIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonObject}
                  onPress={() => playSound(sound3)}
                >
                  <Image source={image3} style={styles.buttonImageIcon} />
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={[styles.buttonObject, { backgroundColor: "#781a7d" }]}
                  onPress={() => playSound(sound4)}
                >
                  <Image source={image4} style={styles.buttonImageIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonObject}
                  onPress={() => playSound(sound5)}
                >
                  <Image source={image5} style={styles.buttonImageIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.buttonObject, { backgroundColor: "#781a7d" }]}
                  onPress={() => playSound(sound6)}
                >
                  <Image source={image6} style={styles.buttonImageIcon} />
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.buttonObject}
                  onPress={() => playSound(sound7)}
                >
                  <Image source={image7} style={styles.buttonImageIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.buttonObject, { backgroundColor: "#781a7d" }]}
                  onPress={() => playSound(sound8)}
                >
                  <Image source={image8} style={styles.buttonImageIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonObject}
                  onPress={() => playSound(sound9)}
                >
                  <Image source={image9} style={styles.buttonImageIcon} />
                </TouchableOpacity>
              </View>
            </View>

            {/* izquierda */}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 90,
                height: 10,
                width: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Fab
                renderInPortal={false}
                shadow={2}
                size="70"
                bg="#7a30cf"
                onPress={() => setIsOpen2(!isOpen2)}
                icon={
                  <Icon
                    color="white"
                    as={
                      <ImageNative
                        borderRadius={100}
                        source={categoryIcon}
                        alt="Tema seleccionado"
                      />
                    }
                    name="plus"
                    size="35"
                  />
                }
              />
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 100,
                left: 90,
                height: 10,
                width: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PresenceTransition
                visible={isOpen2}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 250 } }}
              >
                <Fab
                  onPress={() => {
                    setItemsAtr(languageFlag, 2);
                    setIsOpen2(!isOpen2);
                    setCategoryIcon(colores);
                  }}
                  bg="#7a30cf"
                  renderInPortal={false}
                  shadow={2}
                  size="70"
                  bottom={185}
                  icon={
                    <Icon
                      color="blue"
                      as={
                        <ImageNative
                          borderRadius={100}
                          source={colores}
                          alt="Colores"
                        />
                      }
                      name="plus"
                      size="35"
                    />
                  }
                />
                <Fab
                  onPress={() => {
                    setItemsAtr(languageFlag, 1);
                    setIsOpen2(!isOpen2);
                    setCategoryIcon(numeros);
                  }}
                  bg="#7a30cf"
                  renderInPortal={false}
                  shadow={2}
                  size="70"
                  bottom={100}
                  icon={
                    <Icon
                      color="white"
                      as={
                        <ImageNative
                          borderRadius={100}
                          source={numeros}
                          alt="Numeros"
                        />
                      }
                      name="plus"
                      size="35"
                    />
                  }
                />
                <Fab
                  onPress={() => {
                    setItemsAtr(languageFlag, 3);
                    setIsOpen2(!isOpen2);
                    setCategoryIcon(animales);
                  }}
                  bg="#7a30cf"
                  renderInPortal={false}
                  shadow={2}
                  size="70"
                  icon={
                    <Icon
                      color="white"
                      as={
                        <ImageNative
                          borderRadius={100}
                          source={animales}
                          alt="animales"
                        />
                      }
                      name="plus"
                      size="35"
                    />
                  }
                />
              </PresenceTransition>
            </View>

            {/* derecha */}
            <Fab
              renderInPortal={false}
              shadow={2}
              size="70"
              bg="#7a30cf"
              onPress={() => setIsOpen(!isOpen)}
              icon={
                <Icon
                  color="white"
                  as={
                    <ImageNative
                      borderRadius={100}
                      source={languageIcon}
                      alt="Bandera de idioma seleccionado"
                    />
                  }
                  name="plus"
                  size="35"
                />
              }
            />

            <View
              style={{
                position: "absolute",
                bottom: 100,
                right: -5,

                height: 10,
                width: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PresenceTransition
                visible={isOpen}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 250 } }}
              >
                <Fab
                  onPress={() => {
                    setItemsAtr(1, objectFlag);
                    setIsOpen(!isOpen);
                    setLanguageIcon(spain);
                  }}
                  bg="#7a30cf"
                  renderInPortal={false}
                  shadow={2}
                  size="70"
                  icon={
                    <Icon
                      color="white"
                      as={
                        <ImageNative
                          borderRadius={100}
                          source={spain}
                          alt="Bandera de Espana"
                        />
                      }
                      name="plus"
                      size="35"
                    />
                  }
                />
                <Fab
                  onPress={() => {
                    setItemsAtr(3, objectFlag);
                    setIsOpen(!isOpen);
                    setLanguageIcon(portugal);
                  }}
                  bg="#7a30cf"
                  renderInPortal={false}
                  shadow={2}
                  size="70"
                  bottom={100}
                  icon={
                    <Icon
                      color="white"
                      as={
                        <ImageNative
                          borderRadius={100}
                          source={portugal}
                          alt="Bandera de Portugal"
                        />
                      }
                      name="plus"
                      size="35"
                    />
                  }
                />
                <Fab
                  onPress={() => {
                    setItemsAtr(2, objectFlag);
                    setIsOpen(!isOpen);
                    setLanguageIcon(inglaterra);
                  }}
                  bg="#7a30cf"
                  renderInPortal={false}
                  shadow={2}
                  size="70"
                  bottom={185}
                  icon={
                    <Icon
                      color="white"
                      as={
                        <ImageNative
                          borderRadius={100}
                          source={inglaterra}
                          alt="Bandera de Inglaterra"
                        />
                      }
                      name="plus"
                      size="35"
                    />
                  }
                />
              </PresenceTransition>
            </View>
          </View>
        ) : (
          <View style={styles.body2}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column" }}>
                <TouchableOpacity
                  style={styles.buttonObject2}
                  onPress={() => playSound(sound1)}
                >
                  <Image source={image1} style={styles.buttonImageIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.buttonObject2, { backgroundColor: "#781a7d" }]}
                  onPress={() => playSound(sound2)}
                >
                  <Image source={image2} style={styles.buttonImageIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonObject2}
                  onPress={() => playSound(sound3)}
                >
                  <Image source={image3} style={styles.buttonImageIcon} />
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "column" }}>
                <TouchableOpacity
                  style={[styles.buttonObject2, { backgroundColor: "#781a7d" }]}
                  onPress={() => playSound(sound4)}
                >
                  <Image source={image4} style={styles.buttonImageIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonObject2}
                  onPress={() => playSound(sound5)}
                >
                  <Image source={image5} style={styles.buttonImageIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.buttonObject2, { backgroundColor: "#781a7d" }]}
                  onPress={() => playSound(sound6)}
                >
                  <Image source={image6} style={styles.buttonImageIcon} />
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "column" }}>
                <TouchableOpacity
                  style={styles.buttonObject2}
                  onPress={() => playSound(sound7)}
                >
                  <Image source={image7} style={styles.buttonImageIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.buttonObject2, { backgroundColor: "#781a7d" }]}
                  onPress={() => playSound(sound8)}
                >
                  <Image source={image8} style={styles.buttonImageIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonObject2}
                  onPress={() => playSound(sound9)}
                >
                  <Image source={image9} style={styles.buttonImageIcon} />
                </TouchableOpacity>
              </View>
            </View>

            {/* izquierda */}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 90,
                height: 10,
                width: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Fab
                renderInPortal={false}
                shadow={2}
                size="70"
                bg="#7a30cf"
                onPress={() => setIsOpen2(!isOpen2)}
                icon={
                  <Icon
                    color="white"
                    as={
                      <ImageNative
                        borderRadius={100}
                        source={categoryIcon}
                        alt="Tema seleccionado"
                      />
                    }
                    name="plus"
                    size="35"
                  />
                }
              />
            </View>
            <View
              style={{
                position: "absolute",
                bottom: -5,
                left: 100,
                height: 10,

                width: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PresenceTransition
                visible={isOpen2}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 250 } }}
              >
                <Fab
                  onPress={() => {
                    setItemsAtr(languageFlag, 2);
                    setIsOpen2(!isOpen2);
                    setCategoryIcon(colores);
                  }}
                  bg="#7a30cf"
                  renderInPortal={false}
                  shadow={2}
                  size="70"
                  left={165}
                  icon={
                    <Icon
                      color="blue"
                      as={
                        <ImageNative
                          borderRadius={100}
                          source={colores}
                          alt="Colores"
                        />
                      }
                      name="plus"
                      size="35"
                    />
                  }
                />
                <Fab
                  onPress={() => {
                    setItemsAtr(languageFlag, 1);
                    setIsOpen2(!isOpen2);
                    setCategoryIcon(numeros);
                  }}
                  bg="#7a30cf"
                  renderInPortal={false}
                  shadow={2}
                  size="70"
                  left={85}
                  icon={
                    <Icon
                      color="white"
                      as={
                        <ImageNative
                          borderRadius={100}
                          source={numeros}
                          alt="Numeros"
                        />
                      }
                      name="plus"
                      size="35"
                    />
                  }
                />
                <Fab
                  onPress={() => {
                    setItemsAtr(languageFlag, 3);
                    setIsOpen2(!isOpen2);
                    setCategoryIcon(animales);
                  }}
                  bg="#7a30cf"
                  renderInPortal={false}
                  shadow={2}
                  size="70"
                  left={0}
                  icon={
                    <Icon
                      color="white"
                      as={
                        <ImageNative
                          borderRadius={100}
                          source={animales}
                          alt="animales"
                        />
                      }
                      name="plus"
                      size="35"
                    />
                  }
                />
              </PresenceTransition>
            </View>

            {/* derecha */}
            <Fab
              renderInPortal={false}
              shadow={2}
              size="70"
              bg="#7a30cf"
              onPress={() => setIsOpen(!isOpen)}
              icon={
                <Icon
                  color="white"
                  as={
                    <ImageNative
                      borderRadius={100}
                      source={languageIcon}
                      alt="Bandera de idioma seleccionado"
                    />
                  }
                  name="plus"
                  size="35"
                />
              }
            />

            <View
              style={{
                position: "absolute",
                bottom: -5,
                right: 90,
                height: 10,
                width: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PresenceTransition
                visible={isOpen}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 250 } }}
              >
                <Fab
                  onPress={() => {
                    setItemsAtr(1, objectFlag);
                    setIsOpen(!isOpen);
                    setLanguageIcon(spain);
                  }}
                  bg="#7a30cf"
                  renderInPortal={false}
                  shadow={2}
                  size="70"
                  icon={
                    <Icon
                      color="white"
                      as={
                        <ImageNative
                          borderRadius={100}
                          source={spain}
                          alt="Bandera de Espana"
                        />
                      }
                      name="plus"
                      size="35"
                    />
                  }
                />
                <Fab
                  onPress={() => {
                    setItemsAtr(3, objectFlag);
                    setIsOpen(!isOpen);
                    setLanguageIcon(portugal);
                  }}
                  bg="#7a30cf"
                  renderInPortal={false}
                  shadow={2}
                  size="70"
                  right={100}
                  icon={
                    <Icon
                      color="white"
                      as={
                        <ImageNative
                          borderRadius={100}
                          source={portugal}
                          alt="Bandera de Portugal"
                        />
                      }
                      name="plus"
                      size="35"
                    />
                  }
                />
                <Fab
                  onPress={() => {
                    setItemsAtr(2, objectFlag);
                    setIsOpen(!isOpen);
                    setLanguageIcon(inglaterra);
                  }}
                  bg="#7a30cf"
                  renderInPortal={false}
                  shadow={2}
                  size="70"
                  right={185}
                  icon={
                    <Icon
                      color="white"
                      as={
                        <ImageNative
                          borderRadius={100}
                          source={inglaterra}
                          alt="Bandera de Inglaterra"
                        />
                      }
                      name="plus"
                      size="35"
                    />
                  }
                />
              </PresenceTransition>
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
