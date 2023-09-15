import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    productName: '',
    productImg: '',
    productPrice: '',
    productDescription: '',
    loadingStatus: 'idle'
}

export const fetchProductById = createAsyncThunk(
    'product/fetchProductById',
    async (id) => {
        return (await axios.get(`https://my-json-server.typicode.com/JabRik2/json/products/${id}`)).data;
    }
);

const SingleProductPageSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state) => {
                return {...state, loadingStatus: 'loading'};
            })
            .addCase(fetchProductById.rejected, (state) => {
                return {...state, loadingStatus: 'error'};
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                return {
                    ...state, 
                    loadingStatus: 'idle',
                    productName: action.payload.name, 
                    productImg: action.payload.image,
                    productPrice: action.payload.price,
                    productDescription: action.payload.descr
                };
            })
            .addDefaultCase(() => {});
    }
});

const {reducer} = SingleProductPageSlice;
export default reducer;