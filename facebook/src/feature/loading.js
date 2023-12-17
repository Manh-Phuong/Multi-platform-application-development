import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoadingApi: false,
};

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoadingApi = action.payload;
            console.log(state.email);
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
