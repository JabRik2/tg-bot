import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    categories: [],
    loadingStatus: 'idle'
}

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        return (await axios.get('http://localhost:3001/categories')).data;
    }
)

const caregoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                return {...state, loadingStatus: 'idle', categories: action.payload};
            })
            .addCase(fetchCategories.rejected, (state) => {
                return {...state, loadingStatus: 'error'};
            })
            .addCase(fetchCategories.pending, (state) => {
                return {...state, loadingStatus: 'loading'};
            })
            .addDefaultCase(() => {});
    }
});

const {reducer} = caregoriesSlice;

export default reducer;