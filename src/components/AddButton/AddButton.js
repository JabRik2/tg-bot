import { useEffect, useState } from "react";
// @mui
import { Button, ButtonGroup } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchPostUserCart } from "../../pages/CartPage/cartPageSlice";

export default function AddButton ({id, value, price}) {
    const [counter, setCounter] = useState(value ? value : 0);
    const [controller, setController] = useState(null);

    useEffect(() => {
        setCounter(value);
        setController(new AbortController());
    }, [value]);

    const dispatch = useDispatch();
    const {currUserID} = useSelector(state => state.auth);

    const onDec = () => {
        if (counter > 0) {
            controller.abort();
            setController(() => {
                const controller = new AbortController();
                const signal = controller.signal;

                setCounter((prev) => {
                    dispatch(fetchPostUserCart({
                        userId: currUserID, 
                        price,
                        productID: id, 
                        value: prev - 1,
                        signal
                    }));
                    return prev - 1;
                });
                return controller;
            });
        }
    }

    const onInc = () => {
        controller.abort();
        setController(() => {
            const controller = new AbortController();
            const signal = controller.signal;

            setCounter((prev) => {
                dispatch(fetchPostUserCart({
                    userId: currUserID, 
                    price,
                    productID: id, 
                    value: prev + 1,
                    signal
                }));
                return prev + 1;
            });
            return controller;
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