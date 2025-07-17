import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  I18nManager,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import {Button, Card} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {setLanguage} from '../store/slices/languageSlice';
import {useLoginUserMutation} from '../store/slices/userSlice';
import {store} from '../store/storeIndex';
import {darkTheme, lightTheme} from '../theme/Theme';
import {useTranslation} from '../translate/useTranslation';

type RootStackParamList = {
  Main: undefined;
  HomePage: undefined;
};

const Login = () => {
  const {t} = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const [loginUser, {isLoading}] = useLoginUserMutation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert(t.Warning, t.WarningMessage2);
      return;
    }

    loginUser({username: username.trim(), password: password.trim()})
      .unwrap()
      .then((response: any) => {
        if (response && response.username) {
          navigation.navigate('Main');
        } else {
          Alert.alert(t.Warning, t.WarningMessage2);
        }
      });
  };

  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);
  const LANGUAGE_KEY = 'appLanguage';
  const toggleRTL = async (lang: 'sa' | 'tr' | 'en') => {
    const newRTL = lang === 'sa';
    store.dispatch(setLanguage(lang));
    console.log(isRTL);
    if (isRTL !== newRTL) {
      I18nManager.allowRTL(newRTL);
      I18nManager.forceRTL(newRTL);
      setIsRTL(newRTL);
    }
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  };

  const isDark = useAppSelector(state => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View
        style={{
          flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <Image
          source={require('../../assets/icons/favicon.png')}
          style={{
            width: 90,
            height: 90,
            resizeMode: 'contain',
            marginHorizontal: 10,
          }}
        />
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: I18nManager.isRTL ? 'right' : 'left',
          }}>
          Stellar Teknoloji
        </Text>
      </View>

      <Card
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            padding: 50,
          },
        ]}>
        <View style={styles.inputWrapper}>
          {username && (
            <Text
              style={[
                styles.floatingLabel,
                {textAlign: I18nManager.isRTL ? 'right' : 'left'},
                {color: theme.colors.text},
              ]}>
              {t.username}
            </Text>
          )}

          <TextInput
            style={[
              styles.input,
              {
                color: theme.colors.text,
                borderColor: theme.colors.border,
                backgroundColor: theme.inputColors.background,
              },
            ]}
            placeholder={t.username}
            placeholderTextColor={theme.colors.text}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputWrapper}>
          {password && (
            <Text
              style={[
                styles.floatingLabel,

                {textAlign: 'center'},
                {color: theme.colors.text},
              ]}>
              {t.password}
            </Text>
          )}

          <TextInput
            style={[
              styles.input,
              {
                color: theme.colors.text,
                borderColor: theme.colors.border,
                backgroundColor: theme.inputColors.background,
              },
            ]}
            placeholder={t.password}
            placeholderTextColor={theme.colors.text}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{t.login}</Text>
          )}
        </TouchableOpacity>

        <View
          style={[
            styles.buttonLanguage,
            {
              backgroundColor: theme.inputColors.background,
              borderColor: theme.colors.border,
            },
          ]}>
          <Button
            onPress={() => toggleRTL('tr')}
            labelStyle={{color: theme.colors.text}}
            contentStyle={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: theme.colors.text}}>TR</Text>
              <View style={{width: 5}} />
              <CountryFlag isoCode="TR" size={18} />
            </View>
          </Button>
          <Button
            onPress={() => toggleRTL('en')}
            labelStyle={{color: theme.colors.text}}
            contentStyle={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: theme.colors.text}}>EN</Text>
              <View style={{width: 5}} />
              <CountryFlag isoCode="US" size={18} />
            </View>
          </Button>
          <Button
            onPress={() => toggleRTL('sa')}
            labelStyle={{color: theme.colors.text}}
            contentStyle={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: theme.colors.text}}>AR</Text>
              <View style={{width: 5}} />
              <CountryFlag isoCode="SA" size={18} />
            </View>
          </Button>
        </View>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 10,
    padding: 20,
    borderWidth: 4,
    width: 300,
    alignItems: 'center',
    height: 350,
  },
  inputWrapper: {
    position: 'relative',
    width: 250,
    marginBottom: 20,
  },

  floatingLabel: {
    position: 'absolute',
    top: -25,
    fontSize: 18,
    backgroundColor: 'transparent',
  },

  input: {
    height: 45,
    width: 250,
    borderWidth: 2,
    fontSize: 16,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    height: 20,
    marginBottom: 10,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },

  button: {
    marginTop: 5,
    marginBottom: 20,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    color: 'white',
    flexDirection: 'row',
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    padding: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  buttonDisabled: {
    backgroundColor: '#a5a5a5',
    marginBottom: 20,
    height: 40,
  },
  buttonLanguage: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    color: 'black',
    backgroundColor: 'white',
  },
});

export default Login;
