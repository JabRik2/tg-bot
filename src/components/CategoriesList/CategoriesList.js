import { useEffect } from "react";
// styles
import { StyledH1 } from "./styles";
// @mui
import {Grid, Typography} from "@mui/material";
// components
import CategoryItem from "../CategoryItem/CategoryItem";
// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./categoriesSlice";



export default function CategoriesList () {
    const categories = useSelector(state => state.categories.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [])

    const items = categories.map(({label, image, name, id}) => {
        return (
            <Grid key={id} item xs={6}>
                <CategoryItem 
                    id={id}
                    title={label}
                    path={name}
                    src={image} />
            </Grid>
        )
    })
    return (
        <>
            <StyledH1>📋Выберите нужную вам категорию:</StyledH1>
            {items.length ? (
                <Grid container spacing={1}>
                    {items}
                </Grid>
            ) : <Typography color={'gray'} align="center" sx={{mt: 2}} variant="subtitle1">Категории не были найдены...</Typography>}
        </>
    );
}