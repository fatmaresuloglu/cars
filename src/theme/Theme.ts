import {I18nManager, StyleSheet} from 'react-native';

type FontWeight =
  | '400'
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
const weight: FontWeight = '400';
export const lightTheme = {
  dark: false,
  colors: {
    primary: '#6200ee',
    background: '#ffffff',
    card: '#eeeeee',
    text: '#000000',
    border: '#cccccc',
    notification: '#ff80ab',
  },
  inputColors: {
    background: '#ffffff',
    inputDisabledBackground: '#e0e0e0',
    inputDisabledText: '#888',
    inputEnabledBackground: '#fff',
    inputEnabledText: '#000',
  },

  fonts: {
    regular: {fontFamily: 'Roboto', fontWeight: weight},
    medium: {fontFamily: 'Roboto-Medium', fontWeight: weight},
    bold: {fontFamily: 'Roboto-Bold', fontWeight: weight},
    heavy: {fontFamily: 'Roboto-Black', fontWeight: weight},
  },
};

export const darkTheme = {
  dark: true,
  colors: {
    primary: '#bb86fc',
    background: '#121212',
    card: '#2a2a2a',
    text: '#ffffff',
    border: '#3a3a3a',
    notification: '#ff80ab',
  },
  inputColors: {
    background: '#424242',
    inputDisabledBackground: '#2a2a2a',
    inputDisabledText: '#666',
    inputEnabledBackground: '#1c1c1c',
    inputEnabledText: '#fff',
  },

  fonts: {
    regular: {fontFamily: 'Roboto', fontWeight: weight},
    medium: {fontFamily: 'Roboto-Medium', fontWeight: weight},
    bold: {fontFamily: 'Roboto-Bold', fontWeight: weight},
    heavy: {fontFamily: 'Roboto-Black', fontWeight: weight},
  },
};
export const styles = StyleSheet.create({
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
export const stylesProfile = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F4F4',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  changePhotoText: {
    color: '#007AFF',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    textAlign: 'center',
  },
  inputDisabled: {
    backgroundColor: '#e0e0e0',
    borderColor: '#ccc',
    color: '#555',
  },
  inputEditable: {
    backgroundColor: '#fff',
    borderColor: '#007AFF',
    color: '#000',
  },
  editButton: {
    marginLeft: 10,
    fontSize: 32,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
