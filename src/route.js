import React, {Component} from "react";

//Import from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Import Screens
import Launch from "./screens/Launch";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Loading from "./screens/Loading";
import Scan from './screens/Scan'
import TopUp from './screens/TopUp'
import Kirim from './screens/Kirim'
import Minta from './screens/Minta'

//Import Firebase
import auth from '@react-native-firebase/auth'

//Create Stack Navigator
const Stack = createStackNavigator();

class Route extends Component {
  state = {
    loading: true,
    isSignIn: null
  }
  timeConsuming = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        3000
      )
    )
  }

  async componentDidMount() {
    const time = await this.timeConsuming()
    if(time !== null) {
      auth().onAuthStateChanged(user => {
        if(user) {
          this.setState({loading: false, isSignIn: true})
        } else {
          this.setState({loading: false, isSignIn: false})
        }
      })
    }
  }

  render() {
    if(this.state.loading) {
      return <Launch />
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.isSignIn ? (
            <>
            <Stack.Screen 
              name='Loading'
              component={Loading}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen 
              name='Home'
              component={Home}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen 
              name='Scan'
              component={Scan}
              options={{
                headerShown: false
              }}
            /> 
            <Stack.Screen 
              name='TopUp'
              component={TopUp}
              options={{
                title: 'Top Up',
                headerStyle: {
                  backgroundColor: '#4c84ad'
                },
                headerTitleStyle: {
                  fontFamily: 'Montserrat-SemiBold'
                },
                headerTintColor: '#fff'
              }}
            /> 
            <Stack.Screen 
              name='Kirim'
              component={Kirim}
              options={{
                title: 'Kirim Saldo',
                headerStyle: {
                  backgroundColor: '#4c84ad'
                },
                headerTitleStyle: {
                  fontFamily: 'Montserrat-SemiBold'
                },
                headerTintColor: '#fff'
              }}
            /> 
            <Stack.Screen 
              name='Minta'
              component={Minta}
              options={{
                title: 'Minta Saldo',
                headerStyle: {
                  backgroundColor: '#4c84ad'
                },
                headerTitleStyle: {
                  fontFamily: 'Montserrat-SemiBold'
                },
                headerTintColor: '#fff'
              }}
            /> 
            </>
          ) : (
            <>
            <Stack.Screen 
              name='Login'
              component={Login}
              options={{
                headerStyle: {
                  elevation: 0
                },
                headerLeft: false,
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen 
              name='Register'
              component={Register}
              options={{
                headerStyle: {
                  elevation: 0
                },
                headerLeft: false,
                headerTitleAlign: 'center'
              }}
            />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default Route;