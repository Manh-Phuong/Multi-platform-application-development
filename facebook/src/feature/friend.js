import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listRequestFriend: { requests: [], total: 0 },
    listUserFriend: { friends: [], total: 0 },
    listSuggestFriend: [],
};

export const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        setStoreRequestFriend: (state, action) => {
            // console.log(action);
            state.listRequestFriend = action.payload;
        },
        setStoreUserFriend: (state, action) => {
            // console.log(action);
            state.listUserFriend = action.payload;
        },
        setStoreSuggestFriend: (state, action) => {
            // console.log(action);
            state.listSuggestFriend = action.payload;
        },
    },
});

export const { setStoreRequestFriend, setStoreUserFriend, setStoreSuggestFriend } = friendSlice.actions;

export default friendSlice.reducer;
