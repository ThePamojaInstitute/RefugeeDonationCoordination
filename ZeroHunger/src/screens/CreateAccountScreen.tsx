import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, GestureResponderEvent, NativeSyntheticEvent, TextInputSubmitEditingEventData, Keyboard } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { createUser } from "../controllers/auth";
import { AuthContext } from "../context/AuthContext";
import { useAlert } from "../context/Alert";
import {
  useFonts,
  PublicSans_600SemiBold,
  PublicSans_500Medium,
  PublicSans_400Regular,
} from '@expo-google-fonts/public-sans';
import { Colors, globalStyles } from "../../styles/globalStyleSheet";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const CreateAccountScreen = ({ navigation }) => {
  const [loaded, setLoaded] = useState(false)
  let [fontsLoaded] = useFonts({
    PublicSans_400Regular,
    PublicSans_500Medium,
    PublicSans_600SemiBold,
  })

  useEffect(() => {
    setLoaded(fontsLoaded)
  }, [fontsLoaded])

  const email_input = useRef<TextInput | null>(null)
  const password_input = useRef<TextInput | null>(null)
  const confPassword_input = useRef<TextInput | null>(null)

  const { user, loading, dispatch } = useContext(AuthContext)
  const { dispatch: alert } = useAlert()

  useFocusEffect(() => {
    if (user) {
      navigation.navigate('HomeScreen')
    }
  })

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPass, setConfPass] = useState("")
  const [hidePass, setHidePass] = useState(true)
  const [hideConfPass, setHideConfPass] = useState(true)
  const [isAccepted, setIsAccepted] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [errField, setErrField] = useState("")

  const handleErrorMessage = (error: string) => {
    if (error.toLowerCase().includes('username')) {
      setErrField('username')
      setErrMsg(error)
    } else if (error.toLowerCase().includes('email')) {
      setErrField('email')
      setErrMsg(error)
    } else if ((error.toLowerCase().includes('password') &&
      !error.toLowerCase().includes('confirmation')) &&
      error != "The passwords you entered do not match") {
      setErrField('password')
      setErrMsg(error)
    } else if ((error.toLowerCase().includes('password') &&
      error.toLowerCase().includes('confirmation')) ||
      error === "The passwords you entered do not match") {
      setErrField('confPass')
      setErrMsg(error)
    } else if (error.toLowerCase().includes('terms')) {
      setErrField('terms')
      setErrMsg(error)
    } else {
      alert!({ type: 'open', message: error, alertType: 'error' })
    }
  }

  const handleSignUp = (e: (GestureResponderEvent |
    NativeSyntheticEvent<TextInputSubmitEditingEventData>)) => {
    e.preventDefault()
    Keyboard.dismiss()
    dispatch({ type: "SIGNUP_START", payload: null })
    createUser({
      "username": username,
      "email": email,
      "password": password,
      "confPassword": confPass
    }, isAccepted).then(res => {
      if (res.msg === "success") {
        dispatch({ type: "SIGNUP_SUCCESS", payload: res.res })
        alert!({ type: 'open', message: 'Account created successfully!', alertType: 'success' })
        navigation.navigate('LoginScreen')
      } else if (res.msg === "failure") {
        dispatch({ type: "SIGNUP_FAILURE", payload: res.res })
        const error = res.res[Object.keys(res.res)[0]] ? res.res[Object.keys(res.res)[0]][0] : "An error occurred"
        handleErrorMessage(error)
      } else {
        dispatch({ type: "SIGNUP_FAILURE", payload: res.res })
        const error = res.msg ? res.msg : "An error occurred"
        handleErrorMessage(error)
      }
    })
  }

  return (
    <View testID="SignUp.container" style={styles.container}>
      {!loaded && <Text>Loading...</Text>}
      {loaded &&
        <>
          <Text>{loading && "Loading..."}</Text>
          <View testID="SignUp.usernameInputContainer" style={globalStyles.inputContainer}>
            <Text testID="SignUp.usernameLabel" style={[globalStyles.inputLabel,
            { color: `${(errField === 'username') ? Colors.alert2 : Colors.dark}` }]}
            >Username</Text>
            <TextInput
              nativeID="SignUp.usernameInput"
              testID="SignUp.usernameInput"
              style={[globalStyles.input,
              { borderColor: `${(errField === 'username') ? Colors.alert2 : Colors.midLight}` }]}
              onChangeText={newText => {
                setUsername(newText)
                setErrField('')
              }}
              onChange={() => { if (errField === 'username') setErrField('') }}
              blurOnSubmit={false}
              onSubmitEditing={() => email_input.current?.focus()}
              maxLength={64}
            />
          </View>
          {(errField === 'username') &&
            <View testID="SignUp.usernameErrMsgContainer" style={globalStyles.errorMsgContainer}>
              <Text testID="SignUp.usernameErrMsg" style={globalStyles.errorMsg}>{errMsg}</Text>
            </View>}
          <View testID="SignUp.emailInputContainer" style={globalStyles.inputContainer}>
            <Text testID="SignUp.emailLabel" style={[globalStyles.inputLabel,
            { color: `${(errField === 'email') ? Colors.alert2 : Colors.dark}` }]}
            >Email Address</Text>
            <TextInput
              nativeID="SignUp.emailInput"
              testID="SignUp.emailInput"
              style={[globalStyles.input, { borderColor: `${(errField === 'email') ? Colors.alert2 : Colors.midLight}` }]}
              secureTextEntry={false}
              onChangeText={newText => {
                setEmail(newText)
                setErrField('')
              }}
              onChange={() => { if (errField === 'email') setErrField('') }}
              ref={email_input}
              blurOnSubmit={false}
              onSubmitEditing={() => password_input.current?.focus()}
            />
          </View>
          {(errField === 'email') &&
            <View testID="SignUp.emailErrMsgContainer" style={globalStyles.errorMsgContainer}>
              <Text testID="SignUp.emailErrMsg" style={globalStyles.errorMsg}>{errMsg}</Text>
            </View>}
          <View testID="SignUp.passwordInputContainer" style={globalStyles.inputContainer}>
            <Text testID="SignUp.passwordLabel" style={[globalStyles.inputLabel,
            { color: `${(errField === 'password') ? Colors.alert2 : Colors.dark}` }]}
            >Password</Text>
            <View testID="SignUp.innerPasswordInputContainer" style={[globalStyles.passwordInputContainer,
            { borderColor: `${(errField === 'password') ? Colors.alert2 : Colors.midLight}` }]}>
              <TextInput
                nativeID="SignUp.passwordInput"
                testID="SignUp.passwordInput"
                style={globalStyles.passwordInput}
                secureTextEntry={hidePass}
                onChangeText={newText => {
                  setPassword(newText)
                  setErrField('')
                }}
                onChange={() => { if (errField === 'password') setErrField('') }}
                ref={password_input}
                blurOnSubmit={false}
                onSubmitEditing={() => confPassword_input.current?.focus()}
                maxLength={64}
              />
              <Ionicons
                testID="eyeIcon"
                name={hidePass ? "eye-off-outline" : "eye-outline"}
                size={22}
                onPress={() => setHidePass(!hidePass)}
                style={{ padding: 9 }} />
            </View>
          </View>
          {(errField === 'password') &&
            <View testID="SignUp.passwordErrMsgContainer" style={globalStyles.errorMsgContainer}>
              <Text testID="SignUp.passwordErrMsg" style={globalStyles.errorMsg}>{errMsg}</Text>
            </View>}
          <View testID="SignUp.confPasswordInputContainer" style={globalStyles.inputContainer}>
            <Text testID="SignUp.confPasswordLabel" style={[globalStyles.inputLabel,
            { color: `${(errField === 'confPass') ? Colors.alert2 : Colors.dark}` }]}
            >Confirm Password</Text>
            <View testID="SignUp.innerconfPasswordInputContainer" style={[globalStyles.passwordInputContainer,
            { borderColor: `${(errField === 'confPass') ? Colors.alert2 : Colors.midLight}` }]}>
              <TextInput
                nativeID="SignUp.confPasswordInput"
                testID="SignUp.confPasswordInput"
                style={globalStyles.passwordInput}
                secureTextEntry={hideConfPass}
                onChangeText={newText => {
                  setConfPass(newText)
                  setErrField('')
                }}
                onChange={() => { if (errField === 'confPass') setErrField('') }}
                ref={confPassword_input}
                blurOnSubmit={false}
                onSubmitEditing={handleSignUp}
                maxLength={64}
              />
              <Ionicons
                testID="confEyeIcon"
                name={hideConfPass ? "eye-off-outline" : "eye-outline"}
                size={22}
                onPress={() => setHideConfPass(!hideConfPass)}
                style={{ padding: 9 }} />
            </View>
          </View>
          {(errField === 'confPass') &&
            <View testID="SignUp.confPasswordErrMsgContainer" style={globalStyles.errorMsgContainer}>
              <Text testID="SignUp.confPasswordErrMsg" style={globalStyles.errorMsg}>{errMsg}</Text>
            </View>}
          <View testID="SignUp.termsAndCondContainer" style={styles.termsAndCondContainer}>
            <Text testID="SignUp.termsInputLabel" style={[globalStyles.inputLabel,
            { color: `${(errField === 'terms') ? Colors.alert2 : Colors.dark}` }]}>Terms and Conditions</Text>
            <Text testID="SignUp.termsAndCondText" style={styles.termsAndCondText}>Read our <Text testID="SignUp.termsAndCondLink" style={{ textDecorationLine: 'underline' }}
              onPress={() => console.log("terms and conditions")}
            >terms and conditions.</Text></Text>
            {(errField === 'terms') &&
              <Text
                testID="SignUp.termsAndCondErrMsg"
                style={{
                  fontFamily: 'PublicSans_400Regular',
                  fontSize: 13,
                  color: Colors.alert2
                }}>Please accept terms and conditions</Text>}
            <View testID="SignUp.checkboxContainer" style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons testID="SignUp.checkbox" name={isAccepted ? "checkbox-marked" : "checkbox-blank-outline"} size={22}
                onPress={() => {
                  if (errField === 'terms') setErrField('')
                  setIsAccepted(!isAccepted)
                }} />
              <Text testID="SignUp.termsAndCondAcceptText" style={styles.termsAndCondAcceptText}>I accept</Text>
            </View>
          </View>
          <TouchableOpacity testID="SignUp.Button" style={globalStyles.defaultBtn} onPress={handleSignUp}>
            <Text style={globalStyles.defaultBtnLabel}>Sign Up</Text>
          </TouchableOpacity>
        </>
      }
    </View>
  );
}

export default CreateAccountScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFF1F7",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  termsAndCondContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    gap: 9,
    width: "90%",
    marginTop: 5,
  },
  termsAndCondText: {
    fontFamily: 'PublicSans_400Regular',
    fontSize: 13,
    color: '#656565'
  },
  termsAndCondAcceptText: {
    fontFamily: 'PublicSans_400Regular',
    fontSize: 16,
    color: Colors.dark,
    marginLeft: 5
  },
});