import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const RegistrationForm = () => {

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
      });
    
      if (!fontsLoaded) {
        return null;
      }

    return(
        <View style={styles.form}>
            <View>
             <Text style={styles.title}>Реєстрація</Text>
              <TextInput style={styles.input} defaultValue='Логін'/>
              <TextInput style={styles.input} defaultValue='Адреса електроної пошти'/>
              <TextInput style={styles.input} defaultValue='Пароль'/>
              <TouchableOpacity
                    // onPress={buttonClickedHandler}
                    style={styles.button}>
                <Text style={styles.button_text}>Зареєструватися</Text>
                </TouchableOpacity>
              <Text style={styles.text}>Вже є акаунт? Увійти</Text>
            </View>
        </View>
    )
}

export default RegistrationForm

const styles = StyleSheet.create({
    form: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        width: 375,
        height: 549,
        marginTop: 263,
        boxShadow: '0 4 4 rgba(0, 0, 0, 0.25)',
    },
    title: {
        width: 184,
        height: 35,
        fontFamily: 'Roboto_500Medium',
        fontWeight: 500,
        fontSize: 30,
        lineHeight: 35,
        textAlign: 'center',
        marginTop: 92,
        marginBottom: 32,
        marginLeft: 16,
        marginRight: 16,
        alignSelf : "center",
        letterSpacing: 0.01,
        color: '#212121',
    },
    input: {
        height: 50,
        padding:16,
        borderColor: '#E8E8E8',
        borderWidth: 1, 
        marginBottom: 16,
        borderRadius: 8,
    },
    button: {
        alignItems: 'center',
        paddingBottom: 16,
        paddingTop: 16,
        paddingLeft: 32,
        paddingRight: 32,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 343,
        backgroundColor: '#FF6C00',
        borderRadius: 100,
    },
    button_text:{
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
    },
    text: {
        marginTop: 16,
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 19,
        textAlign: "center",
        color: "#1B4371"
    }
})