import { Vibration } from "react-native";
import insertarToast from "../utils/ToastUtil";

//PRIMER NIVEL
const ValidacionCamposUsuario = (values, image, rol) => {
  console.log(rol);
  switch (rol) {
    case "clienteRegistrado":
      return ValidacionCamposClienteRegistrado(values, image);
    case "clienteAnonimo":
      return ValidacionCamposClienteAnonimo(values, image);
    case "duenio":
    case "Supervisor":
      return ValidacionCamposDuenio(values, image);
    case "empleado":
      return ValidacionCamposEmpleado(values, image);
  }
};

//SEGUNDO NIVEL
const ValidacionCamposClienteRegistrado = (values, image) => {
  let retorno = false;

  //console.log("nombre " + tieneValor(values.nombre,"nombre"));
  //console.log("apellido " + tieneValor(values.apellido,"apellido"));
  //console.log("dni " + tieneValor(values.dni,"dni"));
  //console.log("mail " + tieneValor(values.mail,"email"));
  //console.log("password " + tieneValor(values.password,"password"));
  //console.log("password " + tieneValor(values.confirmPassword,"password"));

  if (
    tieneImagen(image) &&
    tieneValor(values.nombre, "nombre") &&
    tieneValor(values.apellido, "apellido") &&
    tieneValor(values.dni, "dni") &&
    tieneValor(values.email, "email") &&
    tieneValor(values.password, "password") &&
    tieneValor(values.confirmPassword, "cpassword") &&
    estaCorrectoElMail(values.email) &&
    estaCorrectaLaClave(values.password) &&
    estaCorrectaLaClave(values.confirmPassword) &&
    esLaMismaClave(values.password, values.confirmPassword) &&
    esCorrectoElDni(values.dni)
  ) {
    retorno = true;
  }
  return retorno;
};

export const ValidacionCamposClienteAnonimo = (values, image) => {
  let retorno = false;
  if (tieneImagen(image) && tieneValor(values.nombre, "nombre")) {
    retorno = true;
  }
  return retorno;
};

export const ValidacionCamposDuenio = (values, image) => {
  //tieneImagen
  let retorno = false;

  // console.log("nombre " + tieneValor(values.nombre));
  // console.log("apellido " + tieneValor(values.apellido));
  // console.log("dni " + tieneValor(values.dni));
  // console.log("mail " + tieneValor(values.mail));
  // console.log("mail " + tieneValor(values.password));

  if (
    tieneImagen(image) &&
    tieneValor(values.nombre, "nombre") &&
    tieneValor(values.apellido, "apellido") &&
    tieneValor(values.dni, "dni") &&
    tieneValor(values.email, "email") &&
    tieneValor(values.password, "password") &&
    tieneValor(values.confirmPassword, "cpassword") &&
    estaCorrectoElMail(values.email) &&
    estaCorrectaLaClave(values.password) &&
    estaCorrectaLaClave(values.confirmPassword) &&
    esLaMismaClave(values.password, values.confirmPassword) &&
    esCorrectoElDni(values.dni)
  ) {
    retorno = true;
  }
  return retorno;
};

export const ValidacionCamposEmpleado = (values, image) => {
  //tieneImagen
  let retorno = false;

  //  console.log("nombre " + tieneValor(values.nombre));
  //  console.log("apellido " + tieneValor(values.apellido));
  //  console.log("dni " + tieneValor(values.dni));
  //  console.log("mail " + tieneValor(values.mail));
  //  console.log("mail " + tieneValor(values.password));

  if (
    tieneImagen(image) &&
    tieneValor(values.nombre, "nombre") &&
    tieneValor(values.apellido, "apellido") &&
    tieneValor(values.dni, "dni") &&
    tieneValor(values.email, "email") &&
    tieneValor(values.password, "password") &&
    tieneValor(values.confirmPassword, "cpassword") &&
    estaCorrectoElMail(values.email) &&
    estaCorrectaLaClave(values.password) &&
    estaCorrectaLaClave(values.confirmPassword) &&
    esLaMismaClave(values.password, values.confirmPassword) &&
    esCorrectoElDni(values.dni)
  ) {
    retorno = true;
  }
  return retorno;
};

//TERCER NIVEL
const tieneImagen = (image) => {
  let retorno = false;
  if (image) {
    retorno = true;
  } else {
    insertarToast("La imágen es requerida.");
    Vibration.vibrate(1000);
  }

  return retorno;
};

const tieneValor = (value, tipo) => {
  let retorno = false;
  if (value !== undefined) {
    retorno = true;
  } else {
    if (tipo == "nombre") {
      insertarToast("El nombre es requerido.");

      Vibration.vibrate(1000);
    }
    if (tipo == "apellido") {
      insertarToast("El apellido es requerido.");
      Vibration.vibrate(1000);
    }
    if (tipo == "dni") {
      insertarToast("El DNI es requerido.");
      Vibration.vibrate(1000);
    }
    if (tipo == "email") {
      insertarToast("El correo electrónico es requerido.");
      Vibration.vibrate(1000);
    }
    if (tipo == "password") {
      insertarToast("La clave es requerida.");
      Vibration.vibrate(1000);
    }
    if (tipo == "cpassword") {
      insertarToast("La confirmación de la clave es requerida.");
      Vibration.vibrate(1000);
    }
  }

  return retorno;
};

const estaCorrectoElMail = (mail) => {
  let retorno = false;
  if (mail.includes("@") && mail.includes(".")) {
    retorno = true;
  } else {
    insertarToast("Compruebe que el correo electrónico sea correcto.");
    Vibration.vibrate(1000);
  }

  return retorno;
};

const estaCorrectaLaClave = (clave) => {
  let retorno = false;
  if (clave.length > 5) {
    retorno = true;
  } else {
    insertarToast("Compruebe que la clave sea correcta.");
    Vibration.vibrate(1000);
  }
  return retorno;
};

const esLaMismaClave = (clave, confirmClave) => {
  let retorno = false;
  if (clave == confirmClave) {
    retorno = true;
  } else {
    insertarToast("Compruebe que la clave y la confirmación sean lo mismo.");
    Vibration.vibrate(1000);
  }
  return retorno;
};

const esCorrectoElDni = (dni) => {
  let retorno = false;
  if (dni.length == 8) {
    retorno = true;
  } else {
    insertarToast("Compruebe que el DNI sea correcto.");
    Vibration.vibrate(1000);
  }
  return retorno;
};

const esCorrectoElCuil = (cuil) => {
  let retorno = false;
  if (cuil.length == 11) {
    retorno = true;
  } else {
    insertarToast("Compruebe que el CUIL sea correcto.");
    Vibration.vibrate(1000);
  }
  return retorno;
};

export default ValidacionCamposUsuario;
