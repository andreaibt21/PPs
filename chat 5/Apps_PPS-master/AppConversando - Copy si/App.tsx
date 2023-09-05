import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import IndexScreen from "./src/screens/IndexScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ChatRoomAScreen from "./src/screens/ChatRoomAScreen";
import ChatRoomBScreen from "./src/screens/ChatRoomBScreen";
import SplashScreen from "./src/screens/SplashScreen";
import AnimatedLottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

export type RootStackParamList = {
  Index: any;
  Inicio: any;
  Home: any;
  Login: any;
  SignUp: any;
  ChatA: any;
  ChatB: any;
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
  //       source={require("./assets/animation.json")}
  //     />
  //   );
  // }

  return (
    <NavigationContainer theme={DarkTheme}>
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
        <Stack.Screen name="ChatA" component={ChatRoomAScreen} />
        <Stack.Screen name="ChatB" component={ChatRoomBScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5a5a5a",
    alignItems: "center",
    justifyContent: "center",
  },
  splash: {
    backgroundColor: "#5a5a5a",
  },
});
