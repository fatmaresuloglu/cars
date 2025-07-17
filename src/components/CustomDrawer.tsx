import {DrawerContentComponentProps} from '@react-navigation/drawer';
import React from 'react';
import {
  Animated,
  Dimensions,
  I18nManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppSelector} from '../store/hooks';
import {darkTheme, lightTheme} from '../theme/Theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const isRTL = I18nManager.isRTL;

const CustomDrawer = (props: DrawerContentComponentProps) => {
  // props.navigation kullanılabilir
  const [visible, setVisible] = React.useState(false);
  const isDark = useAppSelector(state => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const initialPosition = isRTL ? SCREEN_WIDTH : -SCREEN_WIDTH * 0.6;
  const slideAnim = React.useState(new Animated.Value(initialPosition))[0];

  const openDrawer = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: initialPosition,
      duration: 200,
      useNativeDriver: false,
    }).start(() => setVisible(false));
  };

  return (
    <>
      <TouchableOpacity
        onPress={openDrawer}
        style={[styles.menuButton, isRTL ? {right: 10} : {left: 10}]}>
        <Ionicons name="menu" size={28} color={theme.colors.text} />
      </TouchableOpacity>

      {visible && (
        <Animated.View
          style={[
            styles.drawer,
            isRTL
              ? {right: slideAnim, left: undefined}
              : {left: slideAnim, right: undefined},
            {backgroundColor: theme.colors.background},
          ]}>
          <View style={[styles.header]}>
            <Text style={[styles.title, {color: theme.colors.text}]}>
              👤 Kullanıcı Profili
            </Text>
            <TouchableOpacity onPress={closeDrawer}>
              <Ionicons name="home" size={28} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Text style={{color: theme.colors.text}}>Kullanıcı Adı: user1</Text>
            <Text style={{color: theme.colors.text}}>
              E-posta: user1@example.com
            </Text>
            <Text style={{color: theme.colors.text}}>Telefon:05xxxxxxx</Text>
            <Button> Düzenle</Button>
          </View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.6,
    elevation: 10,
    zIndex: 999,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    zIndex: 1000,
  },
});

export default CustomDrawer;
