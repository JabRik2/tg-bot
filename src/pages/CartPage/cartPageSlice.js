import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartProducts: {},
}

export const fetchUserById = createAsyncThunk(
    'cart/fetchUserById',
    async (id) => {
        return (await axios.get(`http://localhost:8000/id_name/${id}`)).data;
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
        return (await axios.post(`http://localhost:8000/user_cart`, {
            userId,
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