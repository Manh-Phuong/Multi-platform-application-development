import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../feature/account';
import postReducer from '../feature/post';
import profileReducer from '../feature/profile';
import friendSlice from '../feature/friend';
import listPostSlice from '../feature/listPost';

export default configureStore({
    reducer: {
        account: accountReducer,
        post: postReducer,
        profile: profileReducer,
        friend: friendSlice,
        listPost: listPostSlice,
    },
});
