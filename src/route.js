import React, {Component} from "react";

//Import from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Import Screens
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Register from "./screens/Register";

//Create Stack Navigator
const Stack = createStackNavigator();

class Route extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name='Welcome'
            component={Welcome}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name='Login'
            component={Login}
            options={{
              headerStyle: {
                elevation: 0
              }
            }}
          />
          <Stack.Screen 
            name='Register'
            component={Register}
            options={{
              headerStyle: {
                elevation: 0
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default Route;