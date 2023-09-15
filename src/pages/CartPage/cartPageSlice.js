import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartProducts: {},
}

export const fetchUserById = createAsyncThunk(
    'cart/fetchUserById',
    async (id) => {
        return (await axios.get(`https://my-json-server.typicode.com/JabRik2/json/users/${id}`)).data;
    }
);
export const fetchPostUserCart = createAsyncThunk(
    'cart/fetchPostUserCart',
    async ({userId, productID, value, price, signal}, {getState}) => {
        const {cart} = getState();
        let data = {...cart.cartProducts};
        data[productID] = {
            count: value,
            price: price
        };
        return (await axios.patch(`https://my-json-server.typicode.com/JabRik2/json/users/${userId}`, {
            cart: {
                ...data
            }}, {signal})
            .catch(e => {})).data;
    }
);

const cartPageSlice = createSlice({
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

const {reducer} = cartPageSlice;
export default reducer;