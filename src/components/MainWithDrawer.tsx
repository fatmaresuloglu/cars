import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import HomePage from './HomePage';

const Drawer = createDrawerNavigator();

const MainWithDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomePage" component={HomePage} />
    </Drawer.Navigator>
  );
};

export default MainWithDrawer;
