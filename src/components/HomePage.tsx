import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-paper';
import {useAppSelector} from '../store/hooks';
import {darkTheme, lightTheme} from '../theme/Theme';
import {useTranslation} from '../translate/useTranslation';

const HomePage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const isDark = useAppSelector(state => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Card
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={() => navigation.navigate('Page_1')}>
          <Card.Content>
            <Text style={[styles.text, {color: theme.colors.text}]}>
              {t.Card1}
            </Text>
          </Card.Content>
        </Card>

        <Card
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={() => navigation.navigate('Page_2')}>
          <Card.Content>
            <Text style={[styles.text, {color: theme.colors.text}]}>
              {t.Card2}
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    flex: 1,
    padding: 30,
    margin: 10,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    backgroundColor: 'lightgrey',
  },
  text: {
    fontSize: 18,
  },
});

export default HomePage;
