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
  },

  fonts: {
    regular: {fontFamily: 'Roboto', fontWeight: weight},
    medium: {fontFamily: 'Roboto-Medium', fontWeight: weight},
    bold: {fontFamily: 'Roboto-Bold', fontWeight: weight},
    heavy: {fontFamily: 'Roboto-Black', fontWeight: weight},
  },
};
