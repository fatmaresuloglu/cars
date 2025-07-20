import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.0.2.2:3000/',
    prepareHeaders: async (headers, {getState}) => {
      // Eğer backend'iniz kimlik doğrulama token'ı bekliyorsa, burada eklemelisiniz.
      // Örneğin:
      // const token = await AsyncStorage.getItem('userToken');
      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),

  tagTypes: ['Users'],
  endpoints: build => ({
    loginUser: build.mutation<any, {username: string; password: string}>({
      query: ({username, password}) => ({
        // Backend'inizde kullanıcı adı ve şifre ile GET isteği ile kullanıcıyı buluyorsunuz.
        // Gerçek uygulamalarda login genellikle POST ile yapılır ve bir token döner.
        url: `users?username=${username}&password=${password}`,
        method: 'GET',
      }),
      transformResponse: (response: any[]) => response[0], // İlk eşleşen kullanıcıyı döndür
      transformErrorResponse: (error: {status: number | string}) => {
        if (error.status === 404) return 'Kullanıcı bulunamadı';
        return 'Sunucu hatası';
      },
      invalidatesTags: [{type: 'Users'}],
      async onQueryStarted(args, {queryFulfilled}) {
        try {
          const result = await queryFulfilled;
          console.log('Giriş başarılı:', result.data);
        } catch (err) {
          console.log('Hata:', err);
        }
      },
    }),

    // Yeni eklenen: Kullanıcı ID'sine göre kullanıcı bilgilerini getirme sorgusu
    getUserById: build.query<any, string>({
      query: id => `users/${id}`, // Örneğin: http://10.0.2.2:3000/users/1
      providesTags: (result, error, id) => [{type: 'Users', id}], // Bu sorgunun Users tag'ini sağladığını belirtiriz
    }),

    updateProfile: build.mutation<any, {id: number; data: any}>({
      query: ({id, data}) => ({
        url: `users/${id}`,
        method: 'PUT', // veya 'PATCH'
        body: data,
      }),
      invalidatesTags: (result, error, {id}) => [{type: 'Users', id}], // Güncellenen kullanıcının tag'ini geçersiz kıl
      async onQueryStarted({id, data}, {dispatch, queryFulfilled}) {
        // Optimistik güncelleme örneği:
        const patchResult = dispatch(
          api.util.updateQueryData('getUserById', id.toString(), draft => {
            // Eğer draft varsa ve bir objeyse, gelen data ile birleştir.
            if (draft && typeof draft === 'object') {
              Object.assign(draft, data);
            }
          }),
        );
        try {
          const result = await queryFulfilled;
          console.log('Profil güncelleme başarılı:', result.data);
        } catch (error) {
          console.error('Profil güncelleme hatası:', error);
          patchResult.undo(); // Hata durumunda optimistik güncellemeyi geri al
        }
      },
    }),
  }),
});

// Yeni hook'u dışa aktarın
export const {
  useLoginUserMutation,
  useUpdateProfileMutation,
  useGetUserByIdQuery,
} = api;
