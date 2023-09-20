// @mui
import { styled } from '@mui/material';
import Container from '@mui/material/Container';
// react-router
import { Route, Routes, Navigate, HashRouter, BrowserRouter } from "react-router-dom";
// Components
import ProductsListPage from '../../pages/ProductsListPage/ProductsListPage';
import CategoriesListPage from '../../pages/CategoriesListPage/CategoriesListPage';
import CartPage from '../../pages/CartPage/CartPage';
import SingleProductPage from '../../pages/SingleProductPage/SingleProductPage';
import HomeRoutes from '../HomeRoutes/HomeRoutes';

// ----------------------------------------------

const StyledContainer = styled(Container)({
  '&.MuiContainer-root': {
    '&.MuiContainer-maxWidthXs': {
      maxWidth: 390,
    }
  }
});

// ----------------------------------------------

function App() {
  return (
    <>
      <StyledContainer maxWidth='xs'>
        <BrowserRouter>
          <Routes>
            <Route path='' element={<HomeRoutes/>} >
              <Route path='' element={<Navigate to={'/categories'}/>} />
              <Route path='/categories' element={<CategoriesListPage />} />
              <Route path='/categories/:id' element={<ProductsListPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/products/:id' element={<SingleProductPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StyledContainer>
    </>
  );
}

export default App;
