import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import { Provider } from "react-redux";
import MainComponent from "./redux/MainComponent";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View, StyleSheet } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regulat": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <MainComponent />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});




