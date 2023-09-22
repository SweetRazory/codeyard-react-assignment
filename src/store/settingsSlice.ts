import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    formCheck: false,
    loading: false,
  },
  reducers: {
    toggleFormCheck: (state) => ({ ...state, formCheck: !state.formCheck }),
    toggleLoading: (state, action) => ({ ...state, loading: action.payload }),
  }
})

export const {
  toggleFormCheck,
  toggleLoading,
} = settingsSlice.actions
export default settingsSlice.reducer