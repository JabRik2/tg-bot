import { useEffect } from "react";
// @mui
import {Alert, CircularProgress, Grid, Typography, styled} from "@mui/material";
// components
import CategoryItem from "../../components/CategoryItem/CategoryItem";
// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./categoriesListPageSlice";

// ------------------------------------

export const StyledH1 = styled('h1')({
    color: '#444444'
});

// ------------------------------------


export default function CategoriesListPage () {
    const {categories, loadingStatus} = useSelector(state => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [])

    const loading = loadingStatus === 'loading' ? <CircularProgress /> : null;
    const error = loadingStatus === 'error' ? <Alert severity="error">Somethink went wrong</Alert> : null;
    const view = loadingStatus === 'idle' ? <View categories={categories} /> : null;
    return (
        <>
            <StyledH1>📋Выберите нужную вам категорию:</StyledH1>
            {loading}
            {error}
            {view}
        </>
    );
}

const View = ({categories}) => {
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
    });
    return (
        <>
            {items.length ? (
                    <Grid container spacing={1}>
                        {items}
                    </Grid>
            ) : <Typography color={'gray'} align="center" sx={{mt: 2}} variant="subtitle1">Категории не были найдены...</Typography>}
        </>
    )
};