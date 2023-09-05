import Toast from "react-native-simple-toast";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db, storage } from "../database/firebase";
import insertarToast from "./ToastUtil";
import { Vibration } from "react-native";

const ValidacionCamposProducto = (values, image1, image2, image3) => {
  if (!estanTodosLosObligatorios(values)) {
    console.log("entra a campos obligatorios");
    // insertarToast("Todos los campos son requeridos");

    // Toast.showWithGravity(
    //     "Todos los campos son requeridos",
    //     Toast.LONG,
    //     Toast.CENTER);
    // console.log("Todos los campos son requeridos");
    return false;
  } else if (!hayImagenes(image1, image2, image3)) {
    // insertarToast("Las 3 imágenes son obligatorias");
    // Toast.showWithGravity(
    //     "Las 3 imágenes son obligatorias",
    //     Toast.LONG,
    //     Toast.CENTER);
    console.log("Las 3 imágenes son obligatorias");
    return false;
  }
};

const estanTodosLosObligatorios = (values) => {
  let retorno = true;
  console.log(values);
  if (
    values.name === undefined ||
    values.description === undefined ||
    values.elaborationTime === undefined ||
    values.price === undefined
  ) {
    retorno = false;
  }

  if (values.name === undefined) {
    insertarToast("El nombre del producto es obligatorio");
    Vibration.vibrate(1000);
  }

  if (values.description === undefined) {
    insertarToast("La descripción del producto es obligatoria");
    Vibration.vibrate(1000);
  }

  if (values.elaborationTime === undefined) {
    insertarToast("El tiempo de elaboración del producto es obligatorio");
    Vibration.vibrate(1000);
  }

  if (values.price === undefined) {
    insertarToast("El precio del producto es obligatorio");
    Vibration.vibrate(1000);
  }
  return retorno;
};

const hayImagenes = (image1, image2, image3) => {
  let retorno = true;
  if (!image1 || !image2 || !image3) {
    if (!image1) {
      insertarToast("La imágen 1 del producto es obligatoria");
      Vibration.vibrate(1000);
    }

    if (!image2) {
      insertarToast("La imágen 2 del producto es obligatoria");
      Vibration.vibrate(1000);
    }

    if (!image3) {
      insertarToast("La imágen 3 del producto es obligatoria");
      Vibration.vibrate(1000);
    }
    retorno = false;
  }
  return retorno;
};

export default ValidacionCamposProducto;
