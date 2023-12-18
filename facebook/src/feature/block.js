import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listBlock: [],
};

export const blockSlice = createSlice({
    name: 'block',
    initialState,
    reducers: {
        setStoreListBlock: (state, action) => {
            // console.log(action);
            state.listBlock = action.payload;
        },
    },
});

export const { setStoreListBlock } = blockSlice.actions;

export default blockSlice.reducer;
