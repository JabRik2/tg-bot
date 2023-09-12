import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    currUserID: 1,
    cartProducts: {},
}

export const fetchUserById = createAsyncThunk(
    'cart/fetchUserById',
    async (id) => {
        return (await axios.get(`http://localhost:3001/users/${id}`)).data;
    }
);
export const fetchPostUserCart = createAsyncThunk(
    'cart/fetchPostUserCart',
    async ({userId, productID, value, price}, {getState}) => {
        const {cart} = getState();
        let data = {...cart.cartProducts};
        data[productID] = {
            count: value,
            price: price
        };
        return (await axios.patch(`http://localhost:3001/users/${userId}`, {
            cart: {
                ...data
            }})).data;
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserById.fulfilled, (state, action) => {
                return {...state, cartProducts: action.payload.cart};
            })
            .addCase(fetchPostUserCart.fulfilled, (state, action) => {
                return {...state, cartProducts: action.payload.cart};
            })
            .addDefaultCase(() => {});
    }
});

const {reducer} = cartSlice;
export default reducer;