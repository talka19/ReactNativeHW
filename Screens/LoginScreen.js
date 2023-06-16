import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import React, { useState, useEffect} from 'react';
import { Pressable, StyleSheet, 
    Text, TextInput, TouchableOpacity, 
    View,  Dimensions, TouchableWithoutFeedback, 
    Keyboard, ImageBackground
} from 'react-native';

const intialState = {
    email: "",
    password: "",
};

const width = Dimensions.get("window").width;

const LoginForm = ({navigation})=> {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [registration, setRegistration] = useState(intialState);
    const [isSecureEntry, setIsSecureEntry] = useState(true);

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
    });

    const closeKeyboard = () => {setIsShowKeyboard(false);
        Keyboard.dismiss();
    }
      
    useEffect(() => {
        setIsShowKeyboard(false);
    }, [handleSubmit]);
    
    const handleSubmit = () => {
        Keyboard.dismiss();
        setIsShowKeyboard(false);
        console.log(registration);
        setRegistration(intialState);
        
    };
    
    if (!fontsLoaded) {
      return null;
    }
    return(
        <TouchableWithoutFeedback
        onPress={closeKeyboard}
      >
        <View style={styles.form}>
        <ImageBackground style={styles.image} source={require('../assets/Images/PhotoBG.png')}>
            <View style={{ ...styles.wrapper, flex: isShowKeyboard ? 0.65 : 0.6 }}>
               <Text style={styles.title}>Увійти</Text>
               <View style={{ ...styles.inputWrapper }}>
                    <View>
                        <TextInput 
                             style={styles.input} 
                             autoCorrect={false}
                             inputmode='email' 
                             value={registration.email}
                             onChangeText={(value) =>
                                setRegistration((prevState) => ({
                                  ...prevState,
                                  email: value,
                                }))
                              }
                             placeholder='Адреса електроної пошти'/>
                    </View>
                    <View>
                        <TextInput 
                             secureTextEntry={isSecureEntry} 
                             style={styles.input} 
                             autoCapitalize="none"
                             autoCorrect={false}
                             value={registration.password}
                             placeholder='Пароль'
                             onChangeText={(value) =>
                                setRegistration((prevState) => ({
                                  ...prevState,
                                  password: value,
                                }))
                              }
                             />
                        <Pressable
                            onPress={() => {
                                setIsSecureEntry((prev) => !prev);
                                }}
                            style={[{
                                position: 'absolute',
                                right: 30,
                                marginVertical: 15,
                                opacity: 0.8,
                                                                
                            }]}>
                            <Text>{isSecureEntry ? 'Показати' : 'Приховати'}</Text>
                        </Pressable>
                    </View>
                    </View>
                        <TouchableOpacity
                           style={{ ...styles.button, width: width - 32 }}
                           activeOpacity={0.8}
                           onPress={handleSubmit}
                        >
                        <Text style={styles.button_text}>Увійти</Text>
                        </TouchableOpacity>
                    <View style={{ 
                        alignItems: 'center',
                        display: 'flex',
                        }}>
                        <Text style={styles.text}>Немає акаунта?
                        <Text> </Text>
                            <Text style={styles.text_link}
                            onPress={() => navigation.navigate("Registration")}
                            >Зареєструватися</Text>
                        </Text>
                    </View>
            </View>
        </ImageBackground>
        </View>
        </TouchableWithoutFeedback> 
    )

}

export default LoginForm

const styles = StyleSheet.create({
    form: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        height: 489,
        // borderTopLeftRadius: 25,
        // borderTopRightRadius: 25,
        justifyContent: 'flex-end',
        position: 'relative',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    wrapper: {
        backgroundColor: "#FFFFFF",
        position: "relative",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    title: {
        fontFamily: 'Roboto_500Medium',
        fontWeight: 500,
        textAlign: "center",
        color: "#212121",
        paddingTop: 32,
        fontSize: 30,
        // fontSize: 30,
        // textAlign: 'center',
        // marginTop: 92,
        // marginBottom: 32,
        // letterSpacing: 0.01,
        // color: '#212121',
    },
    input: {
        height: 50,
        padding:16,
        borderColor: '#E8E8E8',
        borderWidth: 1, 
        marginBottom: 16,
        borderRadius: 8,
        marginHorizontal: 16,
    },
    inputWrapper: {
        paddingRight: 16,
        paddingLeft: 16,
        paddingTop: 33,
        // paddingBottom: 43,
        // gap: 16,
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
        color: "#FFFFFF",
        textAlign: "center",
        // textAlign: "center",
        // color: "#212121",
        // paddingTop: 32,
        // fontSize: 30,
        // fontSize: 16,
        // color: '#FFFFFF',
    },
    text: {
        marginTop: 16,
        marginBottom: 144,
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
    }
})