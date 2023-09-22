import { configureStore } from "@reduxjs/toolkit"
import modalControllerReducer from "./modalSlice"
import settingsSlice from "./settingsSlice"
import userReducer from "./userSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    modalController: modalControllerReducer,
    settings: settingsSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch