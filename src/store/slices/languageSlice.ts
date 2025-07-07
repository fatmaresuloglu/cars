import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LanguageCode} from '../../languages/language';

interface LanguageState {
  language: LanguageCode;
}

const initialState: LanguageState = {
  language: 'tr',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<LanguageCode>) {
      state.language = action.payload;
    },
  },
});

export const {setLanguage} = languageSlice.actions;
export default languageSlice.reducer;
