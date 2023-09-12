import { Button, ButtonGroup } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostUserCart } from "../Cart/cartSlice";

export default function AddButton ({id, value, price}) {
    const [counter, setCounter] = useState(value ? value : 0);

    useEffect(() => {
        setCounter(value);
    }, [value]);

    const dispatch = useDispatch();
    const {currUserID} = useSelector(state => state.cart);

    const onDec = () => {
        if (counter > 0) {
            setCounter((prev) => {
                dispatch(fetchPostUserCart({
                    userId: currUserID, 
                    price,
                    minus: true,
                    productID: id, 
                    value: prev - 1
                }));
                return prev - 1;
            });
        }
    }

    const onInc = () => {
        setCounter((prev) => {
            dispatch(fetchPostUserCart({
                userId: currUserID, 
                price,
                productID: id, 
                value: prev + 1
            }));
            return prev + 1
        });
    }

    return (
        <>
            <ButtonGroup size="small">
                {counter ? (
                    <>
                        <Button
                            onClick={onDec}
                            size="small"
                            variant="outlined"
                            >
                            {" "}
                            <RemoveIcon fontSize="small" />
                        </Button>
                        <Button
                            size="small"
                            variant="outlined"
                            >
                                {counter}
                        </Button>
                        <Button
                            onClick={onInc}
                            size="small"
                            variant="outlined"
                            >
                            {' '}
                            <AddIcon fontSize="small" />
                        </Button>
                    </>
                ) :
                (
                    <Button
                        fullWidth
                        onClick={onInc}
                        startIcon={<AddIcon color='disabled'/>}
                        size="medium"
                        sx={{fontSize: 10, height: 30.5}}
                        variant="outlined"
                        >
                        В корзину🛒
                    </Button>
                )}
            </ButtonGroup>
        </>
    )
}