import React, { useEffect, useState } from 'react';
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { ImageBackground, 
    StyleSheet, Text, 
    TextInput, TouchableOpacity, 
    View, KeyboardAvoidingView, 
    Platform,  Dimensions, 
    TouchableWithoutFeedback, Keyboard, Image
} from "react-native"
import * as ImagePicker from 'expo-image-picker';

const initialState = {
    login: "",
    email: "",
    password: "",
}

const width = Dimensions.get("window").width;

const RegistrationForm = ({navigation}) => {
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [registration, setRegistration] = useState(initialState);
    const [image, setImage] = useState(null);

    useEffect(() => {
        setIsShowKeyboard(false);
    }, [handleSubmit]);
    
    const handleSubmit = () => {
        Keyboard.dismiss();
        setIsShowKeyboard(false);
        console.log(registration )
        setRegistration(initialState);
    };
    const closeKeyboard = () => {setIsShowKeyboard(false);
        Keyboard.dismiss(); 
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
      else {
        setImage(null)
       }
    };

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
      });
    
      if (!fontsLoaded) {
        return null;
      }

    return(
        <TouchableWithoutFeedback onPress={closeKeyboard}>
        <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../../assets/Images/PhotoBG.png')}>
        <KeyboardAvoidingView  style={styles.containerKeyboardAvoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{...styles.form, paddingBottom: isShowKeyboard ? 0 : 78 }}>
                <View style={{...styles.avatar,  left: (width - 120) / 2 }}>
                <TouchableOpacity onPress={pickImage}>
                   {image && <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 16 }} />}
                   {!image && <Image
                    fadeDuration={0}
                    style={styles.add}
                    source={require("../../assets/Images/add.png")}
                />}
              
                   { image && <Image
                      fadeDuration={0}
                      style={styles.remove} source={require('../../assets/Images/addremove.png')} />}
                 </TouchableOpacity>
                    </View>    
                  <Text style={styles.title}>Реєстрація</Text>
                  <View style={{ ...styles.inputWrapper }}>
                  <View>
                    <TextInput 
                         style={styles.input} 
                         fontSize={16}
                         autoCapitalize="none"
                         autoCorrect={false}
                         placeholder='Логін'
                         value={registration.login}
                         backgroundColor='#F6F6F6'
                         onFocus={() => {setIsShowKeyboard(true)}}
                         onChangeText={(value) => setRegistration((prevState) => ({...prevState, login: value}))}
                         />
                    </View>
                    <TextInput 
                        style={styles.input} 
                        fontSize={16}
                        autoCapitalize="none"
                        value={registration.email}
                        placeholder='Адреса електроної пошти'
                        backgroundColor='#F6F6F6'
                        onFocus={() => {setIsShowKeyboard(true)}}
                        onChangeText={(value) => setRegistration((prevState) => ({...prevState, email: value}))}
                    />
                   <View>
                        <TextInput 
                             secureTextEntry={isSecureEntry} 
                             style={styles.input} 
                             fontSize={16}
                             value={registration.password}
                             autoCapitalize="none"
                             autoCorrect={false}
                             placeholder='Пароль'
                             backgroundColor='#F6F6F6'
                             onFocus={() => {setIsShowKeyboard(true)}}
                             onChangeText={(value) =>
                                setRegistration((prevState) => ({
                                  ...prevState,
                                  password: value,
                                }))
                              }
                             />
                        <Text
                            onPress={() => {
                                setIsSecureEntry((prev) => !prev);
                                }}
                            style={[{
                                position: 'absolute',
                                fontSize: 16,
                                right: 30,
                                marginVertical: 13,
                                color: '#1B4371',                
                            }]}>{isSecureEntry ? 'Показати' : 'Приховати'}
                        </Text>
                     </View>  
                    </View>
                   <TouchableOpacity
                        style={{ ...styles.button, width: width - 32 }}
                        activeOpacity={0.8}
                        onPress={handleSubmit}
                    >
                    <Text style={styles.button_text}>Зареєструватися</Text>
                    </TouchableOpacity>
                    <View style={{
                        }}>
                        <Text style={styles.text}>Вже є акаунт?
                            <Text> </Text>
                            <Text style={styles.text_link}
                            onPress={() => navigation.navigate("Login")}
                            >Увійти</Text></Text>
                    </View>
                  
            </View>
        </KeyboardAvoidingView>
        </ImageBackground>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default RegistrationForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      image: {
        flex: 1,
        justifyContent: 'flex-end',
        resizeMode: 'cover',

        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    form: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: "center",
    },
    avatar: {
        top: -60,
        position: "absolute",
        width: 120,
        height: 120,
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
        zIndex:999
    },
    inputWrapper: {
        marginHorizontal: 30,
        gap: 16,
        paddingTop: 32,
        paddingBottom: 43,
    },
    title: {
        fontFamily: 'Roboto_500Medium',
        fontWeight: 500,
        fontSize: 30,
        textAlign: 'center',
        marginTop: 92,
        letterSpacing: 0.01,
        color: '#212121',
    },
    input: {
        width: 343,
        height: 50,
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#E8E8E8',
    },
    button: {
        marginRight: 16,
        marginLeft: 16,
        height: 51,
        backgroundColor: "#FF6C00",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },
    button_text:{
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        color: '#FFFFFF',
    },
    text: {
        marginTop: 16,
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 19,
        textAlign: "center",
        color: "#1B4371",
        fontFamily: 'Roboto_400Regular',
    },
    text_link: {
        fontSize: 16,
        lineHeight: 19,
        color: "#1B4371",
        textDecorationLine: 'underline',
    },
    add: {
        position: "absolute",
       top: 81,
       right: -10,
       
     },
     remove: {
       position: "absolute",
       top: 81,
       right: -18,
    },
    containerKeyboardAvoidingView: {
        justifyContent: "flex-end",
    },
})