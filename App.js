import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Splash from './src/screens/onboarding/Splash';
import Login from './src/screens/auth/Login';
import AboutMe from './src/screens/drawerScreens/AboutMe';
import Home from './src/screens/drawerScreens/Home';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {Store} from './src/data/redux/store';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomePage"
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="AboutMe"
        component={AboutMe}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
// const theme = {
//   ...DefaultTheme,
//   roundness: 2,
//   placeholder: '#ff0000',
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#3498db',
//     accent: '#f1c40f',
//   },
// };

const App = () => {
  return (
    <Provider store={Store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="Home"
              component={DrawerRoutes}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
