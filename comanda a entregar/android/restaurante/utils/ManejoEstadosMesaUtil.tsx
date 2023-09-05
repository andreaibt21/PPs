import { db } from "../database/firebase";
import { updateDoc, doc } from "firebase/firestore";

const nombreColeccion = "tableInfo";

const cambioEstadoMesa = async (id, estado) => {
  const ref = doc(db, nombreColeccion, id);
  await updateDoc(ref, { status: estado });
};

export const cambioMesaAsignoUsuario = async (id, mail) => {
  const ref = doc(db, "tableInfo", id);

  await updateDoc(ref, { assignedClient: mail });
};

export const cambioMesaAOcupada = (id) => {
  cambioEstadoMesa(id, "ocupada");
};

export const cambioMesaAFree = (id) => {
  cambioEstadoMesa(id, "free");
  cambioMesaAsignoUsuario(id, "");
};

export const cambioMesaAReservada = (id) => {
  cambioEstadoMesa(id, "reservada");
};
