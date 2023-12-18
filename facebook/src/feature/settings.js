import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    deviceToken: '',
    settings: {
        like_comment: '1',
        from_friends: '1',
        requested_friend: '1',
        suggested_friend: '1',
        birthday: '1',
        video: '1',
        report: '1',
        sound_on: '1',
        notification_on: '1',
        vibrant_on: '1',
        led_on: '1',
    },
};

export const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setStoreDeviceToken: (state, action) => {
            // console.log(action);
            state.deviceToken = action.payload;
        },
        setStoreSetting: (state, action) => {
            // console.log(action);
            state.settings = action.payload;
        },
    },
});

export const { setStoreDeviceToken, setStoreSetting } = settingSlice.actions;

export default settingSlice.reducer;
