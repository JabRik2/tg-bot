import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import { setTerm } from "../../pages/ProductsListPage/productsListPageSlice";


export default function SearchBar () {
    const term = useSelector(state => state.products.term);
    
    const dispatch = useDispatch();

    return (
        <TextField
            fullWidth
            size="small"
            value={term}
            onChange={(e) => dispatch(setTerm(e.target.value))}
            margin='dense'
            placeholder="Поиск..."
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            />
    );
}