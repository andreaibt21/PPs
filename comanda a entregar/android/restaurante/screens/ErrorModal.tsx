import React, { useState } from "react";
import type { PropsWithChildren } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";

function ErrorModal(): JSX.Element {
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showErrorModal = (message: string) => {
    setErrorMessage(message);
    setErrorModalVisible(true);
  };

  return (
    <Modal
      isVisible={errorModalVisible}
      onBackdropPress={() => setErrorModalVisible(false)}
    >
      <View style={stylesModal.modalContent}>
        <TouchableOpacity onPress={() => setErrorModalVisible(false)}>
          <Text style={stylesModal.modalMessage}>{errorMessage}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const stylesModal = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  contactPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 5,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ErrorModal;
