import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './screens/Landing';
import HomeScreen from './screens/Home';
import SignInScreen from './screens/SignIn';
import SignUpScreen from './screens/SignUp';

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
            component={HomeScreen}
            option={{
              headerRight: () => (
                <Button onPress={handleSignOut} title='Sign Out' />
              ),
            }}
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
            <RootStack.Screen name='Home' component={HomeScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
