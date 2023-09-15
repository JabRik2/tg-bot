import { useEffect, useMemo, useState } from "react";
// telegram
import { MainButton, useShowPopup } from "@vkruglikov/react-telegram-web-app";
// @mui
import {Grid, CircularProgress, Alert, Typography, styled} from "@mui/material";
// components
import ProductItem from "../../components/ProductItem/ProductItem";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../ProductsListPage/productsListPageSlice";
import { fetchUserById } from "./cartPageSlice";
// hooks
import useSendData from "../../hooks/telegramHooks/useSendData";

// ------------------------------------

export const StyledH1 = styled('h1')({
    color: '#444444'
});

// ------------------------------------

export default function CartPage () {
    const {products, loadingStatus} = useSelector(state => state.products);
    const {cartProducts} = useSelector(state => state.cart);

    const userId = useSelector(state => state.auth.currUserID);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserById(userId))
        dispatch(fetchProducts());
        // eslint-disable-next-line
    }, [userId]);


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


const tg = window.Telegram.WebApp;

const View = ({products, cartProducts}) => {
    const userId = useSelector(state => state.auth.currUserID);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const sendData = useSendData();
    const showPopup = useShowPopup();

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
    }, [cartProducts]);

    const onClickBuyButton = () => {
        setIsButtonDisabled(true);
        sendData({userId, cart: cartProducts})
            .then(() => {
                setTimeout(() => {
                    tg.close();
                    setIsButtonDisabled(false);
                }, 1)
            })
            .catch(() => {
                setTimeout(() => {
                    showPopup({message: 'Ошибка, попробуйте перезапустить приложение'});
                    setIsButtonDisabled(false);
                }, 1)
            });
    }

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

            {totalPrice ? <MainButton progress={isButtonDisabled} disabled={isButtonDisabled} text="Купить" onClick={onClickBuyButton} /> : null}
        </>
    )
};