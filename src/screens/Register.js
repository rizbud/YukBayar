import React, {Component} from "react";
import { 
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Alert
} from "react-native";

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      confirm: '',
      emailValid: false,
      passValid: false
    }
  }

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

  onRegister = () => {
    const {name, email, confirm, password, emailValid, passValid} = this.state

    if(name == '' || email == '' || password == '' || confirm == '') {
      Alert.alert('Oops...', 'You must fill all column')
    } else if(!emailValid) {
      Alert.alert('Oops...', 'Incorrect email address')
    } else if(!passValid) {
      Alert.alert('Oopss...', 'Your password must contain at least 8 characters, 1 letter and 1 number!')
    } else if(password != confirm) {
      Alert.alert('Oops...', 'Your password doesn\'t match')
    } else {
      Alert.alert('', 'Sukses')
    }
  }

  onLogin = () => {
    this.props.navigation.popToTop()
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.caption}>Buat akun baru dan mulai bayar keperluan anda dengan mudah.</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text type style={styles.label}>Nama</Text>
              <TextInput underlineColorAndroid="#6c6c6c" autoCapitalize="words" style={styles.textInput} onChangeText={(name) => this.setState({name})} placeholder="John Doe" label="Name" />
            </View>
            <View style={styles.input}>
              <Text type style={styles.label}>E-mail</Text>
              <TextInput underlineColorAndroid="#6c6c6c" autoCapitalize="none" style={styles.textInput} onChangeText={(text) => this.validEmail(text)} placeholder="your@mail.com" label="E-mail" keyboardType="email-address" />
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>Password</Text>
              <TextInput underlineColorAndroid="#6c6c6c" autoCapitalize="none" style={styles.textInput} onChangeText={(text) => this.validPass(text)} placeholder="Password" label="Password" secureTextEntry={true} />
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput underlineColorAndroid="#6c6c6c" autoCapitalize="none" style={styles.textInput} onChangeText={(confirm) => this.setState({confirm})} placeholder="Password" label="Password" secureTextEntry={true} />
            </View>
            <TouchableOpacity onPress={this.onRegister} activeOpacity={0.5} style={styles.register}>
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20, width: "100%"}}>
            <Text style={styles.caption}>Sudah punya akun?</Text>
            <TouchableOpacity activeOpacity={0.5} style={styles.loginButton} onPress={this.onLogin}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 20
  },
  header: {
    alignItems: "center",
    marginBottom: 20
  },
  caption: {
    fontSize: 14,
    color: "#6c6c6c",
    textAlign: "center",
    marginHorizontal: 10
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
  },
  textInput: {
    borderColor: "#6c6c6c",
  },
  loginButton: {
    backgroundColor: "#e2474b",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: "center"
  },
  text: {    
    fontFamily: "Roboto",
    color: "#fff"
  },
  register: {
    backgroundColor: "#0e2449",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    marginBottom: 20,
    alignItems: "center"
  },
})

export default Register;