import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import HomePage from './HomePage';
import Page_1 from './Page_1';
import Page_2 from './Page_2';

const Drawer = createDrawerNavigator();

const MainWithDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomePage" component={HomePage} />
      <Drawer.Screen name="Page_1" component={Page_1} />
      <Drawer.Screen name="Page_2" component={Page_2} />
    </Drawer.Navigator>
  );
};

export default MainWithDrawer;
