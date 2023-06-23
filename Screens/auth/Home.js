import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

// import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/operations";
import { useDispatch } from "react-redux";

const Tab = createBottomTabNavigator();

export const Home = ({ navigation  }) => {
  const dispatch = useDispatch();
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerRight: () => (
            <MaterialIcons
              style={{ marginRight: 20 }}
              name="logout"
              size={24}
              color="#BDBDBD"
              onPress={() => {
                dispatch(authSignOutUser());
              }}
            />
          ),
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          headerTitle: "Публікації",
          tabBarActiveTintColor: "#FFFFFF",
          tabBarItemStyle: { borderRadius: 40 },
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="grid-outline" size={24} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              style={{ marginLeft: 20 }}
              onPress={() => {
                navigation.goBack();
              }}
              name="arrow-back"
              size={24}
              color="black"
            />
          ),

          tabBarShowLabel: false,
          headerTitle: "Створити публікацію",
          tabBarActiveTintColor: "#FFFFFF",
          tabBarItemStyle: { borderRadius: 40 },
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="add" size={30} color={color} />
          ),
        })}
        name="Creat"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              style={{ marginLeft: 20 }}
              onPress={() => {
                navigation.goBack();
              }}
              name="arrow-back"
              size={24}
              color="black"
            />
          ),
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarItemStyle: { borderRadius: 40 },
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        })}
        name={"Profile"}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});