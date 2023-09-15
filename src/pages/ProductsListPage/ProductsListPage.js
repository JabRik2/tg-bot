// @mui
import {Grid, CircularProgress, Alert, Typography, styled} from "@mui/material";
// components
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductItem from "../../components/ProductItem/ProductItem";
// Redux
import { useSelector, useDispatch } from "react-redux";
// Router
import { useNavigate, useParams } from "react-router";
import { useEffect, useMemo } from "react";
import { fetchProducts } from "./productsListPageSlice";
import { fetchUserById } from "../CartPage/cartPageSlice";
import { MainButton } from "@vkruglikov/react-telegram-web-app";

// ------------------------------------

export const StyledH1 = styled('h1')({
    color: '#444444'
});

// ------------------------------------



export default function ProductsListPage () {
    const {id} = useParams();

    const userId = useSelector(state => state.auth.currUserID);
    const {loadingStatus, products, term} = useSelector(state => state.products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchUserById(userId));
        // eslint-disable-next-line
    }, [userId]);

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

    const navigate = useNavigate();

    const totalPrice = useMemo(() => {
        return Object.keys(cart).reduce((acc, key) => acc + cart[key].price * cart[key].count, 0);
    }, [cart]);

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
            {totalPrice ? <MainButton text="Перейти в корзину" onClick={() => navigate('/cart')} /> : null}
        </>
    )
};