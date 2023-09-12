import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    currUserID: 1
}

// export const fetchUserById = createAsyncThunk(
//     'cart/fetchUserById',
//     async (id) => {
//         return (await axios.get(`http://localhost:3001/users/${id}`)).data;
//     }
// );
// export const fetchPostUserCart = createAsyncThunk(
//     'cart/fetchPostUserCart',
//     async ({userId, productID, value}, {getState}) => {
//         const {cart} = getState();
//         let data = {...cart.cartProducts};
//         data[productID] = value;
//         return (await axios.patch(`http://localhost:3001/users/${userId}`, {
//             cart: {
//                 ...data
//             }})).data;
//     }
// );

const appSlice = createSlice({
    name: 'cart',
    initialState,
    // reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchUserById.fulfilled, (state, action) => {
    //             state.loadingStatus = 'idle';
    //             state.cartProducts = action.payload.cart;
    //         })
    //         .addCase(fetchUserById.rejected, (state) => {
    //             state.loadingStatus = 'error';
    //         })
    //         .addCase(fetchUserById.pending, (state) => {
    //             state.loadingStatus = 'loading';
    //         })
    //         .addCase(fetchPostUserCart.fulfilled, (state, action) => {
    //             state.cartProducts = action.payload.cart;
    //         })
    //         .addDefaultCase(() => {});
    // }
});

const {reducer} = appSlice;

export default reducer;