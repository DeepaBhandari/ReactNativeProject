import React, { useState } from 'react';
import {
  NavigationContainer,
  DrawerActions,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LandingScreen from './screens/Landing';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import AccountScreen from './screens/Account';
import SignInScreen from './screens/SignIn';
import SignUpScreen from './screens/SignUp';
import PasswordForgetScreen from './screens/PasswordForget';
import AccountScreen from './screens/Account';
import AdminScreen from './screens/Admin';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={HomeTabs} />
      <Drawer.screen name='Account' component={AccountScreen} />
      <Drawer.Screen name='Password Forget' component={PasswordForgetScreen} />
      <Drawer.Screen name='Password Change' component={PasswordChangeScreen} />
      <Drawer.Screen name='Admin' component={AdminScreen} />
    </Drawer.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const RootStack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleSignIn = () => {
    setIsAuthenticated(true);
  };
  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  const handleSignUp = () => {
    setIsAuthenticated(true);
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {isAuthenticated ? (
          <RootStack.Screen
            name='Home'
            component={HomeDrawer}
            options={({ route, navigation }) => ({
              headerTitle: getFocusedRouteNameFromRoute(route),
              headerLeft: () => (
                <Button
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                  title='Menu'
                />
              ),
              headerRight: () => (
                <Button onPress={handleSignOut} title='Sign Out' />
              ),
            })}
          />
        ) : (
          <>
            <RootStack.Screen
              name='Landing'
              component={LandingScreen}
              options={{ animationTypeForReplace: 'pop' }}
            />
            <RootStack.Screen name='Sign In' component={SignInScreen}>
              {(props) => <SignInScreen {...props} onSignIn={handleSignIn} />}
            </RootStack.Screen>
            <RootStack.Screen name='Sign Up' component={SignUpScreen}>
              {(props) => <SignUpScreen {...props} onSignIn={handleSignUp} />}
            </RootStack.Screen>
            <RootStack.Screen
              name='Forget Password'
              component={PasswordForgetScreen}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
