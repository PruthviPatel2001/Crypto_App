import { AppRegistry, LogBox, StyleSheet, Text, View } from "react-native";
import { applyMiddleware, legacy_createStore as createStore } from "redux";

import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import Tabs from "./navigation/Tabs";
import { Welcome } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import rootReducers from "./stores/rootReducers";
import thunk from "redux-thunk";
import { useFonts } from "expo-font";

const store = createStore(rootReducers, applyMiddleware(thunk));

const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoBlack: require("./assets/fonts/Roboto-Black.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      {LogBox.ignoreAllLogs()}
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"Welcome"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Welcome" component={Welcome}/>
          <Stack.Screen name="MainLayout" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
