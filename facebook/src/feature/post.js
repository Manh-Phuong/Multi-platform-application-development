import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    image: [],
    video: null,
    described: '',
    status: '',
    auto_accept: 1,
    createPost: false,
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setStoreStatus: (state, action) => {
            state.status = action.payload;
            console.log(state.status);
        },
        setStorePassword: (state, action) => {
            console.log(action);
            state.password = action.payload;
        },
        setStoreCreatePost: (state, action) => {
            console.log(action);
            state.createPost = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setStoreStatus, setStorePassword, setStoreCreatePost } = postSlice.actions;

export default postSlice.reducer;
