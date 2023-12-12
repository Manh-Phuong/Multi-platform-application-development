import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email : '',
  password: '',
  nickname: ''
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setStoreEmail: (state, action) => {
        state.email = action.payload
        console.log(state.email)
    },
    setStorePassword: (state, action) => {
        console.log(action)
        state.password = action.payload
    },
    setStoreNickname: (state, action) => {
      console.log(action)
      state.nickname = action.payload
  }
  },
})

// Action creators are generated for each case reducer function
export const { setStoreEmail, setStorePassword, setStoreNickname } = accountSlice.actions

export default accountSlice.reducer