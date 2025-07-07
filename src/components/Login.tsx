import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
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
import {darkTheme, lightTheme} from '../theme/Theme';
import {useTranslation} from '../translate/useTranslation';

type RootStackParamList = {
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
          navigation.navigate('HomePage');
        } else {
          Alert.alert(t.Warning, t.WarningMessage2);
        }
      });
  };

  const isDark = useAppSelector(state => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
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
            <Text style={[styles.floatingLabel, {color: theme.colors.text}]}>
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
            <Text style={[styles.floatingLabel, {color: theme.colors.text}]}>
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
            onPress={() => dispatch(setLanguage('tr'))}
            labelStyle={{color: theme.colors.text}}
            contentStyle={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: theme.colors.text}}>TR</Text>
              <View style={{width: 10}} />
              <CountryFlag isoCode="TR" size={18} />
            </View>
          </Button>
          <Button
            onPress={() => dispatch(setLanguage('en'))}
            labelStyle={{color: theme.colors.text}}
            contentStyle={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: theme.colors.text}}>EN</Text>
              <View style={{width: 10}} />
              <CountryFlag isoCode="GB" size={18} />
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
    left: 10,
    fontSize: 18,
    backgroundColor: 'transparent',
    zIndex: 1,
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
    textAlign: 'center',
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
