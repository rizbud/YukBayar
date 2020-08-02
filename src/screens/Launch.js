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

class Launch extends Component {  
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          
          <Image source={require('../images/launch.jpg')} style={styles.img} />
          <Text style={styles.caption}>Bayar keperluan kini semakin mudah dengan layanan dari YukBayar.</Text>
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
    fontSize: 15,
    color: "#6c6c6c",
    textAlign: "center",
    marginHorizontal: 50,
    fontFamily: "Montserrat"
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

export default Launch;