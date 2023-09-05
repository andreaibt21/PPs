import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import IndexScreen from "./src/screens/IndexScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ScannerScreen from "./src/screens/ScannerScreen";
import SplashScreen from "./src/screens/SplashScreen";
import AnimatedLottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { LogBox } from "react-native";
import { NativeBaseProvider, extendTheme } from "native-base";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

const newColorTheme = {
  brand: {
    900: "#5B8DF6",
    800: "#ffffff",
    700: "#cccccc",
  },
};
const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};
const theme = extendTheme({
  colors: newColorTheme,
});

export type RootStackParamList = {
  Home: any;
  Login: any;
  Inicio: any;
  Index: any;
  SignUp: any;
  Scanner: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // const [lottieLoad, setLottieLoad] = React.useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLottieLoad(true);
  //   }, 4000);
  // }, []);

  // if (!lottieLoad) {
  //   return (
  //     <AnimatedLottieView
  //       duration={4000}
  //       autoPlay
  //       style={styles.splash}
  //       source={require("./assets/cat.json")}
  //     />
  //   );
  // }

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff",
    },
  };

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Index"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Inicio"
            component={IndexScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUpScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Scanner"
            component={ScannerScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#006838",
    alignItems: "center",
    justifyContent: "center",
  },
  splash: {
    backgroundColor: "#006838",
  },
});
