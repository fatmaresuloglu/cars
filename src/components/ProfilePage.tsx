import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useAppSelector} from '../store/hooks';
import {darkTheme, lightTheme, styles, stylesProfile} from '../theme/Theme';
import {useTranslation} from '../translate/useTranslation';

const API_URL = 'http://10.0.2.2:3000/users/1';

const ProfilePage = () => {
  const {t} = useTranslation();
  const isDark = useAppSelector(state => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    tel: '',
    username: '',
    password: '',
  });
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/300');
  // Hangi input düzenlenebilir?
  const [editableFields, setEditableFields] = useState({
    name: false,
    email: false,
    tel: false,
    username: false,
    password: false,
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(API_URL);
      setUserData(response.data);
    } catch (error) {
      Alert.alert('Hata', 'Kullanıcı bilgileri alınamadı');
    }
  };

  const toggleEditable = (field: keyof typeof editableFields) => {
    setEditableFields(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(API_URL, userData);
      Alert.alert('Başarılı', 'Bilgiler güncellendi');
      // Tüm alanları tekrar pasif yap
      setEditableFields({
        name: false,
        email: false,
        tel: false,
        username: false,
        password: false,
      });
    } catch (error) {
      Alert.alert('Hata', 'Güncelleme başarısız');
    }
  };
  const handleChangePhoto = () => {
    Alert.alert(
      'Fotoğraf Değiştir',
      'Profil fotoğrafı değiştirme işlemi buraya eklenecek.',
    );
    // Burada Image Picker veya Kamera eklersin
  };
  const renderField = (
    label: string,
    value: string,
    field: keyof typeof userData,
    editable: boolean,
  ) => (
    <View
      style={[
        stylesProfile.fieldContainer,
        {backgroundColor: theme.colors.background},
      ]}>
      <Text style={[styles.label, {color: theme.colors.text}]}>{label}</Text>
      <View style={stylesProfile.row}>
        <TextInput
          style={[
            stylesProfile.input,

            {
              backgroundColor: editable
                ? theme.inputColors.inputEnabledBackground
                : theme.inputColors.inputDisabledBackground,
              color: editable
                ? theme.inputColors.inputEnabledText
                : theme.inputColors.inputDisabledText,
              borderColor: theme.colors.border,
            },
          ]}
          value={value}
          onChangeText={text => setUserData({...userData, [field]: text})}
          editable={editable}
        />
        <TouchableOpacity onPress={() => toggleEditable(field)}>
          <Feather
            name={editable ? 'check' : 'edit-2'}
            size={20}
            color={editable ? 'green' : '#007AFF'}
            style={{marginLeft: 5}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={[
        stylesProfile.container,
        {backgroundColor: theme.colors.background},
      ]}>
      <TouchableOpacity
        onPress={handleChangePhoto}
        style={[
          {alignItems: 'center'},
          {backgroundColor: theme.colors.background},
        ]}>
        <Image
          source={{uri: profileImage}}
          style={[
            stylesProfile.avatar,
            {backgroundColor: theme.colors.background},
          ]}
        />
        <Text
          style={[
            stylesProfile.changePhotoText,
            {backgroundColor: theme.colors.background},
          ]}>
          {t.change_photo}
        </Text>
      </TouchableOpacity>

      {renderField(
        t.username,
        userData.username,
        'username',
        editableFields.username,
      )}
      {renderField(
        t.password,
        userData.password,
        'password',
        editableFields.password,
      )}
      {renderField(t.name, userData.name, 'name', editableFields.name)}
      {renderField(t.tel, userData.tel, 'tel', editableFields.tel)}
      {renderField(t.email, userData.email, 'email', editableFields.email)}

      <TouchableOpacity style={stylesProfile.saveButton} onPress={handleSave}>
        <Text style={stylesProfile.saveButtonText}>{t.save}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfilePage;
