import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currUserID: window.Telegram.WebApp.initDataUnsafe.user ? window.Telegram.WebApp.initDataUnsafe.user.id : 1
};

const appSlice = createSlice({
    name: 'auth',
    initialState
});

const {reducer} = appSlice;

export default reducer;