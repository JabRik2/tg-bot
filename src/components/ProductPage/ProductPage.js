// redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductById } from "./productPageSlice";
import { Alert, CircularProgress } from "@mui/material";
import { useParams } from "react-router";
import ProductPageItem from "../ProductPageItem/ProductPageItem";
import { fetchUserById } from "../Cart/cartSlice";

export default function ProductPage () {
    const {id} = useParams();

    const dispatch = useDispatch();

    const userId = useSelector(state => state.auth.currUserID);

    useEffect(() => {
        dispatch(fetchProductById(id));
        dispatch(fetchUserById(userId));
    }, [])

    const {
        productName, 
        productImg, 
        productPrice, 
        productDescription,
        loadingStatus
    } = useSelector(state => state.productPage);
    const cartValue = useSelector(state => state.cart.cartProducts);

    const loading = loadingStatus === 'loading' ? <CircularProgress /> : null;
    const error = loadingStatus === 'error' ? <Alert severity="error">Somethink went wrong</Alert> : null;
    const view = loadingStatus === 'idle' ? <ProductPageItem 
                                                title={productName}
                                                src={productImg} 
                                                price={productPrice} 
                                                descr={productDescription}
                                                img={productImg}
                                                id={id}
                                                value={cartValue[id] ? cartValue[id].count : 0} /> : null;

    return (
        <>
            {loading}
            {error}
            {view}
        </>
    )
}