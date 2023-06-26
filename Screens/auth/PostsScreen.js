import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity, Dimensions
} from "react-native";
// import * as ImagePicker from 'expo-image-picker';
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import {
  collection,
  query,
  onSnapshot,
  doc,
  getDocs,
} from "firebase/firestore";
const state = {
  userId: null,
  displayName: null,
  stateChange: false,
  displayImg: null,
  email: null,
  error: null,
};

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   })};

  const { email, displayImg, displayName } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllComments = async (id) => {
    const q = query(collection(doc(db, "post", id), "comments"));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length;
  };

  const getAllPosts = async () => {
    const q = query(collection(db, "post"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach(async (doc) => {
        const total = await getAllComments(doc.id);
        // console.log(total, "total")
        cities.push({
          ...doc.data(),
          id: doc.id,
          total,
        });
      });
      setPosts(cities);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.prifileContainer}>
      <Image style={styles.prifileImg} source={{ uri: displayImg }} />
      {/* <TouchableOpacity onPress={pickImage}>
                   {image && <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 16 }} />}
                   {!image && <Image
                    fadeDuration={0}
                    style={styles.add}
                    source={require("../../assets/Images/add.png")}
                />}
              
                   { image && <Image
                      fadeDuration={0}
                      style={styles.remove} source={require('../../assets/Images/addremove.png')} />}
                 </TouchableOpacity> */}
        <View style={styles.prifileText}>
            
          <Text>{displayName}</Text>
          <Text style={styles.prifileEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
                style={styles.postContainer}
                data={posts}
                keyExtractor={(item) => item.id}
                totalComments={(item) => getAllComments(item.id)}
                renderItem={({ item }) => (
                  <View style={{ marginBottom: 32 }}>
                    <Image style={styles.img} source={{ uri: item.photoRef }}/>
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
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#B4B4B4",
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode: 'cover',

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
},
  // image: {
  //   width: "100%",
  //   height: 240,
  //   marginBottom: 8,
  //   borderRadius: 8,
  // },
  postContainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 32,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    fontFamily: "Roboto-Bold",
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
  img: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
});