import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppSelector} from '../store/hooks';
import {darkTheme, lightTheme, styles, stylesProfile} from '../theme/Theme';
import {useTranslation} from '../translate/useTranslation';

// Yeni importlar: useUpdateProfileMutation ve useGetUserByIdQuery
import {
  useGetUserByIdQuery,
  useUpdateProfileMutation,
} from '../store/slices/userSlice';

// userData için bir tip tanımlayalım (backend'den gelen verilere göre düzenleyin)
interface UserData {
  id?: number;
  username: string;
  email: string;
  password?: string; // Şifre genellikle profil güncelleme payload'unda olmaz veya ayrı bir işlemle güncellenir
  name?: string;
  tel?: string;
  // Diğer alanlar...
}

const ProfilePage = () => {
  const {t} = useTranslation();
  const isDark = useAppSelector(state => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  // userData state'i: Tüm profil bilgilerini tutacak
  const [userData, setUserData] = useState<UserData>({
    username: '',
    email: '',
    name: '',
    tel: '',
    // Diğer başlangıç değerleri
  });
  const [userId, setUserId] = useState<string | null>(null); // Kullanıcı ID'si için state

  // RTK Query hook'ları
  const [
    updateProfile,
    {
      isLoading: isUpdating,
      isSuccess: updateSuccess,
      isError: updateError,
      error: updateErrorData,
    },
  ] = useUpdateProfileMutation();

  // Kullanıcı ID'si değiştiğinde veya bileşen yüklendiğinde kullanıcı verilerini çek
  const {
    data: fetchedUserData,
    isLoading: isFetchingUser,
    isError: fetchError,
    error: fetchErrorData,
  } = useGetUserByIdQuery(userId!, {
    skip: !userId, // userId null ise sorguyu atla
  });

  // userId'yi AsyncStorage'dan al
  useEffect(() => {
    const getStoredUserId = async () => {
      const storedId = await AsyncStorage.getItem('userId');
      setUserId(storedId);
    };
    getStoredUserId();
  }, []);

  // API'den kullanıcı verisi geldiğinde state'i güncelle
  useEffect(() => {
    if (fetchedUserData) {
      setUserData(fetchedUserData);
    }
    if (fetchError) {
      console.error('Kullanıcı verisi çekme hatası:', fetchErrorData);
      Alert.alert('Hata', 'Profil bilgileri yüklenirken bir sorun oluştu.');
    }
  }, [fetchedUserData, fetchError, fetchErrorData]);

  // Profil güncelleme işleminin sonucunu yönet
  useEffect(() => {
    if (updateSuccess) {
      Alert.alert('Başarılı', 'Profil başarıyla güncellendi!');
    }
    if (updateError) {
      console.error('Profil güncelleme hatası:', updateErrorData);
      Alert.alert('Hata', 'Profil güncellenirken bir sorun oluştu.');
    }
  }, [updateSuccess, updateError, updateErrorData]);

  const handleUpdateProfile = async () => {
    if (!userId) {
      Alert.alert('Hata', "Kullanıcı ID'si bulunamadı.");
      return;
    }
    if (userData.username.trim() === '' || userData.email.trim() === '') {
      Alert.alert('Uyarı', 'Kullanıcı adı ve e-posta boş bırakılamaz.');
      return;
    }

    try {
      await updateProfile({
        id: parseInt(userId, 10), // userId string olduğu için sayıya çevir
        data: {
          username: userData.username.trim(),
          email: userData.email.trim(),
          name: userData.name, // Diğer alanları da ekle
          tel: userData.tel,
          // Şifre gibi hassas bilgileri doğrudan burada göndermeyin, ayrı bir şifre değiştirme ekranı yapın
        },
      }).unwrap();
    } catch (err) {
      // Hata zaten useEffect'te yakalanıyor, burada özel bir işlem yapmak isterseniz
    }
  };

  // Fotoğraf değiştirme fonksiyonu (placeholder)
  const handleChangePhoto = () => {
    Alert.alert(
      'Fotoğraf Değiştir',
      'Fotoğraf değiştirme özelliği henüz aktif değil.',
    );
  };

  // Kaydet butonu için handleSave fonksiyonu, bu handleUpdateProfile'ı çağıracak
  const handleSave = () => {
    handleUpdateProfile();
  };

  // Alanları render eden yardımcı fonksiyon
  const renderField = (
    label: string,
    fieldKey: keyof UserData,
    isEditable: boolean = true,
  ) => {
    const value = userData[fieldKey]?.toString() || '';

    return (
      <View style={stylesProfile.fieldContainer}>
        <Text style={[styles.label, {color: theme.colors.text}]}>{label}</Text>
        <TextInput
          style={[
            stylesProfile.input,
            {
              backgroundColor: isEditable
                ? theme.inputColors.inputEnabledBackground
                : theme.inputColors.inputDisabledBackground,
              color: isEditable
                ? theme.inputColors.inputEnabledText
                : theme.inputColors.inputDisabledText,
              borderColor: theme.colors.border,
            },
          ]}
          value={value}
          editable={isEditable}
          onChangeText={text =>
            setUserData(prev => ({...prev, [fieldKey]: text}))
          }
          secureTextEntry={fieldKey === 'password'} // Şifre alanı için
        />
      </View>
    );
  };

  // Yükleme durumunu göster
  if (isFetchingUser) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{color: theme.colors.text, marginTop: 10}}>
          Profil yükleniyor...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[
        stylesProfile.container,
        {backgroundColor: theme.colors.background},
      ]}>
      <TouchableOpacity
        onPress={handleChangePhoto}
        style={{alignItems: 'center'}}>
        <Image
          source={{uri: 'https://i.pravatar.cc/300'}} // Burayı dinamik hale getirebilirsiniz
          style={stylesProfile.avatar}
        />
        <Text style={stylesProfile.changePhotoText}>{t.change_photo}</Text>
      </TouchableOpacity>
      {/* Alanları render ederken userData state'ini kullan */}
      {renderField(t.username, 'username', true)}
      {/* Kullanıcı adı düzenlenebilir */}
      {renderField(t.email, 'email', false)}
      {/* E-posta düzenlenemez varsayıldı */}
      {renderField(t.name, 'name', true)}
      {renderField(t.tel, 'tel', true)}
      {renderField(t.password, 'password', true)} {/* Şifre alanı için */}
      <TouchableOpacity
        style={[stylesProfile.saveButton, isUpdating && {opacity: 0.7}]}
        onPress={handleSave}
        disabled={isUpdating}>
        {isUpdating ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={stylesProfile.saveButtonText}>{t.save}</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfilePage;
