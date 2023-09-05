import { StyleSheet } from "react-native";

const primaryColor = "#ffffff";
const secondaryColor = "#016939";
const tertiaryColor = "#3F996E";
const fourthColor = "#59AD84";
const buttonBorderRadius = 30;
const buttonBorderRadiusImput = 20;

export default StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "40%",
  },
  logoHome: {
    width: "100%",
    height: "20%",
    marginTop: "5%",
  },
  inputContainer: {
    width: "80%",
    marginTop: 10,
  },
  input: {
    backgroundColor: primaryColor,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: buttonBorderRadiusImput,
    borderColor: fourthColor,
    borderWidth: 5,
    marginTop: "5%",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  buttonContainer2: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  button: {
    backgroundColor: secondaryColor,
    width: "80%",
    padding: 40,
    borderRadius: buttonBorderRadius,
    alignItems: "center",
    marginBottom: "8%",
  },
  buttonHome: {
    backgroundColor: secondaryColor,
    flexDirection: "row",
    width: "80%",
    padding: 10,
    borderRadius: buttonBorderRadius,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8%",
  },
  buttonHome2: {
    position: "absolute",
    marginTop: 50,
    backgroundColor: secondaryColor,
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: buttonBorderRadius,
    alignItems: "center",
    left: 320,
    bottom: 20,
  },

  buttonLogin: {
    backgroundColor: secondaryColor,
    width: "100%",
    padding: 20,
    borderRadius: buttonBorderRadiusImput,
    alignItems: "center",
  },
  buttonRole: {
    backgroundColor: tertiaryColor,
    width: "40%",
    padding: 5,

    alignItems: "center",
  },
  buttonError: {
    backgroundColor: "red",
    width: "100%",
    padding: 15,
    borderRadius: buttonBorderRadiusImput,
    alignItems: "center",
    marginBottom: 5,
  },
  buttonOutline: {
    backgroundColor: primaryColor,
    marginTop: 5,
    borderColor: fourthColor,
    borderWidth: 10,
  },
  buttonOutlinehome: {
    backgroundColor: primaryColor,
    marginTop: 5,
    borderColor: fourthColor,
    borderWidth: 5,
  },
  buttonOutlineLogin: {
    backgroundColor: primaryColor,
    marginTop: 5,
    borderColor: fourthColor,
    borderWidth: 5,
  },
  buttonOutlineRole: {
    backgroundColor: tertiaryColor,
    marginTop: 2,
  },
  buttonText: {
    color: primaryColor,
    fontWeight: "700",
    fontSize: 16,
  },
  buttonText2: {
    color: primaryColor,
    fontWeight: "700",
    fontSize: 10,
    textAlign: "center",
  },
  buttonOutlineText: {
    color: fourthColor,
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineTextRole: {
    color: secondaryColor,
    fontWeight: "700",
    fontSize: 16,
  },
  spinnerTextStyle: {
    color: "white",
  },
  spinContainer: {
    position: "absolute",
    display: "flex",
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    height: "100%",
    width: "100%",
    zIndex: 100,
  },
  textHome: {
    fontSize: 120,
    marginTop: 5,
    color: secondaryColor,
    fontWeight: "bold",
  },
  textTitleHome: {
    fontSize: 50,
    marginTop: 5,
    textAlign: "center",
    color: secondaryColor,
    fontWeight: "bold",
  },
  textDescription: {
    fontSize: 20,
    marginTop: "10%",
    color: secondaryColor,
    fontWeight: "bold",
    textAlign: "center",
    margin: 5,
  },
  qrArea: {
    width: 200,
    height: 200,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 30,
  },
});
