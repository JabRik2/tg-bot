import { configureStore } from "@reduxjs/toolkit";
import categories from "../components/CategoriesList/categoriesSlice";
import products from "../components/ProductsList/productsSlice";
import cart from "../components/Cart/cartSlice";
import auth from "../components/App/appSlice";
import productPage from "../components/ProductPage/productPageSlice";


const store = configureStore({
    reducer: {categories, products, cart, auth, productPage},
    devTools: process.env.NODE_ENV === 'production' ? false : true
});

export default store;