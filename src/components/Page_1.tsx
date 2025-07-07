import React from 'react';
import {Text} from 'react-native';
import {useAppSelector} from '../store/hooks';
import {darkTheme, lightTheme} from '../theme/Theme';

const Page_1 = () => {
  const isDark = useAppSelector(state => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  return <Text style={{color: theme.colors.text}}>Page 1</Text>;
};
export default Page_1;
