import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRoute } from "../router";
import { authStateChanged } from "../redux/operations";

const MainComponent = () => {
  const userState = useSelector((state) => state.auth.stateChange);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  const routing = useRoute(userState);

  return (
    <NavigationContainer>
      <View style={styles.container}>{routing}</View>
    </NavigationContainer>
  );
};

export default MainComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});