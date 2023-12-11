import { configureStore } from '@reduxjs/toolkit'
import accountReducer from '../feature/account'
import postReducer from '../feature/post'

export default configureStore({
  reducer: {
    account: accountReducer,
    post: postReducer
  }
})