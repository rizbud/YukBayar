import React, {Component} from "react";
import { 
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  BackHandler,
  ToastAndroid
} from "react-native";
import auth from '@react-native-firebase/auth'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: 'pass',
      emailValid: false,
      passValid: false,
      loading: false,
    }
  }
  
  backButton() {
    BackHandler.exitApp();
    return true
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backButton)
  }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener("hardwareBackPress", this.backButton)
  // }

  //Email Validator
  validEmail = (text) => {
    const {email, emailValid} = this.state
    const val = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(val.test(text) === true) {
      this.setState({emailValid: true})
      this.setState({email: text})
    } else {
      this.setState({emailValid: false})
    }
  }
  //Password Validator
  validPass = (pass) => {
    const {password, passValid} = this.state
    const val = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(val.test(pass) === true) {
      this.setState({passValid: true})
      this.setState({password: pass})
    } else {
      this.setState({passValid: false})
    }
  }

  onLogin = () => {
    const {email, password, emailValid, passValid, loading} = this.state

    if(email == '' || password == '') {
      Alert.alert('Oopss...', 'You must fill all column')
    } else if(password < 8) {
      Alert.alert('Oopss...', 'Your password must contain at least 8 characters, 1 letter, and 1 number!')
    } else if(!emailValid) {
      Alert.alert('Oopss...', 'Incorrect email address')
    } else if(!passValid) {
      Alert.alert('Oopss...', 'Your password must contain at least 8 characters, 1 letter, and 1 number!')
    } else {
      this.setState({loading: true})

      auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        this.setState({
          email: '',
          password: 'pass',
          emailValid: false,
          passValid: false,
          loading: false,
        })
        if(err.code == 'auth/user-disabled') {
          Alert.alert('Oopss...', 'This account was disabled')
        } else if(err.code == 'auth/user-not-found') {
          Alert.alert('Oopss...', 'Account not registered')
        } else if(err.code == 'auth/wrong-password') {
          Alert.alert('Oopss...', 'Wrong password')
        } else {
          Alert.alert('', err.message)
        }
      })
    }
  }

  onReg = () => {
    this.props.navigation.navigate('Register')
  }

  render() {
    if(this.state.loading) {
      return (
        <>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.caption}>Masuk dengan akun yang sudah ada dan mulai bayar keperluan anda dengan mudah.</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.input}>
                <Text type style={styles.label}>E-mail</Text>
                <TextInput editable={false} underlineColorAndroid="#6c6c6c" autoCapitalize="none" style={styles.textInput} value={this.state.email} placeholder="your@mail.com" label="E-mail" keyboardType="email-address" />
              </View>
              <View style={styles.input}>
                <Text style={styles.label}>Password</Text>
                <TextInput editable={false} underlineColorAndroid="#6c6c6c" autoCapitalize="none" style={styles.textInput} value={this.state.password} placeholder="********" label="Password" secureTextEntry={true} />
              </View>
              <TouchableOpacity disabled={true} activeOpacity={0.5} style={styles.loginButton} onPress={this.onLogin}>
                <ActivityIndicator size="small" color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 20, width: "100%"}}>
              <Text style={styles.caption}>Belum punya akun?</Text>
              <TouchableOpacity disabled={true} onPress={this.onReg} activeOpacity={0.5} style={styles.register}>
                <Text style={styles.text}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )
    }
    return (
      <>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.caption}>Masuk dengan akun yang sudah ada dan mulai bayar keperluan anda dengan mudah.</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text type style={styles.label}>E-mail</Text>
              <TextInput underlineColorAndroid="#6c6c6c" autoCapitalize="none" style={styles.textInput} onChangeText={(text) => this.validEmail(text)} placeholder="your@mail.com" label="E-mail" keyboardType="email-address" />
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>Password</Text>
              <TextInput underlineColorAndroid="#6c6c6c" autoCapitalize="none" style={styles.textInput} onChangeText={(text) => this.validPass(text)} placeholder="********" label="Password" secureTextEntry={true} />
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.loginButton} onPress={this.onLogin}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20, width: "100%"}}>
            <Text style={styles.caption}>Belum punya akun?</Text>
            <TouchableOpacity onPress={this.onReg} activeOpacity={0.5} style={styles.register}>
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create ({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff"
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  header: {
    alignItems: "center",
    marginBottom: 20
  },
  caption: {
    fontSize: 14,
    color: "#6c6c6c",
    textAlign: "center",
    marginHorizontal: 10,
    fontFamily: "Montserrat"
  },
  form: {
    width: "100%",
    borderBottomColor: "#6c6c6c",
    borderBottomWidth: 0.5
  },
  input: {
    marginVertical: 5
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Montserrat"
  },
  textInput: {
    borderColor: "#6c6c6c",
    fontFamily: "Montserrat"
  },
  loginButton: {
    backgroundColor: "#e2474b",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    marginBottom: 20,
    alignItems: "center"
  },
  text: {    
    fontFamily: "Montserrat",
    color: "#fff"
  },
  register: {
    backgroundColor: "#0e2449",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: "center"
  },
})

export default Login;