// styles
import { StyledH1 } from "./styles";
// @mui
import {Grid, CircularProgress, Alert, Typography} from "@mui/material";
// components
import ProductItem from "../ProductItem/ProductItem";
// Redux
import { useSelector, useDispatch } from "react-redux";
// Router
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchProducts } from "../ProductsList/productsSlice";
import { fetchUserById } from "./cartSlice";



export default function Cart () {
    const {products, loadingStatus} = useSelector(state => state.products);
    const {cartProducts} = useSelector(state => state.cart);

    const userId = useSelector(state => state.auth.currUserID);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserById(userId))
        dispatch(fetchProducts());
    }, []);


    const loading = loadingStatus === 'loading' ? <CircularProgress /> : null;
    const error = loadingStatus === 'error' ? <Alert severity="error">Somethink went wrong</Alert> : null;
    const view = loadingStatus === 'idle' ? <View products={products} cartProducts={cartProducts} /> : null;

    return (
        <>
            <StyledH1>🛒Ваша корзина товаров:</StyledH1>
            {loading}
            {error}
            {view}
        </>
    );
}

const View = ({products, cartProducts}) => {
    const items = products.filter(({id}) => {
        return cartProducts[id] ? cartProducts[id].count : false;
    }).map(({id, image, name, price}, i) => {
        
        return (
            <Grid key={i} item xs={6}>
                <ProductItem 
                    id={id}
                    src={image}
                    title={name}
                    value={cartProducts[id].count}
                    price={price}
                    />
            </Grid>
        )
    });

    const totalPrice = useMemo(() => {
        return Object.keys(cartProducts).reduce((acc, key) => acc + cartProducts[key].price * cartProducts[key].count, 0);
    });

    return (
        <>
            {items.length ? (
                <Grid container spacing={1}>
                    {items}
                </Grid>
            ) : <Typography color={'gray'} align="center" sx={{mt: 2}} variant="subtitle1">Продукты не были найдены...</Typography>}
            {totalPrice ? <Typography variant="h5" sx={{mt: 2}} color="text.secondary">
                <b>Итого:</b> {totalPrice} ₽
            </Typography> : null}
        </>
    )
};