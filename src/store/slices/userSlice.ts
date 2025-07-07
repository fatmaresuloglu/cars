import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'http://10.0.2.2:3000/'}),

  tagTypes: ['Users'],
  endpoints: build => ({
    loginUser: build.mutation<any, {username: string; password: string}>({
      query: ({username, password}) => ({
        url: `users?username=${username}&password=${password}`,
        method: 'GET',
      }),
      transformResponse: (response: any[]) => response[0],
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
  }),
});

export const {useLoginUserMutation} = api;
