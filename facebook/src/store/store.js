import { configureStore } from '@reduxjs/toolkit'
import accountReducer from '../feature/account'

export default configureStore({
  reducer: {
    account: accountReducer
  }
})