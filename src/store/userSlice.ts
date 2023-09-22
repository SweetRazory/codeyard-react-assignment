import { createSlice } from "@reduxjs/toolkit"
import { Reducer } from "types/reducer"
import { User } from "types/user"

interface SetUserPayload { user: User, remember: boolean }

const setUserReducer = ({ action }: Reducer<User>) => {
  clearUserReducer()
  const { remember, user } = action.payload as SetUserPayload

  // NOTE: Nyilvan ide alapvetoen auth token jonne nem a user object :D
  const storage = remember ? localStorage : sessionStorage

  storage.setItem("user", JSON.stringify(user))

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.address
  }
}

const clearUserReducer = () => {
  sessionStorage.removeItem("user")
  localStorage.removeItem("user")

  return {} as User
}

export const userSlice = createSlice({
  name: "user",
  initialState: (JSON.parse(localStorage.getItem("user") ?? sessionStorage.getItem("user"))) as User,
  reducers: {
    setUser: (state, action) => setUserReducer({ state, action }),
    clearUser: clearUserReducer
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer