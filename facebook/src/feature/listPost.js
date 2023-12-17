import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listPost: [],
    listPostUser: [],
    lasIdPost: null,
};

export const listPostSlice = createSlice({
    name: 'listPost',
    initialState,
    reducers: {
        setStoreListPost: (state, action) => {
            // console.log(action);
            state.listPost = action.payload;
        },
        setStoreListUser: (state, action) => {
            // console.log(action);
            state.listPostUser = action.payload;
        },
        setStoreLasIdPost: (state, action) => {
            // console.log(action);
            state.lasIdPost = action.payload;
        },
    },
});

export const { setStoreListPost, setStoreListUser, setStoreLasIdPost } = listPostSlice.actions;

export default listPostSlice.reducer;
