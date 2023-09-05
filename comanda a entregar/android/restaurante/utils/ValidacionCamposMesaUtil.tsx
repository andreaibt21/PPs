import Toast from "react-native-simple-toast";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db, storage } from "../database/firebase";
import insertarToast from "./ToastUtil";
import { Vibration } from "react-native";

//PRIMER NIVEL
const ValidacionCamposMesa = (values, image) => {
  let retorno = false;

  if (
    estanTodosLosObligatorios(values) &&
    hayImagen(image) &&
    capacidadMayorACero(values)
  ) {
    retorno = true;
  }
  return retorno;
};

//SEGUNDO NIVEL
const estanTodosLosObligatorios = (values) => {
  let retorno = true;
  console.log(values);
  if (
    values.number === undefined ||
    values.number === "" ||
    values.capacity === undefined ||
    values.capacity === "" ||
    values.type === undefined ||
    values.type === ""
  ) {
    if (values.number === undefined || values.number === "") {
      insertarToast("El numero de mesa es obligatorio.");
      Vibration.vibrate(1000);
    }

    if (values.capacity === undefined || values.capacity === "") {
      insertarToast("La cantidad de comensales es obligatorio.");
      Vibration.vibrate(1000);
    }
    retorno = false;
  }

  return retorno;
};

const hayImagen = (image) => {
  let retorno = true;
  if (!image) {
    retorno = false;
    insertarToast("La imágen es obligatoria.");
    Vibration.vibrate(1000);
  }
  return retorno;
};

const capacidadMayorACero = (values) => {
  // console.log("capacity ", values.capacity)
  // console.log("capacity ", parseInt(values.capacity))
  let retorno = true;
  if (parseInt(values.capacity) < 1) {
    insertarToast("La cantidad de comensales debe ser un número válido.");
    retorno = false;
    Vibration.vibrate(1000);
  }
  return retorno;
};

export default ValidacionCamposMesa;
