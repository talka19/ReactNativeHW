import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { authSignOutUser, authSignUpUser } from "../../redux/operations";
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import { db } from "../../firebase/config";
import {
  collection,
  query,
  onSnapshot,
  doc,
  getDocs,
  where,
} from "firebase/firestore";
const state = {
    userId: null,
    displayName: null,
    stateChange: false,
    displayImg: null,
    email: null,
    error: null,
};

const ProfileScreen = ({ navigation }) => {
//   const image = require("../../../assets/");

  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { email, userId, displayImg, displayName } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllComments = async (id) => {
    const q = query(collection(doc(db, "post", id), "comments"));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length;
  };

  const getAllPosts = async () => {
    const q = query(collection(db, "post"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach(async (doc) => {
        const total = await getAllComments(doc.id);
        cities.push({
          ...doc.data(),
          id: doc.id,
          total,
        });
      });
      setPosts(cities);
    });
  };
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
   });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ImageBackground style={styles.image} source={require('../../assets/Images/PhotoBG.png')}>
        <KeyboardAvoidingView
          style={styles.containerKeyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={styles.formContainer}>
              <View style={styles.avatar}>
              <Image
                  source={{ uri: displayImg }}
                  style={{
                    width: 120,
                    height: 120,
                    margin: 0,
                    padding: 0,
                    top: 12,
                  }}
                />
                <TouchableOpacity style={styles.imgAdd}>
                  <AntDesign
                    name="pluscircleo"
                    size={24}
                    color="#FF6C00"
                    onPress={() => {
                      pickImage();
                    }}
                  />
                  <MaterialIcons
                    style={{ marginLeft: 65 }}
                    name="logout"
                    size={24}
                    color="#BDBDBD"
                    onPress={() => {
                      dispatch(authSignOutUser());
                    }}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.h1}>{displayName}</Text>
              <FlatList
                style={styles.postContainer}
                data={posts}
                keyExtractor={(item) => item.id}
                totalComments={(item) => getAllComments(item.id)}
                renderItem={({ item }) => (
                  <View style={{ marginBottom: 32 }}>
                    <Image style={styles.img} source={{ uri: item.photoRef }} />
                    <View style={styles.discrContainer}>
                      <Text style={styles.title}>{item.titleText}</Text>
                      <View style={styles.containerDown}>
                        <TouchableOpacity
                          style={styles.commentsContainer}
                          onPress={() => {
                            navigation.navigate("CommentsScreen", {
                              ...item,
                            });
                          }}
                        >
                          <FontAwesome
                            style={styles.iconComments}
                            name="comment-o"
                            size={24}
                            color="#BDBDBD"
                          />
                          <Text>{item.total}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.locationContainer}
                          onPress={() => {
                            navigation.navigate("MapScreen", {
                              ...item,
                            });
                          }}
                        >
                          <Feather
                            style={styles.iconLocation}
                            name="map-pin"
                            size={24}
                            color="#BDBDBD"
                          />
                          <Text style={{ color: "#BDBDBD" }}>
                            {item.locationText}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              ></FlatList>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 300,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  containerKeyboardAvoidingView: {
    justifyContent: "flex-end",
  },
  h1: {
    // fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    // fontFamily: "Roboto-Bold",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 16,
    // fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    padding: 16,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
    paddingVertical: 16,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    // fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
  },
  login: {
    color: "#1B4371",
    // fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
    alignItems: "center",
    marginBottom: 45,
  },
  openPass: {
    alignItems: "flex-end",
    bottom: 65,
    right: 20,
  },
  showPassText: {
    color: "#1B4371",
    // fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
  },
  errorText: {
    color: "#ff0000",
    textAlign: "center",
    marginTop: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    bottom: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  formikStyle: {
    paddingHorizontal: 16,
    width: "100%",
  },
  imgAdd: {
    display: "flex",
    flexDirection: "row",
    top: -25,
    left: 110,
  },

  img: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  postContainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 32,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    // fontFamily: "Roboto-Bold",
  },
  commentsContainer: { flexDirection: "row" },
  locationContainer: { flexDirection: "row" },
  discrContainer: { flexDirection: "column" },
  iconComments: { marginRight: 6 },
  iconLocation: { marginRight: 4 },
  containerDown: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  prifileContainer: {
    width: "100%",
    paddingLeft: 16,
    display: "flex",
    flexDirection: "row",
    marginTop: 32,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  prifileImg: {
    width: 60,
    height: 60,
  },
});