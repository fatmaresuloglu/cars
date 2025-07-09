import React, {useState} from 'react';
import {I18nManager, Text, View} from 'react-native';
import {Switch} from 'react-native-paper';

const RTLToggle = () => {
  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);

  const toggleRTL = () => {
    const newRTL = !isRTL;

    // RTL yönünü değiştir
    I18nManager.allowRTL(newRTL);
    I18nManager.forceRTL(newRTL);
    setIsRTL(newRTL);
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
      <Text style={{marginRight: 10}}>
        {isRTL ? 'RTL (Arapça)' : 'LTR (Türkçe/İngilizce)'}
      </Text>
      <Switch value={isRTL} onValueChange={toggleRTL} />
    </View>
  );
};

export default RTLToggle;
