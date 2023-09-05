import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from "react";
import styles from "../styles/Style";
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Vibration,
  PermissionsAndroid,
} from "react-native";
import Modal from "react-native-modal";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useForm } from "react-hook-form";
import insertarToast from "./ToastUtil";
import {
  createUserWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { auth, db, storage } from "../database/firebase";
import { RadioButton } from "react-native-paper";
import Spinner from "../utils/SpinnerUtil";
import { RootStackParamList } from "../App";
import {
  addClienteRegistrado,
  addDuenioEmpleado,
  addClienteAnonimo,
} from "./AddDocsUtil";
import LanzarCamara from "./CameraUtil";
import CargarImagen from "./CargarImagenUtil";
import ValidacionCamposUsuario from "./ValidacionCamposUsuariosUtil";
import { sendPushNotification } from "./PushNotificationUtil";

const SignUp = (rol: string) => {
  // console.log("estoy en el útil!!");
  type NewUser = {
    apellido: string;
    nombre: string;
    dni: string;
    cuil: string;
    email: string;
    password: string;
    confirmPassword: string;
    rol: string;
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [apellidoForm, setApellido] = useState("Apellido");
  const [nombreForm, setNombre] = useState("Nombre");
  const [dniForm, setDni] = useState("DNI");
  const [cuilForm, setCuil] = useState("CUIL");
  const [emailForm, setEmail] = useState("Correo Electrónico");
  const [passwordForm, setPassword] = useState("Contraseña");
  const [confirmPasswordForm, setConfirmPassword] = useState(
    "Confirmar Contraseña"
  );
  const [scanned, setScanned] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const {
    getValues,
    formState: {},
    reset,
    setValue,
  } = useForm<NewUser>();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalSpinnerVisible, setModalSpinnerVisible] = useState(false);
  const check = (value) => {
    switch (value) {
      case "duenio":
        return "Dueño";
        break;
      case "empleado":
        return "Mozo";
        break;
      case "clienteRegistrado":
        return "clienteRegistrado";
        break;
      case "clienteAnonimo":
        return "clienteAnonimo";
        break;
    }
  };
  const [checked, setChecked] = React.useState(check(rol));
  //VARIABLE PARA GUARDAR EL USUARIO ORIGINAL
  let originalUser = auth.currentUser;

  //PERMISOS CAMARA
  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await BarCodeScanner.requestPermissionsAsync();
    })();
  }, []);

  //HANDLERS
  //RETURN
  const handleReturn = () => {
    if (rol === "clienteAnonimo") {
      navigation.replace("HomeCliente");
    } else if (rol === "clienteRegistrado") {
      navigation.replace("HomeClienteEspera");
    } else {
      navigation.replace("HomeDuenio");
    }
  };

  const handleInputChange = (text, fieldName) => {
    // Sanitize the input value
    //const  sanitizedValue = text.replace(/[^\w\s]/gi, "");
    const sanitizedValue = text.replace(/[&<>"']/g, "");
    console.log(sanitizedValue);
    setValue(fieldName, sanitizedValue);
  };

  //COMPLETADO DEL FORM A PARTIR DEL QR
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setOpenQR(false);
    //  console.log("holaaaa");
    console.log("data", data);
    const dataSplit = data.split("@");
    console.log("dataSplit", dataSplit);
    console.log("dataSplit.length ", dataSplit.length);
    if (dataSplit.length === 9 || dataSplit.length === 8) {
      setValue("dni", dataSplit[4].trim());
      setValue("nombre", dataSplit[2].trim());
      setValue("apellido", dataSplit[1].trim());
      setApellido(dataSplit[1].trim());
      setNombre(dataSplit[2].trim());
      setDni(dataSplit[4].trim());
    }
    if (dataSplit.length > 9) {
      setValue("dni", dataSplit[1].trim());
      setValue("nombre", dataSplit[5].trim());
      setValue("apellido", dataSplit[4].trim());
      setApellido(dataSplit[4].trim());
      setNombre(dataSplit[5].trim());
      setDni(dataSplit[1].trim());
    }
  };

  //MANEJADOR DEL QR Y CAMARA
  const handleOpenQR = () => {
    setScanned(false);
    setOpenQR(true);
  };
  const handleCamera = async () => {
    setLoading(true);
    setImage(await LanzarCamara());
    setLoading(false);
  };

  const handlerActualizar = () => {
    if (checked === "clienteAnonimo" || checked === "clienteRegistrado") {
      navigation.replace("RegistroClienteRegistrado");
    } else if (
      auth.currentUser?.email === "andreabricenotovar@gmail.com" ||
      checked === "Dueño" ||
      checked === "Supervisor"
    ) {
      navigation.replace("RegistroDuenio2");
    } else {
      navigation.replace("RegistroEmpleado");
    }
  };
  const handlerBack = () => {
    if (rol === "clienteAnonimo" || rol === "clienteRegistrado") {
      navigation.replace("Inicio");
    } else if (auth.currentUser?.email === "andreabricenotovar@gmail.com") {
      navigation.replace("HomeSupervisor");
    } else {
      navigation.replace("HomeDuenio");
    }
  };
  //SUBMIT DEL FORM
  const onSubmit = async () => {
    const values = getValues();
    console.log("llega al on submit?");
    console.log("values:" + values.email);
    let error = false;

    //VALIDACION CAMPOS
    let validacion = ValidacionCamposUsuario(values, image, rol);
    console.log("la validacion " + validacion);
    if (validacion === false) {
      // insertarToast("Todos los campos y la imagen son requeridos.");
      //insertarToast("Compruebe que todos los campos son correctos.");
      return;
    }

    setLoading(true);
    toggleSpinnerAlert();
    try {
      console.log(auth.currentUser?.email);

      if (rol !== "clienteAnonimo") {
        await createUserWithEmailAndPassword(
          auth,
          values.email.trim(),
          values.password
        );
        console.log(auth.currentUser?.email);
      } else {
        //await signInAnonymously(auth);
        const nombreLower = values.nombre.toLowerCase() + "@anonimo.com";
        await createUserWithEmailAndPassword(auth, nombreLower, "123456");
        console.log(auth.currentUser?.email);
      }

      if (rol === "duenio" || rol === "empleado") {
        //DESLOGUEO DEL USUARIO CREADO Y REESTABLECIMIENTO DEL USUARIO ORIGINAL
        await auth.signOut();
        await auth.updateCurrentUser(originalUser);
      }

      //UPLOAD IMAGEN
      let imageValue = "";
      if (image) {
        imageValue = await CargarImagen(image);
      }

      if (rol === "duenio" || rol === "empleado") {
        addDuenioEmpleado(imageValue, values, checked);
      } else if (rol === "clienteRegistrado") {
        addClienteRegistrado(imageValue, values, checked);
        sendPushNotification({
          title: "NUEVO CLIENTE",
          description: "Aceptar-Rechazar",
        });
      }
      insertarToast("Usuario creado exitosamente");
      reset();
      setImage("");
      if (rol === "clienteAnonimo") {
        console.log("crea el cliente anonimooooo?");
        addClienteAnonimo(imageValue, values, checked);
        navigation.replace("HomeCliente");
        //sendPushNotification( {title:"NUEVO CLIENTE", description:"Aceptar-Rechazar"});
      }
      //ENTRAR
      handleReturn();
    } catch (error: any) {
      insertarToast(error.code);
      Vibration.vibrate(1000);
    } finally {
      setLoading(false);
      resetForm();
      console.log(auth.currentUser?.email);
    }
  };

  //RESET DEL FORM
  const resetForm = () => {
    setApellido("Apellido");
    setNombre("Nombre");
    setDni("DNI");
    setCuil("CUIL");
    setEmail("Correo Electrónico");
    setPassword("Contraseña");
    setConfirmPassword("Confirmar Contraseña");
    setValue("dni", "");
    setValue("nombre", "");
    setValue("apellido", "");
    setValue("email", "");
    setValue("password", "");
    setValue("confirmPassword", "");
    setValue("cuil", "");
    setValue("rol", "");
    setImage("");
  };

  //SPINNER
  const toggleSpinnerAlert = () => {
    setModalSpinnerVisible(true);
    setTimeout(() => {
      setModalSpinnerVisible(false);
    }, 3000);
  };

  //MANEJADORES RADIOBUTTONS
  const pressDueño = () => {
    setChecked("Dueño");
  };
  const pressSupervisor = () => {
    setChecked("Supervisor");
  };

  const pressMozo = () => {
    setChecked("Mozo");
  };

  const pressMetre = () => {
    setChecked("Metre");
  };

  const pressCocinero = () => {
    setChecked("Cocinero");
  };

  const pressBartender = () => {
    setChecked("Bartender");
  };

  //CARGA CAMPOS SEGUN SELECCION RADIO BUTTON
  useFocusEffect(
    useCallback(() => {
      console.log("el callback: " + checked);
      if (checked == "Supervisor") {
        setValue("rol", checked);
      }
      if (checked == "Dueño") {
        setValue("rol", checked);
      }
      if (checked == "Mozo") {
        setValue("rol", checked);
      }
    }, [checked])
  );

  return !openQR ? (
    <ImageBackground
      source={require("../assets/fondo.png")}
      resizeMode="repeat"
      style={styles.image}
    >
      <View style={styles.container}>
        {loading}
        <View style={styles.buttonContainer}>
          <View style={styles.cameraQrContainer}>
            {!image ? (
              <TouchableOpacity onPress={handleCamera}>
                <Image
                  style={styles.cameraIcon}
                  resizeMode="cover"
                  source={require("../assets/camara.png")}
                />
              </TouchableOpacity>
            ) : (
              <View>
                <Image
                  style={styles.cameraImage}
                  resizeMode="cover"
                  source={{ uri: image }}
                />
              </View>
            )}
          </View>
          {rol != "clienteAnonimo" ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleOpenQR}
                style={styles.buttonLogin}
              >
                <Text style={styles.buttonText}>Escanear DNI</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={styles.inputContainer}>
            <TextInput
              placeholder={nombreForm}
              style={[styles.buttonRole, styles.buttonOutlineRole]}
              onChangeText={(text) => handleInputChange(text, "nombre")}
            />
          </View>

          {rol != "clienteAnonimo" ? (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={apellidoForm}
                style={[styles.buttonRole, styles.buttonOutlineRole]}
                onChangeText={(text) => handleInputChange(text, "apellido")}
              />
              <TextInput
                placeholder={dniForm}
                style={[styles.buttonRole, styles.buttonOutlineRole]}
                keyboardType={"numeric"}
                onChangeText={(text) => handleInputChange(text, "dni")}
              />
            </View>
          ) : null}

          {rol == "duenio" || rol == "empleado" ? (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={cuilForm}
                style={[styles.buttonRole, styles.buttonOutlineRole]}
                keyboardType={"numeric"}
                onChangeText={(text) => handleInputChange(text, "cuil")}
              />
            </View>
          ) : null}
          {rol != "clienteAnonimo" ? (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={emailForm}
                style={[styles.buttonRole, styles.buttonOutlineRole]}
                onChangeText={(text) => handleInputChange(text, "email")}
              />
              <TextInput
                placeholder={passwordForm}
                style={[styles.buttonRole, styles.buttonOutlineRole]}
                onChangeText={(text) => handleInputChange(text, "password")}
                secureTextEntry={true}
              />
              <TextInput
                placeholder={confirmPasswordForm}
                style={[styles.buttonRole, styles.buttonOutlineRole]}
                onChangeText={(text) =>
                  handleInputChange(text, "confirmPassword")
                }
                secureTextEntry={true}
              />
            </View>
          ) : null}
        </View>

        {rol == "duenio" ? (
          <View style={styles.buttonContainer}>
            <View style={styles.inputFieldRadioLayout}>
              <View style={styles.inputFieldRadio}>
                <RadioButton
                  value="Dueño"
                  status={checked === "Dueño" ? "checked" : "unchecked"}
                  onPress={pressDueño}
                />
                <Text style={styles.buttonOutlineText}>Dueño</Text>
              </View>

              <View style={styles.inputFieldRadio}>
                <RadioButton
                  value="Supervisor"
                  status={checked === "Supervisor" ? "checked" : "unchecked"}
                  onPress={pressSupervisor}
                />
                <Text style={styles.buttonOutlineText}>Supervisor</Text>
              </View>
            </View>
          </View>
        ) : null}
        {rol == "empleado" ? (
          <View style={styles.buttonContainer}>
            <View style={[styles.inputFieldRadioLayout]}>
              <View style={styles.inputFieldRadio}>
                <RadioButton
                  value="Dueño"
                  status={checked === "Mozo" ? "checked" : "unchecked"}
                  onPress={pressMozo}
                />
                <Text style={styles.buttonOutlineText}>Mozo</Text>
              </View>

              <View style={styles.inputFieldRadio}>
                <RadioButton
                  value="Supervisor"
                  status={checked === "Metre" ? "checked" : "unchecked"}
                  onPress={pressMetre}
                />
                <Text style={styles.buttonOutlineText}>Metre</Text>
              </View>
            </View>
            <View style={styles.inputFieldRadioLayout}>
              <View style={styles.inputFieldRadio}>
                <RadioButton
                  value="Dueño"
                  status={checked === "Cocinero" ? "checked" : "unchecked"}
                  onPress={pressCocinero}
                />
                <Text style={styles.buttonOutlineText}>Cocinero</Text>
              </View>

              <View style={styles.inputFieldRadio}>
                <RadioButton
                  value="Supervisor"
                  status={checked === "Bartender" ? "checked" : "unchecked"}
                  onPress={pressBartender}
                />
                <Text style={styles.buttonOutlineText}>Bartender</Text>
              </View>
            </View>
          </View>
        ) : null}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onSubmit} style={styles.buttonLogin}>
              <Text style={styles.buttonText}>Registro</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlerBack}
              style={[styles.buttonLogin, styles.buttonOutlineLogin]}
            >
              <Text style={styles.buttonOutlineText}>Volver</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Modal
            backdropOpacity={0.5}
            animationIn="rotate"
            animationOut="rotate"
            isVisible={isModalSpinnerVisible}
          >
            <Spinner></Spinner>
          </Modal>
        </View>
      </View>
    </ImageBackground>
  ) : (
    <ImageBackground
      source={require("../assets/fondo.png")}
      resizeMode="repeat"
      style={styles.image}
    >
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={
            scanned && openQR ? undefined : handleBarCodeScanned
          }
          style={StyleSheet.absoluteFillObject}
        />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            onPress={handlerActualizar}
            style={[
              styles.button,
              styles.buttonLogin,
              styles.buttonOutlineLogin,
              {
                marginBottom: 20,
              },
            ]}
          >
            <Text style={styles.buttonOutlineText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
  //};
};

export default SignUp;
