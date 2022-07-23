import { AppRegistry, StyleSheet, Text, View } from "react-native";
import { applyMiddleware, legacy_createStore as createStore } from "redux";

import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import Tabs from "./navigation/Tabs";
import { createStackNavigator } from "@react-navigation/stack";
import rootReducers from "./stores/rootReducers";
import thunk from "redux-thunk";

const store = createStore(rootReducers, applyMiddleware(thunk));

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"MainLayout"}
          screenOptions={{
            headerShown: false,
          }}
        >
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
