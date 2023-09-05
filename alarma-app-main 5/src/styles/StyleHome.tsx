import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',    
  },
  body: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',        
  },
  textUser:{
    fontSize: 20,  
    color: '#ff5e00',
    fontWeight: 'bold',               
},
  button: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    margin: 5,
    width: '30%',
    padding: 15,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonText2: {
    color: 'white',
    fontSize: 16,
    marginTop:30
  },
  exitSection: {
    width: '90%',
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  exitText: {
    color: 'white',
    fontSize: 20,
  },
  exitButton: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    margin: 5,
    width: '25%',
    padding: 15,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: "center",
  },
  buttonImageIcon: {
    height:500,
    width: 380,
    border: 10,
    resizeMode: 'contain',
    marginBottom: 20, 
  },  
  buttonImageIcon2: {
    height:500,
    width: 380,
    border: 10,
    resizeMode: 'contain',
    marginBottom: -20, 
  },
  buttonImageIcon3: {
    height:300,
    width: 280,
    border: 10,
    resizeMode: 'contain',
    marginBottom: -20, 
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  faIcon: {
    color: 'white',
  },
  modalContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  modalBody: {
    borderColor: 'white',
    borderWidth: 2,
    width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  modalText: {
    fontSize: 18,
    color: '#7f1620', fontWeight: 'bold', 
  },
  escapeButton: {
    backgroundColor: '#545454',
    width: '25%',
    padding: 15,
    borderColor: '#AFD5AA',
    borderWidth: 0,
    borderRadius: 25,
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#d31928',    
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
  },
  inputImage: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
    color: '#e72b58',
  },
  textInput: {
    color: '#7f1620',
    paddingLeft: 10,
    fontSize: 18,
  },
  buttonStyle: {
    backgroundColor: '#7f1620',
    borderColor: '#e72b58',
    marginTop: 20,
    margin: 5,
    width: 180,
    height: 60,
    padding: 15,
    borderRadius: 30,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  containerArriba:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    top: 20
  },
  buttonText3:{
    color: '#7f1620',
    fontSize:25,
    width: 250, 
    textAlign: 'center'
    
  }

});



