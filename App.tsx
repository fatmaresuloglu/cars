import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Button, I18nManager, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';

import {useEffect} from 'react';
import HomePage from './src/components/HomePage';
import Login from './src/components/Login';
import Page_1 from './src/components/Page_1';
import Page_2 from './src/components/Page_2';
import RTLToggle from './src/components/RTLToggle';
import {useAppDispatch, useAppSelector} from './src/store/hooks';
import {setLanguage} from './src/store/slices/languageSlice';
import {toggleTheme} from './src/store/slices/ThemeSlices';
import {store} from './src/store/storeIndex';
import {darkTheme, lightTheme} from './src/theme/Theme';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const isDark = useAppSelector(state => state.theme.isDark);
  const dispatch = useAppDispatch();
  const theme = isDark ? darkTheme : lightTheme;
  useEffect(() => {
    const loadLanguage = async () => {
      const lang = await AsyncStorage.getItem('appLanguage');
      const isRTL = lang === 'ar';
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      store.dispatch(setLanguage((lang as 'tr' | 'en' | 'ar') || 'tr'));
    };

    loadLanguage();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <RTLToggle />
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
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="Page_1" component={Page_1} />
          <Stack.Screen name="Page_2" component={Page_2} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
