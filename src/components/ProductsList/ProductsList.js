// styles
import { StyledH1 } from "./styles";
// @mui
import {Grid, CircularProgress, Alert, Typography} from "@mui/material";
// components
import SearchBar from "../SearchBar/SearchBar";
import ProductItem from "../ProductItem/ProductItem";
// Redux
import { useSelector, useDispatch } from "react-redux";
// Router
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchProducts } from "./productsSlice";
import { fetchUserById } from "../Cart/cartSlice";



export default function ProductsList () {
    const {id} = useParams();

    const userId = useSelector(state => state.auth.currUserID);
    const {loadingStatus, products, term} = useSelector(state => state.products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchUserById(userId));
    }, []);

    const loading = loadingStatus === 'loading' ? <CircularProgress /> : null;
    const error = loadingStatus === 'error' ? <Alert severity="error">Somethink went wrong</Alert> : null;
    const view = loadingStatus === 'idle' ? <View products={products} id={id} term={term} /> : null;

    return (
        <>
            <StyledH1>📋Выберите нужную вам категорию:</StyledH1>
            <SearchBar />
            {loading}
            {error}
            {view}
        </>
    );
}

const View = ({products, id, term}) => { 
    const cart = useSelector(state => state.cart.cartProducts);

    const items = products.filter((product) => {
        return `${product.category}` === id && product.name.includes(term);
    }).map(({id, image, name, price}) => {
        return (
            <Grid key={id} item xs={6}>
                <ProductItem 
                    id={id}
                    value={cart[id] ? cart[id].count : 0}
                    src={image}
                    title={name}
                    price={price}
                    />
            </Grid>
        )
    });
    return (
        <>
            {items.length ? (
                <Grid container spacing={1}>
                    {items}
                </Grid>
            ) : <Typography color={'gray'} align="center" sx={{mt: 2}} variant="subtitle1">Продукты не были найдены...</Typography>}
        </>
    )
};