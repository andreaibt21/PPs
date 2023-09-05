import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import IndexScreen from "./src/screens/IndexScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SplashScreen from "./src/screens/SplashScreen";
import AnimatedLottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
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
  Index: any;
  Inicio: any;
  SignUp: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [lottieLoad, setLottieLoad] = React.useState(false);

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
  //       source={require("./assets/animation.json")}
  //     />
  //   );
  // }

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
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
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C80E89",
    alignItems: "center",
    justifyContent: "center",
  },
  splash: {
    backgroundColor: "#C80E89",
  },
});
