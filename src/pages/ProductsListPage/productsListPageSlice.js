import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    loadingStatus: 'idle',
    term: ''
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        return (await axios.get('http://localhost:8000/product')).data;
    }
)

const productsListPageSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setTerm: (state, action) => {
            state.term = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log(action.payload)
                return {...state, loadingStatus: 'idle', products: action.payload};
            })
            .addCase(fetchProducts.rejected, (state) => {
                return {...state, loadingStatus: 'error'};
            })
            .addCase(fetchProducts.pending, (state) => {
                return {...state, loadingStatus: 'loading'};
            })
            .addDefaultCase(() => {});
    }
});

const {reducer, actions} = productsListPageSlice;

export default reducer;
export const {setTerm} = actions;