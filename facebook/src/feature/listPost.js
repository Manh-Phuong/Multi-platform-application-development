import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listPost: [],
    listPostUser: [],
    lasIdPost: null,
    listVideos: [],
    listVideoActive: [],
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
        setStoreListVideos: (state, action) => {
            console.log(action);
            state.listVideos = action.payload;
        },
        setStoreListVideoActive: (state, action) => {
            console.log(action);
            state.listVideoActive = action.payload;
        },
    },
});

export const { setStoreListPost, setStoreListUser, setStoreLasIdPost, setStoreListVideos, setStoreListVideoActive } =
    listPostSlice.actions;

export default listPostSlice.reducer;
