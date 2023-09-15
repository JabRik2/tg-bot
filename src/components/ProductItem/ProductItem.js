import { Link } from "react-router-dom";
// @mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
// components
import AddButton from '../AddButton/AddButton';

// ------------------------

const StyledCardContent = styled(CardContent)({
  '&.MuiCardContent-root': {
    paddingBottom: 10
  }
})

// ------------------------

export default function ProductItem({src, title, price, id, value}) {
  return (
    <Card sx={{maxHeight: 400}}>
      <Link to={`/products/${id}`} style={{cursor: 'default'}}>
        <CardMedia
          sx={{ height: 120 }}
          image={src}
          title="img"
          />
      </Link>
      <StyledCardContent>
        <Typography gutterBottom sx={{lineHeight: 1.1}} variant="subtitle1" component="div">
            <Link to={`/products/${id}`}>
              {title}
            </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Цена:</b> {price} ₽
        </Typography>
        <div style={{marginTop: 10, display: 'flex', justifyContent: 'center'}}>
            <AddButton src={src} title={title} price={price} id={id} value={value} />
        </div>
      </StyledCardContent>
    </Card>
  );
}