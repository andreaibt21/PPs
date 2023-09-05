import { StyleSheet } from "react-native";

const primaryColor = '#ff5e00';
const secondaryColor = '#4a4b4a';
const tertiaryColor = '#6b2d04';
const fourthColor = '#fff';
const buttonBorderRadius = 100;

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '100%',
        height: '50%',
        top: '-10%',
    },
    logoIndex: {
        width: '100%',
        height: '50%',
        
    },
    logoHome: {
        width: '100%',
        height: '20%',
        marginTop: '10%',
    },
    logoLogin: {
        width: '100%',
        height: '30%',
        marginTop: '-20%'

    },
    inputContainer: {
        width: '80%',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: tertiaryColor,
        color: 'white',        
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: buttonBorderRadius,
        marginTop: '5%',
      width: '80%'
    },
    image: {
        flex: 1,
        justifyContent: 'center'
      },
      seleccione:{
        fontSize: 20,
        color: tertiaryColor,
        fontWeight: 'bold',     
      }
      ,
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
    
    },
    buttonContainerIndex: {
        width: '80%',
        display: 'flex',
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
       
    },
    button: {
        backgroundColor: primaryColor,
        width: 114,
        padding: 30,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
        margin:10
    },
    buttonOutline2: {
        backgroundColor: fourthColor,
        borderColor: primaryColor,
        borderWidth: 2,
    },
    buttonLogin: {
        backgroundColor: primaryColor,
        width: '50%',
        padding: 10,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
    },
    buttonRole: {
        backgroundColor: secondaryColor,
        width: 150,
        padding: 5,
        height: 50,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonError: {
        backgroundColor: secondaryColor,
        width: '100%',
        padding: 15,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: fourthColor,
        marginTop: 5,
        borderColor: primaryColor,
        borderWidth: 2,
    },
    buttonRegister: {
        marginTop: '15%',
    },
    buttonOutlineRole: {
        backgroundColor: secondaryColor,
        marginTop: 5,
        borderColor: secondaryColor,
        borderWidth: 2,
    },
    buttonText: {
        color: fourthColor,
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: primaryColor,
        fontWeight: '700',
        fontSize: 16,
    },
    buttonRegisterText: {        
        color: fourthColor,
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineTextRole: {
        color: primaryColor,
        fontWeight: '700',
        fontSize: 16,
    },
    spinnerTextStyle: {
        color: 'white',
    },
    spinContainer: {
        position: 'absolute',
        display: 'flex',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        height: '100%',
        width: '100%',
        zIndex: 100,
    },
    textHome:{
        fontSize: 60,
        marginTop: 40, 
        color: secondaryColor,
        fontWeight: 'bold',        
    },
    textDescription:{
        fontSize: 20,
        marginTop: '10%', 
        color: secondaryColor,
        fontWeight: 'bold',  
        textAlign: 'center',
        margin: 5,
    },   

    
})