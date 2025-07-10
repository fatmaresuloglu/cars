import React, {useState} from 'react';
import {I18nManager, Text, View} from 'react-native';
import {Switch} from 'react-native-paper';
import {useAppDispatch} from '../store/hooks';
import {setLanguage} from '../store/slices/languageSlice';

const RTLToggle = () => {
  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);

  const dispatch = useAppDispatch();
  const toggleRTL = async () => {
    const newRTL = !isRTL;

    if (newRTL && dispatch(setLanguage('ar'))) {
      I18nManager.allowRTL(newRTL);
      I18nManager.forceRTL(newRTL);
      setIsRTL(newRTL);
    } else if (!newRTL && dispatch(setLanguage('tr'))) {
      I18nManager.forceRTL(newRTL);
      I18nManager.allowRTL(newRTL);
      setIsRTL(newRTL);
    }
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
