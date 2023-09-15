import { configureStore } from "@reduxjs/toolkit";
import auth from "../components/App/appSlice";
import cart from "../pages/CartPage/cartPageSlice";
import productPage from "../pages/SingleProductPage/singleProductPageSlice";
import products from "../pages/ProductsListPage/productsListPageSlice";
import categories from "../pages/CategoriesListPage/categoriesListPageSlice";



const store = configureStore({
    reducer: {categories, products, cart, auth, productPage},
    devTools: process.env.NODE_ENV === 'production' ? false : true
});

export default store;