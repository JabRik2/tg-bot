import { useEffect } from 'react';
// @mui
import { styled } from '@mui/material';
import Container from '@mui/material/Container';
// react-router
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// axios
// import axios from 'axios';
// Components
import ProductsList from '../ProductsList/ProductsList';
import CategoriesList from '../CategoriesList/CategoriesList';
import Cart from '../Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../Cart/cartSlice';
import ProductPage from '../ProductPage/ProductPage';

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
    <StyledContainer maxWidth='xs'>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to={'/categories'}/>} />
          <Route path='/categories' element={<CategoriesList />} />
          <Route path='/categories/:id' element={<ProductsList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products/:id' element={<ProductPage />} />
        </Routes>
      </Router>
    </StyledContainer>
  );
}

export default App;
