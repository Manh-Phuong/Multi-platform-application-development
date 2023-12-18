import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user_id: '556',
    name: '',
    avatar: 'https://res.cloudinary.com/manhphuong/image/upload/v1702483093/default_avatar_orhez1.jpg',
    imageBackground: 'https://res.cloudinary.com/manhphuong/image/upload/v1702693703/default-thumbnail_lscmuo.jpg',
    description: '',
    address: '',
    city: '',
    country: '',
    link: '',
    coins: '50',
    temp: '',
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setStoreUserId: (state, action) => {
            // console.log(action);
            state.user_id = action.payload;
        },
        setStoreName: (state, action) => {
            // console.log(action);
            state.name = action.payload;
        },
        setStoreAvatar: (state, action) => {
            // console.log(action);
            state.avatar = action.payload;
        },
        setStoreImageBackground: (state, action) => {
            // console.log(action);
            state.imageBackground = action.payload;
        },
        setStoreDescription: (state, action) => {
            // console.log(action);
            state.description = action.payload;
        },
        setStoreAddress: (state, action) => {
            // console.log(action);
            state.address = action.payload;
        },
        setStoreCity: (state, action) => {
            // console.log(action);
            state.city = action.payload;
        },
        setStoreCountry: (state, action) => {
            // console.log(action);
            state.country = action.payload;
        },
        setStoreLink: (state, action) => {
            // console.log(action);
            state.link = action.payload;
        },
        setStoreCoins: (state, action) => {
            // console.log(action);
            state.coins = action.payload;
        },
        setStoreTemp: (state, action) => {
            // console.log(action);
            state.temp = action.payload;
        },
        setStoreProfile: (state, action) => {
            // console.log(action);
            state.name = action.payload.username;
            if (action.payload.avatar) {
                state.avatar = action.payload.avatar;
            }
            if (action.payload.cover_image) {
                state.imageBackground = action.payload.cover_image;
            }

            state.description = action.payload.description;
            state.address = action.payload.address;
            state.city = action.payload.city;
            state.country = action.payload.country;
            state.link = action.payload.link;
            state.coins = action.payload.coins;
        },
    },
});

export const {
    setStoreName,
    setStoreAvatar,
    setStoreImageBackground,
    setStoreDescription,
    setStoreAddress,
    setStoreCity,
    setStoreCountry,
    setStoreLink,
    setStoreCoins,
    setStoreTemp,
    setStoreProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
