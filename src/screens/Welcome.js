import React, {Component} from "react";
import { 
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  StyleSheet
} from "react-native";

const { width, height } = Dimensions.get('screen')

class Welcome extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          
          <Image source={require('../images/welcome.jpg')} style={styles.img} />
          <Text style={styles.caption}>Bayar keperluan kini semakin mudah dengan layanan dari Yuk Bayar.</Text>
          <View style={styles.account}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} activeOpacity={0.5} style={styles.login}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
            <Text style={{color: "#6c6c6c"}}>or</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} activeOpacity={0.5} style={styles.register}>
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }, 
  img: {
    width: width,
    height: width-15,
    resizeMode: "stretch"
  },
  caption: {
    fontSize: 14,
    color: "#6c6c6c",
    textAlign: "center",
    marginHorizontal: 50
  },
  account: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    //position: "absolute",
    //bottom: 20
  },
  login: {
    backgroundColor: "#e2474b",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: 10
  },
  register: {
    backgroundColor: "#0e2449",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: 10
  },
  text: {
    fontFamily: "Roboto",
    color: "#fff"
  }
})

export default Welcome;