//import 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Button, I18nManager} from 'react-native';
import {toggleTheme} from './src/store/slices/ThemeSlices';

import {Provider} from 'react-redux';
import Login from './src/components/Login';
import MainWithDrawer from './src/components/MainWithDrawer';
import {useAppDispatch, useAppSelector} from './src/store/hooks';
import {setLanguage} from './src/store/slices/languageSlice';
import {store} from './src/store/storeIndex';
import {darkTheme, lightTheme} from './src/theme/Theme';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const isDark = useAppSelector(state => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadLang = async () => {
      const lang = await AsyncStorage.getItem('appLanguage');
      const isRTL = lang === 'sa';
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      dispatch(setLanguage((lang as 'tr' | 'en' | 'sa') || 'tr'));
    };
    loadLang();
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button
              title={isDark ? 'Light' : 'Dark'}
              onPress={() => dispatch(toggleTheme())}
            />
          ),
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={MainWithDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
