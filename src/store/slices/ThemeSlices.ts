import {createSlice} from '@reduxjs/toolkit';

interface themeState {
  isDark: boolean;
}

const initialState: themeState = {
  isDark: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.isDark = !state.isDark;
    },
    setTheme(state, action) {
      const {payload} = action;
      state.isDark = payload.isDark;
    },
  },
});
export const {toggleTheme, setTheme} = themeSlice.actions;
export default themeSlice.reducer;
